import PosterAuthModel from "../../Model/Poster/auth.model.js";
import { ApiError } from "../../utils/api-error.js";

const isEmailPresentOrNot = async (req, res, next) => {
    try {
        const { email } = req.body;

        let isEmailPresent = await PosterAuthModel.findOne({ Email: email });

        if (!isEmailPresent) {
            return res.status(404).json(new ApiError(404,  "Incorrect Email"));
        }
        
        next()

    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message));
    }
}

export default isEmailPresentOrNot;