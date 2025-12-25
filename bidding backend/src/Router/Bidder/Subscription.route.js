import {Router} from "express";
import {createOrderWithQR, verifyPayment} from "../../Controller/Bidder/Subscription.controllers.js";

const router = Router();

router.route("/createOrderWithQR").post(createOrderWithQR);
router.route("/verifyPayment").put(verifyPayment);

export default router;