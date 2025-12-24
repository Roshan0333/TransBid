import { Router } from "express";
import multer from "multer";
import RequiredLogin from "../../Middleware/Common/requiredLogin.middleware.js";
import { uploadBiddingItem } from "../../Controller/Poster/PostItem.controllers.js";

const router = Router();

let storage = multer.memoryStorage();
let upload = multer({storage});

router.route("/upload").post(RequiredLogin, upload.array("Image", 5), uploadBiddingItem);

export default router;