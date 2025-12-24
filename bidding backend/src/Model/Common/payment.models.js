import mongoose, {Schema} from mongoose;

let {ObjectId} = mongoose.Schema.Types;

const Payment_Schema = new Schema({
    ContractId:{
        type: ObjectId,
        ref:"PostItem",
        required: true,
    },
    OrderId:{
        type:String,
    },
    PaymentId: {
        type: String
    },
    Signature:{
        type:String
    },
    QR_Code:{
        type: String
    },
    Status:{
        type: String,
        emum:["CREATED", "SUCCESS", "FAILED"],
        default: "CREATED"
    }
}, {timeStamps: true});

const Payment_Model = mongoose.Payment_Schema("Payment", Payment_Schema);

export default Payment_Model;