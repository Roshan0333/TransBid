import Razorpay from "razorpay";

const razorPay = new Razorpay({
    key_id: process.env.Razorpay_Key_Id,
    key_secret: process.env.Razorpay_Key_Secret
})

export default razorPay;