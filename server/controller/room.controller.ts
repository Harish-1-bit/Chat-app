import { Request, Response } from "express"
import roomServices from "../services/room.services"

const getRoom = async(req:Request, res:Response)=>{
  try {
    const {name} = req.body as {name:string}
    if(!name){
        
      throw new Error("Room name is required", {cause:{
        statusCode:404
      }})
    }
    const room = await roomServices.createRoom(name)
    return res.status(200).json({success:true,room})
  } catch (error:any) {
     console.log(error);
     
    const statusCode = error.cause?.statusCode || 500;
    return res.status(statusCode).json({success:false,message:error.message})
  }
}

const roomController={getRoom}

export default roomController