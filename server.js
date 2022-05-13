import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes/routes.js'

dotenv.config()

// Path avec ES module
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
 
app.use(express.static('client/build'))

mongoose.connect(process.env.MONGODB)
        .then(() => console.log("MongoDB connected"))
        .catch(() => console.log("MongoDB connection failed"))

app.use(cors())

app.use(routes)

app.use('/images', express.static(path.join(__dirname, 'images')))

app.listen(PORT, () => {
    console.log(`Server launched on port : ${PORT}`)
})