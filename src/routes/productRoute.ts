import express from 'express'
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productService'
const router = express.Router()

router.get('/', async (req, res) => {
  const products = await getAllProducts(req, res)
  res.status(200).send(products)
})
router.get('/:id', async (req, res) => {
  const products = await getProductById(req, res)
  res.status(200).send(products)
})
router.put('/edit/:id', async (req, res) => {
  const products = await updateProduct(req, res)
  res.status(200).send(products)
})
router.delete('/:id', async (req, res) => {
  const products = await deleteProduct(req, res)
  res.status(200).send(products)
})
router.post('/add', async (req, res) => {
  const products = await createProduct(req, res)
  res.status(200).send(products)
})
export default router
