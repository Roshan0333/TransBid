import { useState } from "react";
import Styles from "../../css/auth.module.css";
import Logo from "../../assets/logo/logo.png"
import PopupMessage from "../../components/PopupMessage/PopupMessage";
import { axiosPostService } from "../../service/axios";

function Login() {

    const [popupFlag, setPopupFlag] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [userType, setUserType] = useState("poster")

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let validation = () => {
        if(!email || !password){
            return false
        }

        return true
    }

    let offPopupMessage = () => {
        setTimeout(() => {
            setPopupFlag(prev => !prev);
        }, 5000)
    }

    let loginMethod = async (e) => {
        e.preventDefault();

        let validationCheck = validation();

        if(!validationCheck){
            setPopupMessage("All Field Fill is Required.");
            setPopupFlag(prev => !prev);
            offPopupMessage();
        }
        else{

            let formData = {
                email: email,
                password: password
            }

            let result = await axiosPostService(`${userType}/auth/Login`, formData);

            console.log(result.message)
            setPopupMessage(result.message);
            setPopupFlag(prev => !prev);
            offPopupMessage();
        }
    }

    return (
        <div className={Styles.mainDiv}>

            {popupFlag && <PopupMessage message={popupMessage}/>}

            <div className={Styles.mainContentDiv}>
                <img src={Logo} alt="Company Logo" className={Styles.companyLogo}/>

                <form className={Styles.formDiv}>
                    <div className={Styles.inputDiv}>
                        <input type="email" placeholder="Email" className={Styles.inputField} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className={Styles.inputDiv}>
                        <input type="password" placeholder="Password" className={Styles.inputField} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <button type="submit" className={Styles.submitBtn} onClick={(e) => loginMethod(e)}>Login</button>

                    <p className={Styles.para}>Login as <span className={Styles.link} onClick={() => setUserType("bidder")}>Contractor</span></p>
                    <p className={Styles.para}>I have no Account? <span className={Styles.link}>Signup</span></p>
                </form>
            </div>
        </div>
    )
}


export default Login;