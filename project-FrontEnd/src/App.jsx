import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar/navbar';
import Footer from './components/Footer/footer';
import Midpage from './components/Midpage/midpage';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/Login/loginPage'
import UserPage from './pages/Landing/UserPage'
import ProductsEntry from './components/Midpage/productsEntry';
import Cart from './pages/Cartpage/cartPage';
import Orders from './pages/Orders/ordersPage';
import Profile from './pages/Profile/profilePage';
import AllProducts from './components/Midpage/AllProducts';
import ProductCategory from './pages/productCats/productCategory';
import Productpage from './components/Midpage/Productpage';
import AddNewAddress from './components/Midpage/AddNewAddress';

import SellerLogin from './pages/Seller/sellerLogin';
import SellerHome from './pages/Seller/SellerLayout';
import ProductsList from './pages/Seller/ProductsList';
import OrdersBoard from './pages/Seller/OrdersBoard';
import AddProductpage from './pages/Seller/AddProductpage';

import { useAppContext } from './context/AppContext';
import { Toaster } from 'react-hot-toast';
import Loading from './components/Loading';

function App() {
  const isSellerpath = useLocation().pathname.includes("seller");
  const { isSeller } = useAppContext();
  const { isUser } = useAppContext();
  return (
    <div>
      <Toaster/>
      <Routes>

        <Route path='/' element={<LandingPage/>}></Route>

        {/* <Route path='/login' element={<LoginPage />}></Route>

        <Route path="/login/:username" element={<UserPage />}>
          <Route index element={<ProductsEntry />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add-address" element={<AddNewAddress />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="products/:category" element={<ProductCategory />} />
          <Route path="products/:category/:id" element={<Productpage />} />
        </Route> */}

        <Route path="/user" element={isUser ? <UserPage /> : <LoginPage/>}>
          <Route index element={isUser ? <ProductsEntry />: null} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="add-address" element={<AddNewAddress />} />
          <Route path="loader" element={<Loading />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="products/:category" element={<ProductCategory/>} />
          <Route path="products/:category/:id" element={<Productpage/>} />
        </Route>

        <Route path='/seller' element={isSeller ? <SellerHome /> : <SellerLogin />}>
          <Route index element={isSeller ? <AddProductpage /> : null} />
          <Route path="productslist" element={<ProductsList />} />
          <Route path="orders" element={<OrdersBoard />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App