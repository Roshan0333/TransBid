import mongoose, {Schema} from "mongoose";

let {ObjectId} = mongoose.Schema.Types;

const postItemSchema = new Schema({
    PosterId:{
        type: ObjectId,
        ref: "PosterAuth"
    },
    BidderWinnerId:{
        type: ObjectId,
        ref:"BidderAuth"
    },
    Image:[{
        type:String
    }],
    ItemName:{
        type: String,
        required: true
    },
    ItemDem:{
        Height:{
            type: String,
            required: true
        },
        Width:{
            type: String,
            required: true
        },
        Length:{
            type: String,
            required: true
        },
        Weight:{
            type:String,
            required: true
        }
    },
    TransportDate:{
        type: String,
        required: true
    },
    BiddingDate:{
        type: String
    },
    StartPrice:{
        type: Number,
        required: true
    },
    BiddingStartTime:{
        type:String
    },
    Status:{
        type: String,
        default: "Pending",
    },
    EndPrice:{
        type: Number
    }
});

const postItemModel = mongoose.model("PostItem", postItemSchema);

export default postItemModel;