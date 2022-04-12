import Navbar from "./Components/Navbar/Navbar"
import { Routes, Route } from 'react-router-dom'
import Shop from './Containers/Shop/Shop'
import Product from "./Containers/Product/Product"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/shop/:slug' element={<Product />} />
        <Route path='/guide' element={<h1>Guide</h1>} />
        <Route path='/about' element={<h1>À propos</h1>} />
        <Route path='/contact' element={<h1>Contact</h1>} />
        <Route path='*' element={<h1>Not Found 404</h1>} />
      </Routes>
    </>
  )
}

export default App
