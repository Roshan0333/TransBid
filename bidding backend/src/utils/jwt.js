import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({path:"./.env"})


let jwt_Secert_Key = process.env.Secert_Key;

const createJwtToken = async (user) => {

    const accessToken = jwt.sign({user}, jwt_Secert_Key, {expiresIn: "24h"});
    const refreshToken = jwt.sign({user}, jwt_Secert_Key, {expiresIn: "30d"});

    return {accessToken, refreshToken}
};

export default createJwtToken;