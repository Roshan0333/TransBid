import PosterAuthModel from "../../Model/Poster/auth.model.js";

const isEmailPresentOrNot = async (req, res, next) => {
    try {
        const { email } = req.body;

        let isEmailPresent = await PosterAuthModel.findOne({ Email: email });

        if (!isEmailPresent) {
            return res.status(404).json({ msg: "Incorrect Email" });
        }
        
        next()

    }
    catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export default isEmailPresentOrNot;