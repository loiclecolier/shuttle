import express from 'express'
import { addProduct, getProducts, getProduct, updateProduct, deleteProduct } from '../controllers/product.js'
import { addBrand, getBrands, getBrand, updateBrand, deleteBrand } from '../controllers/brand.js'
import { addCategory, getCategories, getCategory, updateCategory, deleteCategory } from '../controllers/category.js'
import { register, login } from '../controllers/auth.js'
import { getUser, getUsers, updateUser, deleteUser, getUserStats } from '../controllers/user.js'
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../middlewares/verifyToken.js'
import multer from '../config/multer-config.js'

// création d'un router
const router = express.Router()

// PRODUCT
router.post('/api/products', verifyTokenAndAdmin, multer, addProduct)
router.get('/api/products', getProducts)
router.get('/api/products/:id', getProduct)
router.patch('/api/products/:id', verifyTokenAndAdmin, multer, updateProduct)
router.delete('/api/products/:id', verifyTokenAndAdmin, deleteProduct)

// BRAND
router.post('/api/brands', verifyTokenAndAdmin, addBrand)
router.get('/api/brands', getBrands)
router.get('/api/brands/:id', getBrand)
router.patch('/api/brands/:id', verifyTokenAndAdmin, updateBrand)
router.delete('/api/brands/:id', verifyTokenAndAdmin, deleteBrand)

// CATEGORY
router.post('/api/categories', verifyTokenAndAdmin, addCategory)
router.get('/api/categories', getCategories)
router.get('/api/categories/:id', getCategory)
router.patch('/api/categories/:id', verifyTokenAndAdmin, updateCategory)
router.delete('/api/categories/:id', verifyTokenAndAdmin, deleteCategory)

// AUTH
router.post('/api/auth/register', register)
router.post('/api/auth/login', login)

// USER
router.get('/api/users/stats', verifyTokenAndAdmin, getUserStats)
router.get('/api/users/:id', verifyTokenAndAuthorization, getUser)
router.get('/api/users', verifyTokenAndAdmin, getUsers)
router.put('/api/users/:id', verifyTokenAndAdmin, updateUser)
router.delete('/api/users/:id', verifyTokenAndAuthorization, deleteUser)

// CART


// ORDER


// si aucune route ne correspond à l'API -> renvoyer vers l'app react
// router.get('/*', (_, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'))
// })

// export du router
export default router