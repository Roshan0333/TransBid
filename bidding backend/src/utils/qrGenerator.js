import QR_Code from "qrcode";

const qrCode_Generator = async({upiId, name, amount, note}) => {
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`

    return await QR_Code.toDataURL(upiUrl);
}

export default qrCode_Generator;