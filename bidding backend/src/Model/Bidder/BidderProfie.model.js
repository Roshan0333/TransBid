import mongoose, {Schema} from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const bidderProfileSchema = new Schema({
    BidderId: {
        type: ObjectId,
        ref: "BidderAuth",
    },
    SubscriptionStatus:{
        type: Boolean,
        default: false
    },
    Name: {
        type: String,
    },
    Email:{
        type: String,
    },
    Phone:{
        type: Number,
        unique: true,
    },
    Age:{
        type: Number,
    },
    FullAddress:{
        Address:{
            type: String,
        },
        NearBy:{
            type: String,
        },
        ZipCode:{
            type: Number,
        },
        City:{
            type: String,
        },
        State:{
            type: String,
        },
        Country:{
            type: String,
        }
    }
});

const bidderProfileModel = mongoose.model("BidderProfile", bidderProfileSchema);

export default bidderProfileModel;