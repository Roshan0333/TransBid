import PostItemModel from "../../Model/Common/postItem.model.js";
import {ApiResponse} from "../../utils/api-response.js";
import {ApiError} from "../../utils/api-error.js";
import asyncHandle from "../../utils/api-handler.js";


const parseDatetime = (dateStr, timeStr) => {
    const [day, month, year] = dateStr.split("/").map(Number);

    let [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if(modifier === "PM" && hours !== 12) hours +=12;
    if(modifier === "AM" && hours === 12) hours = 0;

    return new Date(year, month-1, day, hours, minutes);
}

const uploadBiddingItem = async (req, res) => {
    try{
        const {ItemName, ItemDem,TransportDate, StartPrice} = req.body;
        const {_id} = req.user;


        if(!req.files || req.files.length === 0){
            return res.status(500).json(new ApiError(500, "Please Upload Item Photos", [{messaege: "Please Upload Item Photos"}, {name: "Item Photo"}]));
        }

        const itemPhoto = req.files.map(file => file.buffer.toString("base64"));

        if(!TransportDate){
            return res.status.json(new ApiError(500, "Please Enter Transport Date", [{messaege: "Please Enter Date of Transport"}, {name: "Date of Transport"}]))
        }

        let BiddingDate  = (date) => {
            let splitDate = date.split("/");
            let day = splitDate[0]-1;

            return `${day}/${splitDate[1]}/${splitDate[2]}`
        }

        const itemDetail = PostItemModel({
            PosterId: _id,
            Image: itemPhoto,
            ItemName: ItemName,
            ItemDem: {
                Height: ItemDem.Height,
                Width: ItemDem.Width,
                Length: ItemDem.Length,
                Weight: ItemDem.Weight,
            },
            TransportDate: TransportDate,
            BiddingDate: BiddingDate(TransportDate),
            StartPrice: StartPrice,
            BiddingStartTime: "10:00 AM",
            BiddingEndTime: "10:30 AM"
        })

        await itemDetail.save();

        return res.status(200).json(new ApiResponse(200, null, "Item Upload SuccessFul"))

        
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [{message: err.message, name: err.name}]));
    }
}

const getMyBiddingItemPost = async (req, res) => {
    try{
        const {_id} = req.user;

        let myPostedItem = await PostItemModel.find({PosterId: _id});

        if(!myPostedItem){
            return res.status(404).json(new ApiResponse(404, null, "No Post Found."));
        }

        return res.status(200).json(new ApiResponse)(200, myPostedItem, "Your All Posted Items.");
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [err.name]))
    }
}

const deleteBiddingItem = async (req, res) => {
    try{
        const {postItemId, todayDate, currentTime} = req.query;

        let currentDateTime = (todayDate, currentTime);

        const deleteItem = await PostItemModel.findById(postItemId);

        if(!deleteItem){
            return res.status(500).json(new ApiError(500, "Post Does Not Delete. Please try again."))
        }

        let biddingDateTime = (deleteItem.BiddingDate, deleteItem.BiddingStartTime);


        if(currentDateTime >= biddingDateTime){
            return res.status(403).json(new ApiError(403, "Cannot Delete this Item. Bidding Already Started."));
        }

        await PostItemModel.findByIdAndDelete(postItemId);

        return res.status(200).json(new ApiResponse(200, null,  "Post Item Delete Successfully."))
    }
    catch(err){
        return res.status(500).json(new ApiError(500, err.message, [err.name]));
    }
}



export {uploadBiddingItem, getMyBiddingItemPost, deleteBiddingItem};
