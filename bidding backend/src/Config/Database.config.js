import mongoose from "mongoose";

const databaseConfig = async () => {
    try{
        let db = await mongoose.connect(process.env.Database);
    if(db){
        console.log("Database Connection Successfully")
    }
    return db
    }
    catch(err){
        console.log(`Error : ${err.message}`)
    }
}

export default databaseConfig;