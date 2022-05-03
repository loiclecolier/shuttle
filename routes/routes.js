import express from 'express'
import { addProduct, getProducts, getProduct, updateProduct, deleteProduct } from '../controllers/product.js'
import { addBrand, getBrands, getBrand, updateBrand, deleteBrand } from '../controllers/brand.js'
import { addCategory, getCategories, getCategory, updateCategory, deleteCategory } from '../controllers/category.js'
import { addCart, deleteCart, getCart, getCarts, updateCart } from '../controllers/cart.js'
import { addOrder, deleteOrder, getMonthlyIncome, getOrders, getUserOrders, updateOrder } from '../controllers/order.js'
import { getUser, getUsers, updateUser, deleteUser, getUserStats } from '../controllers/user.js'
import { register, login } from '../controllers/auth.js'
import { payment } from '../controllers/stripe.js'
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../middlewares/verifyToken.js'
import multer from '../config/multer-config.js'

// création d'un router
const router = express.Router()

// PRODUCT
// router.post('/api/products', verifyTokenAndAdmin, multer, addProduct)
// router.get('/api/products', getProducts)
// router.get('/api/products/:id', getProduct)
// router.patch('/api/products/:id', verifyTokenAndAdmin, multer, updateProduct)
// router.delete('/api/products/:id', verifyTokenAndAdmin, deleteProduct)
router.post('/api/products', multer, addProduct)
router.get('/api/products', getProducts)
router.get('/api/products/:id', getProduct)
router.patch('/api/products/:id', multer, updateProduct)
router.delete('/api/products/:id', deleteProduct)

// BRAND
// router.post('/api/brands', verifyTokenAndAdmin, addBrand)
// router.get('/api/brands', getBrands)
// router.get('/api/brands/:id', getBrand)
// router.patch('/api/brands/:id', verifyTokenAndAdmin, updateBrand)
// router.delete('/api/brands/:id', verifyTokenAndAdmin, deleteBrand)
router.post('/api/brands', addBrand)
router.get('/api/brands', getBrands)
router.get('/api/brands/:id', getBrand)
router.patch('/api/brands/:id', updateBrand)
router.delete('/api/brands/:id', deleteBrand)

// CATEGORY
// router.post('/api/categories', verifyTokenAndAdmin, addCategory)
// router.get('/api/categories', getCategories)
// router.get('/api/categories/:id', getCategory)
// router.patch('/api/categories/:id', verifyTokenAndAdmin, updateCategory)
// router.delete('/api/categories/:id', verifyTokenAndAdmin, deleteCategory)
router.post('/api/categories', addCategory)
router.get('/api/categories', getCategories)
router.get('/api/categories/:id', getCategory)
router.patch('/api/categories/:id', updateCategory)
router.delete('/api/categories/:id', deleteCategory)

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
router.get('/api/carts/:userId', verifyTokenAndAuthorization, getCart)
router.get('/api/carts', verifyTokenAndAdmin, getCarts)
router.post('/api/carts', verifyToken, addCart)
router.put('/api/carts/:id', verifyTokenAndAuthorization, updateCart)
router.delete('/api/carts/:id', verifyTokenAndAuthorization, deleteCart)

// ORDER
router.get('/api/orders/income', verifyTokenAndAdmin, getMonthlyIncome)
router.get('/api/orders/:userId', verifyTokenAndAuthorization, getUserOrders)
router.get('/api/orders', verifyTokenAndAdmin, getOrders)
router.post('/api/orders', verifyToken, addOrder)
router.put('/api/orders/:id', verifyTokenAndAdmin, updateOrder)
router.delete('/api/orders/:id', verifyTokenAndAdmin, deleteOrder)

// STRIPE
router.post('/api/checkout/payment', payment)

// si aucune route ne correspond à l'API -> renvoyer vers l'app react
// router.get('/*', (_, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'))
// })

// export du router
export default router