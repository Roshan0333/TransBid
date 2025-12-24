import { Router } from "express";
import { createPosterProfile } from "../../Controller/Poster/Profile.controllers.js";
import RequiredLogin from "../../Middleware/Common/requiredLogin.middleware.js";

const router = Router();

router.route("/createProfile").post(RequiredLogin, createPosterProfile);

export default router;