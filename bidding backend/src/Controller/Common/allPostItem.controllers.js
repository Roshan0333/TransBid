import PostItemModel from "../../Model/Common/postItem.model.js";
import {ApiResponse} from "../../utils/api-response.js";
import {ApiError} from "../../utils/api-error.js";
import asyncHandle from "../../utils/api-handler.js";


const getAllBiddingItem = async (req, res) => {
    try{
        const {date, time} = req.query;

        const getAllItem = await PostItemModel.find({
            BiddingDate: {
                $gte: date
            },
            BiddingEndTime: {
                $lt: time
            }
        });

        return res.status(200).json(new ApiResponse(200, getAllItem, "All Items"))
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [err.name]));
    }
}

export {getAllBiddingItem};
