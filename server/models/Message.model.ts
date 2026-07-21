import mongoose, { Document } from "mongoose";

interface IMessage extends Document {
    sender: mongoose.Types.ObjectId
    content: string
    room: mongoose.Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    }
}, { timestamps: true })

// index to retrieve last 20 messages from a room
messageSchema.index({ room: 1, createdAt: -1 })

// auto-delete messages after 24 hours
messageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 })

const Message = mongoose.model<IMessage>("Message", messageSchema)

export default Message