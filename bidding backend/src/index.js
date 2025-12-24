import DatabaseConfig  from "./Database/Database.config.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config(
    {
        path: "./.env"      
    });

const PORT = process.env.PORT;


DatabaseConfig();


app.listen(PORT, () => {
    console.log(`Server Running on Port Number: ${PORT}`)
})