import Razorpay from 'razorpay';
import Crypto from "crypto";
import Payment from "../../Model/Common/payment.models.js";
import QR_Code from "../../utils/qrGenerator.js";
import ApiResponse from "../../utils/api-response.js";
import ApiError from "../../utils/api-error.js";
import AsyncApiHandle from "../../utils/api-handler.js";


const createOrderWithQR = async (req, res) =>{
    try{

    }
    catch(err){
        return res.status(500)
    }
}