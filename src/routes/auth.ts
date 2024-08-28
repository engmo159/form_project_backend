import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }

    user = new User({ name, email, password })
    await user.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    res.status(201).json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    res.json({ token })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/', async (req, res) => {
  try {
    res.send('<h1>Welcome to the Homepage</h1>')
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
