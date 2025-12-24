import PosterProfileModel from "../../Model/Poster/PosterProfile.model.js";
import { ApiResponse } from "../../utils/api-response.js";
import { ApiError } from "../../utils/api-error.js";
import asyncHandler from "../../utils/api-handler.js";

const createPosterProfile = async (req, res) => {
    try {

        const { name, phone, age, fullAddress } = req.body;
        const { _id, Email } = req.user;

        const posterProfile = PosterProfileModel({
            PosterId: _id,
            Name: name,
            Email: Email,
            Phone: phone,
            Age: age,
            FullAddress: {
                Address: fullAddress.address,
                NearBy: fullAddress.nearBy,
                ZipCode: fullAddress.zipCode,
                City: fullAddress.city,
                State: fullAddress.state,
                Country: fullAddress.country
            }
        })

        if (!posterProfile) {
            return res.status(500).json(new ApiError(500, "Your data is not Save in database."))
        }

        await posterProfile.save();

        return res.status(200).json(new ApiResponse(200, null, "Profile Create SuccessFully"))

    }
    catch (err) {
        return res.status(500).json(new ApiError(500, { message: err.message }, [err.name]))
    }
}

const getPosterProfile = async (req, res) => {
    try {
        let _id = req.user;

        let posterProfile = await PosterProfileModel.findOne({ PosterId: _id });

        if(!posterProfile){
            return res.status(404).json(new ApiError(404, "Profile not Found."));
        }

        return res.status(200).json(new ApiResponse(200, posterProfile, "Your Profile Detail."));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [err.name]));
    }
}

const updatePosterProfile = async (req, res) => {
    try {
        const { name, phone, age, fullAddress } = req.body;
        const { _id, Email } = req.user;

        const updateProfile = await PosterProfileModel.findOneAndUpdate({PosterId: _id},{
            Name: name,
            Email: Email,
            Phone: phone,
            Age: age,
            FullAddress:{
                Address: fullAddress.address,
                NearBy: fullAddress.nearBy,
                ZipCode: fullAddress.zipCode,
                City: fullAddress.city,
                State: fullAddress.state,
                Country: fullAddress.country
            }
        })

        if(!updateProfile){
            return res.status(500).json(new ApiError(500, "Your Profile is not Update. Please try again."))
        }

        return res.status(200).json(new ApiResponse(200, updateProfile, "Your Profile Update Successfully."));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [err.name]));
    }
}


export { createPosterProfile, getPosterProfile, updatePosterProfile};