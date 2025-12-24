import nodeMailer from "nodemailer";
import {ApiResponse} from "../../utils/api-response.js";
import {ApiError} from "../../utils/api-error.js";
import asyncHandler from '../../utils/api-handler.js';


const otpSend = async(req, res) => {
    try{
        const {email} = req.body;

        let first = parseInt(Math.random()*10).toString();
        let second = parseInt(Math.random()*10).toString();
        let third = parseInt(Math.random()*10).toString();
        let fourth = parseInt(Math.random()*10).toString();

        const OTP = first+second+third+fourth;

        let otpTransport = nodeMailer.createTransport({
            service: "gmail",
            auth:{
                user: "logine786@gmail.com",
                pass: "zowb rits hjsn udyz"
            }
        });

        await otpTransport.sendMail({
            from: `"TransBid" <logine786@gmail.com>`,
            to: email,
            subject: "Your TransBid Verification Code",
            html: `<div style="font-family: Arial, sans-serif;">
                    <h2 style="color: #0066cc;">TransBid</h2>
                    <p>Your One-Time Password (OTP) for verifying your TransBid account is:</p>
                    <h1 style="color: #333;">${OTP}</h1>
                    <p>This OTP will expire in <b>5 minutes</b>.</p>
                    <p>Do not share this code with anyone.</p>
                    <br />
                    <p>– The TransBid Team</p>
                    </div>`,
        })

        return res.status(200).json(new ApiResponse(200, OTP, "Otp Send SuccessFully"))
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message},{name: err.name}]))
    }
}

export {otpSend}