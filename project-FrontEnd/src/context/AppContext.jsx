import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyProducts } from '../assets/assets';
import toast from 'react-hot-toast';
import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const currency = '$';

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [isSeller, setIsSeller] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [products, setProducts] = useState([]);

  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  //fetch seller status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.post('/api/seller/is-auth');
      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      setIsSeller(false);
    }
  }
  //fetch user status
  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user/is-auth');
      if (data.success) {
        setIsUser(true);
        setUser(data.user);
        setCartItems(data.user.cartItems);
      } else {
        setIsUser(false);
      }
    } catch (error) {
      setUser(null);
      setIsUser(false);
    }
  }

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/product/list');
      if (data.success) {
        setProducts(data.Products)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addToCart = (itemId) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Added to cart!");
  };

  const updateCartItems = (itemId, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated!");
  };

  const removeFromCart = (itemId) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
      setCartItems(cartData);
      toast.success("Removed from cart!");
    }
  };

  const getCartCount = () => {
    let totalCnt = 0;
    for (const item in cartItems) {
      totalCnt += cartItems[item]
    }
    return totalCnt
  }

  const getCartTotalAmt = () => {
    let totalAmt = 0;

    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = products.find(product => product._id === itemId);
        if (itemInfo) {
          totalAmt += itemInfo.offerPrice * cartItems[itemId];
        }
      }
    }

    return Math.floor(totalAmt * 100) / 100;
  };

  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);
  //update database cartitems
  const updateCart = async () => {
    try {
      const { data } = await axios.post('/api/cart/update', { cartItems });
      if (!data.success) {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    if (user) {
      updateCart();
    }
  }, [cartItems])

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    isUser,
    setIsUser,
    products,
    currency,
    cartItems,
    searchQuery,
    setSearchQuery,
    setCartItems,
    addToCart,
    updateCartItems,
    removeFromCart,
    getCartCount,
    getCartTotalAmt,
    axios,
    fetchProducts,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
};

export const useAppContext = () => {
  return useContext(AppContext);
}
export { AppContextProvider };