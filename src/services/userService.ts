import userModel from '../models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// register

interface RegisterParams {
  name: string
  email: string
  password: string
}

export const register = async ({ name, email, password }: RegisterParams) => {
  const findUser = await userModel.findOne({ email })
  if (findUser) {
    return { data: 'User already exists!', statusCode: 400 }
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = new userModel({ name, email, password: hashedPassword })
  await newUser.save()
  return { data: generateJWT({ name, email }), statusCode: 200 }
}

// login
interface LoginParams {
  email: string
  password: string
}
export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email })
  if (!findUser) {
    return { data: 'incorrect email or password!', statusCode: 400 }
  }
  const passwordMatch = await bcrypt.compare(password, findUser.password)
  if (passwordMatch) {
    return {
      data: generateJWT({ email, name: findUser.name }),
      statusCode: 200,
    }
  }
  return { data: 'incorrect email or password!', statusCode: 400 }
}
// jwt
const generateJWT = (data: any) => {
  return jwt.sign(data, process.env.JWT_SECRET || '')
}
