import mongoose, { Schema } from "mongoose";

let { ObjectId } = mongoose.Schema.Types;

const Payment_Schema = new Schema({
    BidderId: {
        type: ObjectId,
        ref: "BidderAuth",
        required: true,
    },
    OrderId: {
        type: String,
    },
    PaymentId: {
        type: String
    },
    Signature: {
        type: String
    },
    Amount: {
        type: Number
    },
    QR_Code: {
        type: String
    },
    Status: {
        type: String,
        emum: ["CREATED", "SUCCESS", "FAILED"],
        default: "CREATED"
    }
}, { timeStamps: true });

const Payment_Model = mongoose.model("Payment", Payment_Schema);

export default Payment_Model;