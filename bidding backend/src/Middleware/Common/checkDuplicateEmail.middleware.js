import BidderAuthModel from "../../Model/Bidder/auth.model.js";
import PosterAuthModel from "../../Model/Poster/auth.model.js";
import { ApiResponse } from "../../utils/api-response.js";
import { ApiError } from "../../utils/api-error.js";

let checkDuplicateEmail = async (req, res, next) => {
    try {
        const { email } = req.body

        let isBidderEmail = await BidderAuthModel.findOne({ Email: email });
        let isPosterEmail = await PosterAuthModel.findOne({ Email: email })

        if (isBidderEmail || isPosterEmail) {
            return res.status(404).json(new ApiError(404, "Email Already Regestrated."));
        }

        next()

    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message));
    }
}

export default checkDuplicateEmail;