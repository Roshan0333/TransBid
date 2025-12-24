import { Router } from "express";
import {createBidderProfile} from "../../Controller/Bidder/BidderProfile.controllers.js";
import RequiredLogin from "../../Middleware/Common/requiredLogin.middleware.js";

const router = Router();

router.route("/createProfile").post(RequiredLogin, createBidderProfile);

export default router;