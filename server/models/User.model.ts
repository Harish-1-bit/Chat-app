import  { Schema, model } from "mongoose";

export enum Gender{
    MALE="male",
    FEMALE="female",
    OTHER="other"
}

interface IUser{
    fullName: string
    password: string
    email: string
    gender: Gender
    role:string
    isGuest:boolean
}

const userSchema  = new Schema<IUser>({
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        required:true,
        enum:["user","admin"],
        default:"user"
    },
    email: {
        type: String,
        required:true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    gender: {
        type: String,
        // required: [true, "Gender is required"],
        enum: Object.values(Gender)
    },
    isGuest: {
        type: Boolean,
        default: false
    }
},{
    timestamps:true
})

const User = model<IUser>("User", userSchema)

export default User