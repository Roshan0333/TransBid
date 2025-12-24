import mongoose, {Schema} from "mongoose";

const {ObjectId} = mongoose.Schema.Types;

const postHistorySchema= new Schema({
    PosterId:{
        type: ObjectId,
        ref:"PosterAuth"
    },
    Posts:[{
        PostId:{
            type: String,
        }
    }]
});

const postHistoryModel = mongoose.model("PostHistory", postHistorySchema);

export default postHistoryModel;