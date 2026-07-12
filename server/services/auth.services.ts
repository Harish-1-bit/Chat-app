import User from "../models/User.model";

class AuthServices {
    async login(email:string, password:string){
        const user = await User.findOne({email})
        if(!user){
            throw new Error("User not found")
        }
        const validPassword = await user.comparePassword(password)
        if(!validPassword){
            throw new Error("Invalid password")
        }
        return user
    }
}