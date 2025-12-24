import express from  'express';
import cors from "cors"
import healthCheck from './Router/Common/healthCheck.route.js';
import PosterAuthRouter from "./Router/Poster/Auth.route.js";
import PosterProfileRouter from "./Router/Poster/Profile.route.js";
import PosterBiddingItemRouter from "./Router/Poster/BiddingItem.route.js";
import BidderAuthRouter from './Router/Bidder/Auth.route.js';
import BidderProfileRouter from "./Router/Bidder/BidderProfile.route.js";
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin:process.env.ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders : ["Content-Type", "Authorization"]
}))

app.use(express.json({limit:"16kb"}));

app.use(cookieParser());

app.use(express.urlencoded({
    extended:true,
    limit: "16kb"
}))

app.use("/api/v1/healthCheck", healthCheck);
app.use("/api/v1/transBid/poster/auth", PosterAuthRouter);
app.use("/api/v1/transBid/poster/profile", PosterProfileRouter);
app.use("/api/v1/transBid/poster/biddingItem", PosterBiddingItemRouter)
app.use("/api/v1/transBid/bidder/auth", BidderAuthRouter);
app.use("/api/v1/transBid/bidder/profile", BidderProfileRouter);

export default app
