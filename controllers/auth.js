import User from '../models/User.js'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

// Register
export const register = async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            firstname: req.body.firstname,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASSWORD_SECRET
            ).toString()
        })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }
}

// Login
export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(401).json("Wrong credentials")
            return
        }

        const hashedPwd = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET
        )
        const pwd = hashedPwd.toString(CryptoJS.enc.Utf8)

        if (pwd !== req.body.password) {
            res.status(401).json("Wrong credentials")
            return
        }

        // JWT creation
        const accesstoken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d"}
        )

        // destructuration to not send password (! important !)
        const { password, ...others } = user._doc

        res.status(200).json({ ...others, accesstoken })

    } catch (err) {
        res.status(500).json(err)
    }
}