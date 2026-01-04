import jwt from "jsonwebtoken";
import CookiesForUser from "../../utils/cookiesForUser.js"
import { ApiError } from "../../utils/api-error.js";

const jwt_Secert_Key = process.env.Secert_Key;

const requiredLogin = async (req, res, next) => {
    const userAccessToken = req.cookies?.AccessToken;
    const userRefreshToken = req.cookies?.RefreshToken;

    if (!userRefreshToken) {
        return res.status(401).json(new ApiError(401, "Please Login for Continue"));
    }
    else {
        try {
            const jwtAccessTokenVerifer = jwt.verify(userAccessToken, jwt_Secert_Key);
            req.user = jwtAccessTokenVerifer.user;
            next()
        }
        catch(err){
            if(err.name === "TokenExpiredError" || err.name === "JsonWebTokenError"){
                const jwtRefreshTokenVerifer = jwt.verify(userRefreshToken, jwt_Secert_Key);

                await CookiesForUser(jwtRefreshTokenVerifer.user)

                req.user = jwtRefreshTokenVerifer.user;
                next();
            }
            else{
                return res.status(500).json(new ApiError(500, err.message));
            }
        }
    }
}

export default requiredLogin;