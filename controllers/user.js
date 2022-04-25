import User from '../models/User.js'
import CryptoJS from 'crypto-js'

// Get
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        // destructuration to not send password (! important !)
        const { password, ...others } = user._doc

        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
    
}

// Get all
export const getUsers = async (req, res) => {
    const query = req.query.new
    try {
        const users = query
        // renvoie les 5 derniers users créés si req : /api/users?new=true
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
    
}

// Update
export const updateUser = async (req, res) => {

    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSWORD_SECRET
        ).toString()
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }

}

// Delete
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User deleted")
    } catch (err) {
        res.status(500).json(err)
    }
}

// Get user stats
export const getUserStats = async (req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])

        res.status(200).json(data)

    } catch (err) {
        res.status(500).json(err)
    }
}