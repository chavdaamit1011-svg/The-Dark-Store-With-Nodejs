import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Signup from './Component/Signup'
import Login from './Component/Login'
import CustomNavbar from './Component/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Men from './Pages/Men'
import Women from './Pages/Women'
import Whislist from './Pages/Whislist'
import Cart from './Pages/Cart'
import Users from './Pages/Users'
import Footer from './Component/Footer'
import Collection from './Pages/Collection'
import Subcategory from './Pages/Subcategory'
import SearchResults from './Pages/SearchResults'
import SingleProduct from './Pages/SingleProduct'
import AdminPanel from './Pages/AdminPanel'
import Checkout from './Pages/Checkout'
import OrderSuccess from './Pages/OrderSuccess'
import MyOrders from './Pages/MyOrders'
import ContactUs from './Pages/ContactUs'
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './Component/ScrollToTop';
import ScrollToTopBtn from './Component/ScrollToTopBtn';
import ChatWidget from './Component/ChatWidget';

function App() {


  return (
    <BrowserRouter>
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#111',
            color: '#fff',
            border: '1px solid #333'
          }
        }} 
      />
      <ScrollToTop />
      <CustomNavbar/>
     {/* <Signup/>
     <Login/> */}

     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/men" element={<Men/>}/>
      <Route path="/Women" element={<Women/>}/>
      <Route path="/Whislist" element={<Whislist/>}/>
      <Route path="/Cart" element={<Cart/>}/>
      <Route path="/Users" element={<Users/>}/>
      <Route path="/Collection" element={<Collection/>}/>
    {/* <Route path="/collections/:sub" element={<Subcategory/>} /> */}
    <Route path="/collections" element={<Subcategory/>} />
    <Route path="/search/:query" element={<SearchResults/>} />
    <Route path="/product/:id" element={<SingleProduct/>} />
    <Route path="/admin" element={<AdminPanel/>} />
    <Route path="/checkout" element={<Checkout/>} />
    <Route path="/order-success/:id" element={<OrderSuccess/>} />
    <Route path="/orders" element={<MyOrders/>} />
    <Route path="/contact" element={<ContactUs/>} />

     </Routes>
<Footer/>
<ScrollToTopBtn/>
<ChatWidget/>
    </BrowserRouter>


  )
}

export default App
