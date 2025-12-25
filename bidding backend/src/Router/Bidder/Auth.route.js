import {Router} from "express";
import {Signup, Login, forgetPassword} from "../../Controller/Bidder/Auth.controllers.js";
import { otpSend } from "../../Controller/Common/optSend.controllors.js";
import isEmailPresentOr_Not from "../../Middleware/Bidder/isEmailPresentOr_Not.middleware.js";
import checkDuplicateEmail from "../../Middleware/Common/checkDuplicateEmail.middleware.js";

const router = Router();

router.route('/Signup').post(checkDuplicateEmail, Signup);
router.route('/Login').post(isEmailPresentOr_Not, Login);
router.route("/Otp").post(isEmailPresentOr_Not, otpSend)
router.route("/ForgerPassword").put(forgetPassword);


export default router;