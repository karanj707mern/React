import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './Component/Home'
import { Cart } from './PagesComponents/Cart'
import {Contact} from "./PagesComponents/Contact"
// import {Categories} from "./PagesComponents/Categories"
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState, useEffect } from 'react'

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedItems);
  }, []);

  const updateCart = (newCartItems) => {
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home cartItems={cartItems} updateCart={updateCart} />} />
        <Route path="/Cart" element={<Cart cartItems={cartItems} updateCart={updateCart} />} />
       <Route path="/Contact" element={<Contact/>} />
        
             </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
