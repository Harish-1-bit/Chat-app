import mongoose from "mongoose"

const connectDb = async()=>{
    console.log("MONGO_URI:", process.env.MONGO_URI);
    try {
        const conn =await mongoose.connect(process.env.MONGO_URI)
        console.log("DataBase connected successfully", conn.connection)
    } catch (error) {
        console.log(error)
    }
}

export default connectDb