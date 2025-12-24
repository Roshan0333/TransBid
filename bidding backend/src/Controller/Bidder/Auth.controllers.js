import BidderAuthModel from "../../Model/Bidder/auth.model.js";
import {passwordEncrypt, passwordDecrypt} from "../../utils/passwordEncrypt&Decrypt.js";
import CookiesForUser from "../../utils/cookiesForUser.js";
import {ApiResponse} from "../../utils/api-response.js";
import {ApiError} from "../../utils/api-error.js";
import asyncHandler from "../../utils/api-handler.js";

let Signup = async (req, res) => {
    try{
        const {email, password} = req.body;

        let bidderDetail = await BidderAuthModel({
            Email: email,
            Password: await passwordEncrypt(password)
        });

        await bidderDetail.save();

        bidderDetail.Password = undefined;

        await CookiesForUser(res, bidderDetail)

        return res.status(200).json(new ApiResponse(200, null, "You Registrated SuccessFully"))
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message},{name: err.name}]));
    }
}

let Login = async (req, res) => {
    try{
        const {email, password} = req.body;

        let bidderDetail = await BidderAuthModel.findOne({Email: email});

        let encryptedPassword = bidderDetail.Password;

        let passwordDecryptResult = await passwordDecrypt(password, encryptedPassword);

        if(!passwordDecryptResult){
            return res.status(401).json({msg: "Your Enter Password is Incorrect"});
        }

        bidderDetail.Password = undefined;

        await CookiesForUser(res, bidderDetail)

        return res.status(200).json(new ApiResponse(200, null, "Access Granted"));
    }
    catch(err){
        return res.status(500).json(500, err.message, [{message: err.message},{name: err.name}]);
    }
}

let forgetPassword = async (req, res) => {
    try{
        const {email, password} = req.body;

        let bidderDetail = await BidderAuthModel.findOneAndUpdate({Email: email},{
            Password: await passwordEncrypt(password)
        });

        bidderDetail.Password = undefined;

        await CookiesForUser(res, bidderDetail);

        return res.status(200).json(new ApiResponse(200, null, "Password Forget Successfully"))

    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message},{name: err.name}]));
    }
}

export {Signup, Login, forgetPassword};