import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/routes.js'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
 
//app.use(express.static('client/build'))

mongoose.connect(process.env.MONGODB)
        .then(() => console.log("MongoDB connected"))
        .catch(() => console.log("MongoDB connection failed"))

app.use(routes)

app.listen(PORT, () => {
    console.log(`Server launched on port : ${PORT}`)
})