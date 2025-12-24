import mongoose, {Schema} from "mongoose";

const bidderAuthSchema = new Schema({
    Email: {
        type: String,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
});

const bidderAuthModel = mongoose.model("BidderAuth", bidderAuthSchema);

export default bidderAuthModel;