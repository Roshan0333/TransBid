import mongoose,{Schema} from "mongoose";

const {ObjectId} = mongoose.Schema.Types;

const posterProfileSchema = new Schema({
    PosterId:{
        type: ObjectId,
        ref: "PosterAuth",
    },
    Name: {
        type: String,
        required: true
    },
    Email:{
        type: String,
    },
    Phone:{
        type: Number,
        unique: true,
        required: true
    },
    Age:{
        type: Number,
        required: true
    },
    FullAddress:{
        Address:{
            type: String,
            required: true
        },
        NearBy:{
            type: String,
            required: true,
        },
        ZipCode:{
            type: Number,
            required: true,
        },
        City:{
            type: String,
            required: true,
        },
        State:{
            type: String,
            required: true
        },
        Country:{
            type: String,
            required: true
        }
    }
});


const posterProfileModel = mongoose.model("PosterProfile", posterProfileSchema);

export default posterProfileModel;