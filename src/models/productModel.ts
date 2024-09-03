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
  description: { type: String },
  category: { type: String },
  price: { type: Number },
  discountPercentage: { type: Number },
  rating: { type: Number },
  stock: { type: Number },
  tags: [{ type: String }],
  brand: { type: String },
  sku: { type: String },
  weight: { type: Number },
  dimensions: { type: DimensionsSchema },
  warrantyInformation: { type: String },
  shippingInformation: { type: String },
  availabilityStatus: { type: String },
  reviews: [ReviewSchema],
  returnPolicy: { type: String },
  minimumOrderQuantity: { type: Number },
  meta: { type: MetaSchema, required: true },
  images: [{ type: String, required: true }],
  thumbnail: { type: String, required: true },
})

const productModel = mongoose.model<ProductDocument>('Product', ProductSchema)

export default productModel
