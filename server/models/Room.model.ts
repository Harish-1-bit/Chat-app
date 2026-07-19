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
        type: {
            type: String,
            enum: ["private", "group"],
            required: true
        },
        name: {
            type: String,
            required: true
        },
        participants: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            required: true
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        messages: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Message",
        }
    },
    { timestamps: true }
)

// Data integrity: no duplicate private rooms between same pair
RoomSchema.index(
    { participants: 1, type: 1 },
    { unique: true, partialFilterExpression: { type: "private" } }
);

// Main query: user's rooms sorted by recent activity
RoomSchema.index({ participants: 1, updatedAt: -1 });

// Only if you have an "admin manages these rooms" feature
RoomSchema.index({ admin: 1 });

const Room = mongoose.model<IRoom>("Room", RoomSchema)

export default Room