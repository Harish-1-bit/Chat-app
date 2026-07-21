import mongoose from "mongoose";

interface IRoom {
    type: string
    name: string
    participants: [mongoose.Schema.Types.ObjectId]
    admin: mongoose.Schema.Types.ObjectId
    messages: [mongoose.Schema.Types.ObjectId]
}

const RoomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique:true,
            required: true
        }
    },
    { timestamps: true }
)

RoomSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const Room = mongoose.model<IRoom>("Room", RoomSchema)

export default Room