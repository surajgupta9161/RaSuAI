import User from "../models/users.model.js";
import bcrypt from "bcryptjs"
import genToken from "../config/token.js";

export const signUp = async (req, res) => {
    try {

        let { name, email, password } = req.body;
        let existEmail = await User.findOne({ email })

        if (existEmail) {
            return res.status(400).json({ message: "email already exist!" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be grater than 6 characters!" })
        }

        let hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name, email, password: hashPassword
        })

        let token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false
        })

        return res.status(201).json(user)
    }
    catch (error) {
        return res.status(500).json({ message: `signup error ${error}` })
    }
}

export const Login = async (req, res) => {
    try {

        let { email, password } = req.body;
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "user not exist!" })
        }

        let isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "password incorrect!" })
        }

        let token = await genToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false
        })

        return res.status(201).json(user)
    }
    catch (error) {
        return res.status(500).json({ message: `login error ${error}` })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "logout successfully!" })
    } catch (error) {
        return res.status(500).json({ message: `logout error ${error}` })
    }
}