import Message from "../models/Message.model.js"

class messageService {

    // Get messages
    async getMessages(roomId:string){
       const messages = await Message.find({room:roomId}).sort({createdAt:1})
       if(!messages){
           throw new Error("Messages not found")
       }
       return messages 
    }

    // Save messages
    async saveMessages(roomId:string,senderId:string,content:string){
        const message = await Message.create({room:roomId,sender:senderId,content:content})
        if(!message){
            throw new Error("Message not saved")
        }
        return message
    }
}

export default new messageService()