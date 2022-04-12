import Navbar from "./Components/Navbar/Navbar"
import Footer from "./Components/Footer/Footer"
import { Routes, Route } from 'react-router-dom'
import Shop from './Containers/Shop/Shop'
import Product from "./Containers/Shop/Product/Product"
import Dashboard from "./Containers/Dashboard/Dashboard"
import ProductsDashboard from "./Containers/Dashboard/Products/Products"
import HomeDashboard from "./Containers/Dashboard/Home/Home"

function App() {
  return (
    <>
      <Navbar />

      <div className="content">
        <Routes>
          <Route path='/' element={<h1>Home</h1>} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/shop/:slug' element={<Product />} />
          <Route path='/guide' element={<h1>Guide</h1>} />
          <Route path='/about' element={<h1>À propos</h1>} />
          <Route path='/contact' element={<h1>Contact</h1>} />
          <Route path='/dashboard' element={<Dashboard />}>
            <Route path='/dashboard/home' element={<HomeDashboard />} />
            <Route path='/dashboard/products' element={<ProductsDashboard />} />
          </Route>
          <Route path='*' element={<h1>Not Found 404</h1>} />
        </Routes>
      </div>

      <Footer />
    </>
  )
}

export default App
