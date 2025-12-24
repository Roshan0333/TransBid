import PosterAuthModel from "../../Model/Poster/auth.model.js";
import { passwordEncrypt, passwordDecrypt } from "../../utils/passwordEncrypt&Decrypt.js"
import CookiesForUser from "../../utils/cookiesForUser.js";
import { ApiResponse } from "../../utils/api-response.js";
import { ApiError } from '../../utils/api-error.js';
import asyncHandler from "../../utils/api-handler.js";

let Signup = async (req, res) => {
    try {
        let { email, password } = req.body;

        let userDetail = PosterAuthModel({
            Email: email,
            Password: await passwordEncrypt(password)
        });

        await userDetail.save();

        userDetail.Password = undefined;

        await CookiesForUser(res, userDetail)

        return res.status(200).json(new ApiResponse(200, null, "You Registrated SuccessFully"))
    }
    catch (err) {
        return res.status(500).json(new ApiError(500,err.message, [{message: err.message},{name: err.name}]));
    }
}

let Login = asyncHandler(async (req, res) => {
    try {
        let { email, password } = req.body;

        let userDetail = await PosterAuthModel.findOne({ Email: email });

        let encryptedPassword = userDetail.Password;

        let decryptPasswordResult = await passwordDecrypt(password, encryptedPassword);

        if (!decryptPasswordResult) {
            return res.status(401).json({ msg: "Your Enter Password is Incorrect." })
        }

        userDetail.Password = undefined;

        await CookiesForUser(res, userDetail)

        return res.status(200).json(new ApiResponse(200,null, "Access Granted"))
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message},{name: err.name}]))
    }
})

let forgetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        let userDetail = await PosterAuthModel.findOneAndUpdate({ Email: email }, {
            Password: await passwordEncrypt(password)
        });

        userDetail.Password = undefined;

        await CookiesForUser(res, userDetail);

        return res.status(200).json(new ApiResponse(200, null, "Password Forget Successfully"))

    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message},{name: err.name}]));
    }
}


export { Signup, Login, forgetPassword };