import { useState } from "react"
import logo from "../../assets/logo/logo.png";
import Styles from "../../css/auth.module.css";
import { axiosPostService } from "../../service/axios";

function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [userType, setUserType] = useState("poster");
    const [popFlag, setPopFlag] = useState(false);
    const [popMessage, setPopMessage] = useState("");

    const hasSpecialSymbol = (value) => {
        let specialSymbol = "/[@$#!%&*]/";
        return specialSymbol.test(value);
    }

    const offPopMessage = () => {
        setTimeout(() => {
            setPopFlag(prev => !prev);
        }, 5000);
    }

    const matchPassword = () => {
        if (password !== confirmPassword) {
            return false
        }

        return true
    }

    const validationMethod = (e) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword) {
            setPopMessage("All Field Fill is Required");
            setPopFlag(prev => !prev);
            offPopMessage();
        }
        else {
            if (password.length > 8) {
                let checkSpecialSymbol = hasSpecialSymbol(password);

                if (!checkSpecialSymbol) {
                    setPopMessage("Please Add Spiecal Symbol");
                    setPopFlag(prev => !prev);
                    offPopMessage();
                    return false
                }
                else {
                    let passwordValidation = matchPassword();
                    if (!passwordValidation) {
                        setPopMessage("Confirm Password is Different from Password.");
                        setPopFlag(prev => !prev);
                        offPopMessage();
                        return false
                    }
                    else {
                        return true
                    }
                }
            }
            else {
                setPopMessage("Password length must be more than 8");
                setPopFlag(prev => !prev);
                offPopMessage();

                return false
            }
        }
    }

    const SignupMethod = async (e) => {
        e.preventDefault();
        const validationCheck = validationMethod(e);

        if (validationCheck) {
            let formData = {
                email: email,
                password: password
            }
            let result = await axiosPostService(`${userType}/auth/Signup`, formData);

            setPopMessage(result);
            setPopFlag(prev => !prev);
            offPopMessage()
        }
    }


    return (
        <div className={Styles.mainDiv}>
            {popFlag && <div className={Styles.popMessageDiv}><p className={Styles.popMessage}>{popMessage}</p></div>}
            <div className={Styles.mainContentDiv}>
                    <img src={logo} className={Styles.companyLogo} alt="Company Logo"/>

                <form className={Styles.formDiv}>

                    <div className={Styles.inputDiv}>
                        {/* <label className={Styles.inputLabel}>Email</label> */}
                        <input type="email" placeholder="Email" className={Styles.inputField} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className={Styles.inputDiv}>
                        {/* <label className={Styles.inputLabel}>Password</label> */}
                        <input type="password" placeholder="Password" className={Styles.inputField} onClick={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className={Styles.inputDiv}>
                        {/* <label className={Styles.inputLabel}>Confirm Password</label> */}
                        <input type="text" placeholder="Confirm Password" className={Styles.inputField} onClick={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    <button type="submit" className={Styles.submitBtn} onClick={(e) => SignupMethod(e)}>Signup</button>
                    
                    <p className={Styles.para}>Signup as <span className={Styles.link} onClick={() => setUserType("bidder")}>Contractor</span></p>
                    <p className={Styles.para}>Already have an account?<span className={Styles.link}>Login</span></p>

                </form>
            </div>
        </div>
    )
}

export default Signup;