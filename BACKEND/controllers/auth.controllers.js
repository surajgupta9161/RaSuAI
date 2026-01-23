import User from "../models/users.model.js";
import bcrypt from "bcryptjs"

const signUp = async (req, res) => {
    try {

        let { name, email, password } = req.body;
        let existEmail = await User.findOne({ email })

        if (existEmail) {
            return res.status(400).json({ message: "email already exist!" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be grater than 6 characters!" })
        }

        let hashPassword = bcrypt.hash(password, 10)

        const user = await User.create({
            name, email, password: hashPassword
        })
    }
    catch (error) {
        console.log(error)
    }
}

