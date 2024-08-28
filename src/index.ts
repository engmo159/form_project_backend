import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoute from './routes/userRoute'

dotenv.config()
const app = express()
app.use(cors())

app.use(express.json())

mongoose
  .connect(process.env.MONGODB_URI || '')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('cant connect', err))

app.use('/user', userRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
