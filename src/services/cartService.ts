import { ICart, ICartItem } from './../models/cartModel'
import { cartModel } from '../models/cartModel'
import productModel from '../models/productModel'
//create new cart [helper function]
interface CreateCartForUser {
  userId: string
}
const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 })
  await cart.save()
  return cart
}
interface GetActiveCartForUser {
  userId: string
}
export const getActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: 'active' })
  if (!cart) {
    cart = await createCartForUser({ userId })
  }
  return cart
}
// clear cart
interface ClearCart {
  userId: string
}

export const clearCart = async ({ userId }: ClearCart) => {
  const cart = await getActiveCartForUser({ userId })
  cart.items = []
  cart.totalAmount = 0
  const updatedCart = await cart.save()
  return { data: { updatedCart }, statusCode: 200 }
}
// add items to cart
interface AddItemToCart {
  productId: any
  quantity: number
  userId: string
}

export const addItemToCart = async ({
  productId,
  quantity,
  userId,
}: AddItemToCart) => {
  const cart = await getActiveCartForUser({ userId })
  //   does item exist in cart
  const existInCart = cart.items.find(p => p.product.toString() === productId)
  if (existInCart) {
    return { data: 'item already in cart', statusCode: 400 }
  }
  // fetch product
  const product = await productModel.findById(productId)
  if (!product) {
    return { data: 'product not found', statusCode: 400 }
  }
  if (product.stock < quantity) {
    return { data: 'low stock', statusCode: 400 }
  }
  cart.items.push({
    product: productId,
    quantity,
    unitPrice: product.price,
  })
  // update total amount for cart
  cart.totalAmount += product.price * quantity
  const updatedCart = await cart.save()
  return { data: { updatedCart }, statusCode: 200 }
}

// update items in cart

interface UpdateItemInCart {
  productId: any
  quantity: number
  userId: string
}
export const updateItemInCart = async ({
  productId,
  quantity,
  userId,
}: UpdateItemInCart) => {
  const cart = await getActiveCartForUser({ userId })
  const existInCart = cart.items.find(p => p.product.toString() === productId)
  if (!existInCart) {
    return { data: 'item dose not exist in cart', statusCode: 400 }
  }
  const product = await productModel.findById(productId)
  if (!product) {
    return { data: 'product not found', statusCode: 400 }
  }
  if (product.stock < quantity) {
    return { data: 'low stock', statusCode: 400 }
  }
  const otherCartItems = cart.items.filter(
    p => p.product.toString() !== productId
  )
  let total = calculateTotalCartItems({ cartItems: otherCartItems })

  existInCart.quantity = quantity

  total += existInCart.quantity * existInCart.unitPrice
  cart.totalAmount = total
  const updatedCart = await cart.save()
  return { data: { updatedCart }, statusCode: 200 }
}

// delete items in cart
interface DeleteItemInCart {
  productId: any
  userId: string
}

export const deleteItemInCart = async ({
  productId,
  userId,
}: DeleteItemInCart) => {
  const cart = await getActiveCartForUser({ userId })
  const existInCart = cart.items.find(p => p.product.toString() === productId)
  if (!existInCart) {
    return { data: 'item dose not exist in cart', statusCode: 400 }
  }
  const otherCartItems = cart.items.filter(
    p => p.product.toString() !== productId
  )
  const total = calculateTotalCartItems({ cartItems: otherCartItems })
  cart.items = otherCartItems
  cart.totalAmount = total
  const updatedCart = await cart.save()
  return { data: { updatedCart }, statusCode: 200 }
}

// calculate total cart items [helper function]
const calculateTotalCartItems = ({ cartItems }: { cartItems: ICartItem[] }) => {
  const total = cartItems.reduce((sum, product) => {
    sum += product.quantity * product.unitPrice
    return sum
  }, 0)
  return total
}
