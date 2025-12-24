import mongoose, {Schema} from "mongoose";

const {ObjectId} = mongoose.Schema.Types;

const winningBidHistorySchema = new Schema({
    BidderId:{
        type: ObjectId,
        ref: "BidderAuth"
    },
    WinningBid:[{
        BidId:{
            type: String,
        }
    }]
});

const winningBidHistoryModel = mongoose.model("WinningBidHistory", winningBidHistorySchema);

export default winningBidHistoryModel;