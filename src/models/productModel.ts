import mongoose, { Schema, Document } from 'mongoose'

interface Dimensions {
  width: number
  height: number
  depth: number
}

interface Review {
  rating: number
  comment: string
  date: Date
  reviewerName: string
  reviewerEmail: string
}

interface Meta {
  createdAt: Date
  updatedAt: Date
  barcode: string
  qrCode: string
}

export interface ProductDocument extends Document {
  name: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: Dimensions
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: Review[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: Meta
  images: string[]
  thumbnail: string
}

const DimensionsSchema: Schema = new Schema({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  depth: { type: Number, required: true },
})

const ReviewSchema: Schema = new Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
  reviewerName: { type: String, required: true },
  reviewerEmail: { type: String, required: true },
})

const MetaSchema: Schema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  barcode: { type: String, required: true },
  qrCode: { type: String, required: true },
})

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  rating: { type: Number, required: true },
  stock: { type: Number, required: true },
  tags: [{ type: String, required: true }],
  brand: { type: String, required: true },
  sku: { type: String, required: true },
  weight: { type: Number, required: true },
  dimensions: { type: DimensionsSchema, required: true },
  warrantyInformation: { type: String, required: true },
  shippingInformation: { type: String, required: true },
  availabilityStatus: { type: String, required: true },
  reviews: [ReviewSchema],
  returnPolicy: { type: String, required: true },
  minimumOrderQuantity: { type: Number, required: true },
  meta: { type: MetaSchema, required: true },
  images: [{ type: String, required: true }],
  thumbnail: { type: String, required: true },
})

const productModel = mongoose.model<ProductDocument>('Product', ProductSchema)

export default productModel
