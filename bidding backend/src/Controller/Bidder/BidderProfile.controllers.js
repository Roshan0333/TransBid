import BidderProfileModel from "../../Model/Bidder/BidderProfie.model.js";
import { ApiResponse } from "../../utils/api-response.js";
import { ApiError } from "../../utils/api-error.js";
import asyncHandler from "../../utils/api-handler.js";


const createBidderProfile = async (req, res) => {
    try {
        const { subscriptionStatus, name, phone, age, fullAddress } = req.body;

        const { _id, Email } = req.user;

        const bidderProfile = BidderProfileModel({
            BidderId: _id,
            SubscriptionStatus: subscriptionStatus,
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

        await bidderProfile.save();

        return res.status(200).json(new ApiResponse(200, null, "Bidder Create Successfully"));

    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message }, { name: err.name }]))
    }
}

const getBidderProfile = async (res, req) => {
    try {
        const { _id } = req.user;

        const bidderProfile = await BidderProfileModel.findOne({ BidderId: _id });

        if (!bidderProfile) {
            return res.status(404).json(new ApiError(404, "Your Profile is not Found."));
        }

        return res.status(200).json(new ApiResponse(200, bidderProfile, "Your profile get Successfully."));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [err.name]));
    }
}

const updateBidderProfile = async (res, req) => {
    try {
        const { subscriptionStatus, name, phone, age, fullAddress } = req.body;
        const { _id, Email } = req.user;

        const updateProfile = await findOneAndUpdate(
            { BidderId: _id },
            {
                SubscriptionStatus: subscriptionStatus,
                Name: name,
                Email: Email,
                Phone: phone,
                Age: age,
                FullAddress: {
                    Address: fullAddress.address,
                    NearBy: fullAddress.nearBy,
                    ZipCode: fullAddress.zipCode,
                    City: fullAddress.city,
                    State: fullAddress.State,
                    Country: fullAddress.country
                }
            }
        )

        if (!updateProfile) {
            return res.status(500).json(new ApiError(500, "Your Profile is not Update. PLease try again."))
        }

        return res.status(200).json(new ApiResponse(200, updateProfile, "Your Profile is Update Successfully."));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [err.name]))
    }
}


export { createBidderProfile, getBidderProfile, updateBidderProfile };