import mongoose, {Schema} from "mongoose";

const posterAuthSchema = new Schema({
    Email: {
        type: String,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
})

const posterAuthModel = mongoose.model("PosterAuth", posterAuthSchema);

export default posterAuthModel;