import mongoose from "mongoose"

const connectDb = async()=>{

    try {
        const conn =await mongoose.connect(process.env.MONGO_URI || '')
        console.log("DataBase connected successfully", conn.connection.name)
    } catch (error) {
        console.log(error)
    }
}

export default connectDb