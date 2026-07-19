import { Server } from "socket.io";


export const setupSocket = (io:Server)=>{
    io.on('connection',(socket)=>{
        console.log('user connected')

        socket.on('send-message',(data)=>{
            console.log(data)
            io.emit('receive-message',data)
        })
        socket.on('disconnect',()=>{
            console.log('user disconnected')
        })
    })
}