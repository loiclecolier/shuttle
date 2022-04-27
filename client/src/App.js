import Navbar from "./Components/Navbar/Navbar"
import Footer from "./Components/Footer/Footer"
import { Routes, Route, Navigate } from 'react-router-dom'
import Shop from './Containers/Shop/Shop'
import Product from "./Containers/Shop/Product/Product"
import Dashboard from "./Containers/Dashboard/Dashboard"
import HomeDashboard from "./Containers/Dashboard/Home/Home"
import ProductsDashboard from "./Containers/Dashboard/Products/Products"
import CategoriesDashboard from "./Containers/Dashboard/Products/ManageCategories/ManageCategories"
import BrandsDashboard from "./Containers/Dashboard/Products/ManageBrands/ManageBrands"
import AddProduct from "./Containers/Dashboard/Products/FormProduct/AddProduct/AddProduct"
import UpdateProduct from "./Containers/Dashboard/Products/FormProduct/UpdateProduct/UpdateProduct"
import ViewProducts from "./Containers/Dashboard/Products/ViewProducts/ViewProducts"
import CommandsDashboard from "./Containers/Dashboard/Commands/Commands"
import UsersDashboard from "./Containers/Dashboard/Users/Users"
import StatisticsDashboard from "./Containers/Dashboard/Statistics/Statistics"
import Cart from "./Containers/Users/Cart/Cart"
import Login from "./Containers/Users/Login/Login"
import Register from "./Containers/Users/Register/Register"

function App() {

  const user = false

  return (
    <>
      <Navbar />

      <div className="content">
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/:slug' element={<Product />} />
          <Route path='/cart' element={!user ? <Navigate to="/login" /> : <Cart />} />
          <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
          <Route path='/register' element={user ? <Navigate to="/" /> : <Register />} />
          <Route path='/dashboard' element={<Dashboard />}>
            <Route path='/dashboard/home' element={<HomeDashboard />} />
            <Route path='/dashboard/products' element={<ProductsDashboard />}>
              <Route path='/dashboard/products' element={<ViewProducts />} />
              <Route path='/dashboard/products/add' element={<AddProduct />} />
              <Route path='/dashboard/products/update/:slug' element={<UpdateProduct />} />
              <Route path='/dashboard/products/categories' element={<CategoriesDashboard />} />
              <Route path='/dashboard/products/brands' element={<BrandsDashboard />} />
            </Route>
            <Route path='/dashboard/commands' element={<CommandsDashboard />} />
            <Route path='/dashboard/users' element={<UsersDashboard />} />
            <Route path='/dashboard/statistics' element={<StatisticsDashboard />} />
          </Route>
          <Route path='*' element={<h1>Not Found 404</h1>} />
        </Routes>
      </div>

      <Footer />
    </>
  )
}

export default App
