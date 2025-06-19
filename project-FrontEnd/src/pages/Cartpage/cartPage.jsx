import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext';
import { dummyAddress } from '../../assets/assets';
import toast from 'react-hot-toast';

function cart() {
    const [showAddress, setShowAddress] = useState(false)
    const [payType, setPayType] = useState("COD");
    const [cartArray, getCartArray] = useState([]);
    const [addresses, setAddresses] = useState([])
    const [sellectedAddress, setSellectedAddress] = useState(null)

    const { products, currency, removeFromCart, cartItems, navigate,
        getCartCount, getCartTotalAmt, updateCartItems, axios, user, setCartItems } = useAppContext();

    const getCart = () => {
        let tempArray = [];
        for (const key in cartItems) {
            const product = products.find((item) => item._id === key);
            product.quantity = cartItems[key];
            tempArray.push(product);
        }
        getCartArray(tempArray);
    }

    const getUserAddress = async () => {
        try {
            const { data } = await axios.get('/api/address/get');
            if (data.success) {
                setAddresses(data.addresses);
                if (data.addresses.length > 0) {
                    setSellectedAddress(data.addresses[0]);
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const placeOrder = async () => {
        try {
            if (!sellectedAddress) {
                return toast.error("Please Select An Address");
            }
            //COD order
            if (payType === "COD") {
                const { data } = await axios.post('/api/order/cod', {
                    userId: user._id,
                    items: cartArray.map((item) => ({ product: item._id, quantity: item.quantity })),
                    address: sellectedAddress._id
                })
                if (data.success) {
                    toast.success(data.message);
                    setCartItems({});
                    navigate('/user/order');
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post('/api/order/stripe', {
                    userId: user._id,
                    items: cartArray.map((item) => ({ product: item._id, quantity: item.quantity })),
                    address: sellectedAddress._id
                })
                if (data.success) {
                    window.location.replace(data.url)
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (products && cartItems) {
            getCart();
        }
    }, [products, cartItems])

    useEffect(() => {
        if (user) {
            getUserAddress();
        }
    }, [user])

    return products && cartItems ? (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-indigo-500">{getCartCount()} Items</span>
                </h1>
                {Object.keys(cartItems).length > 0 ? (
                    <div>
                        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                            <p className="text-left">Product Details</p>
                            <p className="text-center">Subtotal</p>
                            <p className="text-center">Action</p>
                        </div>

                        {cartArray.map((product, index) => (
                            <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                                <div className="flex items-center md:gap-6 gap-3">
                                    <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                                        <img className="max-w-full h-full object-cover" src={product.images[0]} alt={product.name} />
                                    </div>
                                    <div>
                                        <p className="hidden md:block font-semibold">{product.name}</p>
                                        <div className="font-normal text-gray-500/70">
                                            <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                            <div className='flex items-center'>
                                                <p>Qty:</p>
                                                <select onChange={e => updateCartItems(product._id, Number(e.target.value))}
                                                    value={cartItems[product._id]} className='outline-none'>
                                                    {Array(cartItems[product._id] > 5 ? cartItems[product._id] : 5).fill('').map((_, index) => (
                                                        <option key={index} value={index + 1}>{index + 1}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
                                <button onClick={() => removeFromCart(product._id)} className="cursor-pointer mx-auto">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>)
                        )}
                    </div>
                ) : (
                    <div className='flex justify-center h-[22rem] p-10 mt-15'>
                        <p className='text-sm font-medium text-zinc-500 mt-15'>Your Cart Is Empty.</p>
                    </div>
                )
                }
                <button onClick={() => {
                    navigate('/user/products');
                    scrollTo(10, 10);
                }} className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium">
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="#615fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Continue Shopping
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-sm font-medium text-gray-500">{sellectedAddress ? `${sellectedAddress.street}, ${sellectedAddress.city.toUpperCase()} ,${sellectedAddress.zipcode} ,${sellectedAddress.state}` : "No address found"}</p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-sm font-medium text-indigo-600 hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                {addresses.map((address, index) => (
                                    <p onClick={() => { setSellectedAddress(address), setShowAddress(false) }} className="text-sm font-medium text-gray-500 p-2 hover:bg-gray-100">
                                        {address.street}, {address.city},{address.zipcode},{address.country}
                                    </p>
                                ))}
                                <p onClick={() => {
                                    navigate('/user/add-address');
                                    scrollTo(0, 0);
                                }} className="text-sm font-medium text-indigo-600 text-center cursor-pointer p-2 hover:bg-indigo-500/10">
                                    Add New address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select onChange={e => setPayType(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{currency}{getCartTotalAmt()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{currency}{getCartTotalAmt() * 2 / 100}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{currency}{getCartTotalAmt() * 2 / 100 + getCartTotalAmt()}</span>
                    </p>
                </div>

                <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
                    {payType === "COD" ? "Place Order" : "Continue to Pay"}
                </button>
            </div>
        </div>
    ) : null
}

export default cart