import BidderAuthModel from "../../Model/Bidder/auth.model.js";

let isEmailPresentOr_Not = async (req, res, next) => {
    try{
        const {email} = req.body;

        let isEmail = await BidderAuthModel.findOne({Email:email});

        if(!isEmail){
            return res.status(404).json({msg: "Incorrect Email"})
        }

        next();
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
}

export default isEmailPresentOr_Not;