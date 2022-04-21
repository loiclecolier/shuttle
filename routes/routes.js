import express from 'express'
import { addProduct, getProducts, getProduct, updateProduct, deleteProduct } from '../controllers/productControllers.js'
import { addBrand, getBrands, getBrand, updateBrand, deleteBrand } from '../controllers/brandControllers.js'
import { addCategory, getCategories, getCategory, updateCategory, deleteCategory } from '../controllers/categoryControllers.js'
// import { auth } from '../middleware/auth.js'
import multer from '../config/multer-config.js'

// création d'un router
const router = express.Router()

// PRODUCT
router.post('/api/products', multer, addProduct)
router.get('/api/products', getProducts)
router.get('/api/products/:id', getProduct)
router.patch('/api/products/:id', multer, updateProduct)
router.delete('/api/products/:id', deleteProduct)

// BRAND
router.post('/api/brands', addBrand)
router.get('/api/brands', getBrands)
router.get('/api/brands/:id', getBrand)
router.patch('/api/brands/:id', updateBrand)
router.delete('/api/brands/:id', deleteBrand)

// CATEGORY
router.post('/api/categories', addCategory)
router.get('/api/categories', getCategories)
router.get('/api/categories/:id', getCategory)
router.patch('/api/categories/:id', updateCategory)
router.delete('/api/categories/:id', deleteCategory)


// si aucune route ne correspond à l'API -> renvoyer vers l'app react
// router.get('/*', (_, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'))
// })

// export du router
export default router