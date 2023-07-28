import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection;
        connection.on("connected",()=>{
            console.log("MongoDB connect was successfull")
        })
        connection.on("error",(err)=>{
            console.log("mongoDb connect wasd failed.Please check if MongoDB is running ",err)
            process.exit()
        })

    } catch (error) {
        console.log("Something went wrong")
        console.log(error)
    }
}