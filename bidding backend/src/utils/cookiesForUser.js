import jwtTokenCreater from "../utils/jwt.js";
import Cookies from "../utils/cookies.js";


const cookiesForUser = async (res, user) => {
    const {accessToken, refreshToken} = await jwtTokenCreater(user);
    
            Cookies(res, "AccessToken", accessToken, 15*60*1000);
            Cookies(res, "RefreshToken", refreshToken, 30*24*60*60*1000);
}

export default cookiesForUser;