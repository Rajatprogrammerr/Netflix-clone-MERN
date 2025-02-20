import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateTokensAndCookie } from "../utils/generateToken.js";

// export async function home(req, res) {
//     res.send('Hello home')
// }


export async function signup(req, res) {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All feilds are required" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid Email" })
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "password length must be greater than 5" })
        }

        const existingUserByEmail = await User.findOne({ email: email })

        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "Email already exists" })
        }

        const existingUserByUsername = await User.findOne({ username: username })

        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: "Username already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const PROFILE_PIC = ["/pic1.jpg", "/pic2.jpg", "/pic3.jpg"]
        const image = PROFILE_PIC[Math.floor(Math.random * (PROFILE_PIC.length))]

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            image: image
        })

        if (newUser) {
            generateTokensAndCookie(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                success: true,
                user: {
                    ...newUser._doc,
                    password: ""
                }
            })
        }

    } catch (error) {
        console.log("Error in Signup", error.message)
        res.status(500).json({ success: false, message: "Internal server error" })

    }
}


export async function login(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are necessary" })
        }
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" })
        }
        generateTokensAndCookie(user._id, res)

        res.status(200).json({
            success: true, user: {
                ...user._doc,
                password: ""
            }
        })
    }
    catch (error) {
        console.error("Error in login", error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}


export async function logout(req, res) {
    try {

        res.clearCookie("jwt-netflix")
        res.status(200).json({ success: true, message: "logged out successfully" })
    }
    catch (error) {
        console.log("Error in logout", error.message)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export function authCheck(req, res) {
    try {
        // console.log("req.user:", req.user)
        res.status(200).json({ success: true, user: req.user })
    } catch (error) {
        console.log("error in Aunthentication:", error.message)
        res.status(500).json({ success: false, message: "INternal server error" })
    }
}