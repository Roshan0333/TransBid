import express from  'express';
import cors from "cors"
import healthCheck from './Router/Common/healthCheck.route.js';
import PosterAuthRoutes from "./Router/Poster/Auth.route.js";
import PosterProfileRoutes from "./Router/Poster/Profile.route.js";
import PosterBiddingItemRoutes from "./Router/Poster/BiddingItem.route.js";
import BidderAuthRoutes from './Router/Bidder/Auth.route.js';
import BidderProfileRoutes from "./Router/Bidder/BidderProfile.route.js";
import SubscriptionRoutes from "./Router/Bidder/Subscription.route.js";
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
app.use("/api/v1/transBid/poster/auth", PosterAuthRoutes);
app.use("/api/v1/transBid/poster/profile", PosterProfileRoutes);
app.use("/api/v1/transBid/poster/biddingItem", PosterBiddingItemRoutes)
app.use("/api/v1/transBid/bidder/auth", BidderAuthRoutes);
app.use("/api/v1/transBid/bidder/profile", BidderProfileRoutes);
app.use("/api/v1/transBid/bidder/Subscription", SubscriptionRoutes);

export default app
