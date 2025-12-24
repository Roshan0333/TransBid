import {Router} from "express";
import { Signup, Login, forgetPassword } from "../../Controller/Poster/Auth.controllers.js";
import { otpSend } from "../../Controller/Common/optSend.controllors.js";
import checkDuplicateEmail from "../../Middleware/Common/checkDuplicateEmail.middleware.js";
import isEmailPresentOr_Not from "../../Middleware/Poster/isEmailPresentOr_Not.middleware.js";

let router = Router();

router.route("/Signup").post(checkDuplicateEmail, Signup);
router.route("/Login").post(isEmailPresentOr_Not, Login);
router.route('/Otp').post(isEmailPresentOr_Not, otpSend)
router.route("/ForgetPassword").put(forgetPassword);


export default router;