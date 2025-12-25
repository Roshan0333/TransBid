import Razorpay from '../../Payment/config.js';
import Crypto from "crypto";
import Payment from "../../Model//Bidder/Subscription.models.js";
import BidderProfile_Model from "../../Model/Bidder/BidderProfie.model.js";
import GenerateUPIQR from "../../utils/qrGenerator.js";
import {ApiResponse} from "../../utils/api-response.js";
import {ApiError} from "../../utils/api-error.js";
import AsyncApiHandle from "../../utils/api-handler.js";


const createOrderWithQR = async (req, res) => {
    try {
        const { amount } = req.body;

        const { _id } = req.user

        const order = await Razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: `Bidder_${_id}`
        })

        const qrCode = await GenerateUPIQR({
            upiId: "rzp@razorpay",
            name: "TransBid",
            amount,
            note: `Bidder_${_id}`
        });

        const payment = await Payment({
            BidderId: _id,
            OrderId: order.id,
            Amount: amount,
            QR_Code: qrCode
        })

        await payment.save();

        return res.status(200).json(new ApiResponse(200, {
            payment,
            key: process.env.RAZORPAY_KEY_ID
        }, "Order created successfully"))
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [err.name]));
    }
}

const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razor_payment_id, razor_signature } = req.body

        const body = razorpay_order_id + "|" + razor_payment_id;

        const expectedSignature = Crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razor_signature) {
            return res.status(400).json(new ApiResponse(400, null, "Invalid signature"));
        }

        let payment = await Payment.findOneAndUpdate(
            { OrderId: razorpay_order_id },
            {
                PaymentId: razor_payment_id,
                Signature: razor_signature,
                Status: "Success"
            }
        )

        await BidderProfile_Model.findOneAndUpdate(
            { BidderId: payment.BidderId },
            { SubscriptionStatus: true }
        )

        return res.status(200).json(new ApiResponse(200, null, "Payment verified successfully"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [err.name]));
    }
}

export { createOrderWithQR, verifyPayment };