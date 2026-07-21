import { Server as SocketServer } from "socket.io"
import messageServies from "../services/message.servies"

export const setupSocket = (io: SocketServer) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on("send_message", async ({roomId, sender, message}) => {
       try {
        if(!roomId || !sender || !message){
          throw new Error("Invalid message",{cause:{statusCode:400}})
        }
         const saveMessage = await messageServies.saveMessages(roomId,sender,message.trim())
        io.to(roomId).emit("receive_message", {
          _id:saveMessage._id,
          content:saveMessage.content,
          room:saveMessage.room,
          sender:saveMessage.sender,
          createdAt:saveMessage.createdAt,
        })
        console.log(saveMessage)
       } catch (error:any) {
        console.log(error);
        const statusCode = error.cause?.statusCode || 500;
        socket.emit("error", "Failed to save message")
       }
    })

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`)
    })
  })
}
