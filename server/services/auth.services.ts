import User, { Gender } from "../models/User.model.js";
import bcrypt from "bcrypt"
class AuthServices {

    // sign up
    async signup(
        fullName: string,
        email: string,
        password: string,
        confirmpassword: string,
        gender: string
    ) {
        if (password !== confirmpassword) {
            throw new Error("Passwords do not match")
        }

        const user = await User.findOne({ email })
        if (user) {
            throw new Error("User already exists", {
                cause: {
                    statusCode: 409
                }
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const createdUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            gender: gender as Gender
        })

        // return createdUser;
        const { password: removedPassword, ...rest } = createdUser;
        return rest;

    }

    // login
    async login(email: string, password: string) {
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error("User Not Found")
        }
        const confirmpassword = await bcrypt.compare(password, user.password)

        if (!confirmpassword) {
            throw {
                statusCode: 409,
                message: "Invalid Password"
            }
        }
        const { password: removedPassword, ...rest } = user;
        return rest;
    }

    // Guest Login
    async guestLogin(){
        const gNumer = Math.floor(Math.random()*1000)
        const guestUser = await User.create({
          fullName:`Guest_${gNumer}`,
          isGuest:true,
          role:"user"
        })
        const { password: removedPassword, ...rest } = guestUser.toObject();
        return rest;
    }
}

export default new AuthServices()