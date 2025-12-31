import DatabaseConfig  from "./Config/Database.config.js";
import dotenv from "dotenv";
import app from "./app.js";
import http from "http";
import itemBidding from "./Controller/Bidder/itemBidding.controllers.js";

dotenv.config(
    {
        path: "./.env"      
    });

const PORT = process.env.PORT || 3000;


DatabaseConfig();


const server = http.createServer(app);

itemBidding(server);

server.listen(PORT, () => {
    console.log(`Server Running on Port Number: ${PORT}`)
})