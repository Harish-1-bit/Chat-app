import { Request, Response } from "express";
import messageServies from "../services/message.servies";

const getMessages = async (req:Request, res:Response) => {
    try {
        const roomId = req.params.id as string;
        const message = await messageServies.getMessages(roomId)
        return res.status(200).json({success:true,message})
        
    } catch (error:any) {
        return res.status(500).json({success:false,message:error.message})
    }
}

const messageController={getMessages}

export default messageController