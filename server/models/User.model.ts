import  { Schema,model } from "mongoose";

enum Gender{
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
        enum:["user","admin"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: Object.values(Gender)
    }
},{
    timestamps:true
})

userSchema.index({ email: 1 });

const User = model<IUser>("User", userSchema)

export default User