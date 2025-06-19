import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { dummyOrders } from '../../assets/assets';
import toast from 'react-hot-toast';

function orders() {

  const [myOrders, setMyOrders] = useState([]);
  const { currency,axios,user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const {data}=await axios.get('/api/order/user');
      if(data.success){
        setMyOrders(data.orders);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if(user){
      fetchMyOrders();
    }
  }, [user])

  return (
    <div className='px-10 mt-5'>
      <div className='py-5 w-full'>
        <h1 className='sm:text-xl md:text-2xl  lg:text-3xl text-zinc-600 tracking-tighter px-3 pt-2'>My Orders</h1>
      </div>
      {myOrders.map((order, index) => (
        <div key={index} className="border border-gray-300 rounded-md mb-5 p-5 py-5 max-w-4xl" >
          <p className='flex flex-row justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
            <span>OrderId: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>Total Amount<span className='text-[10px]'> (Including Tax) </span>: {currency}{order.amount}</span>
          </p>
          {order.items.map((item, index) => (
            <div key={index} className={`relative bg-white text-gray-400 ${order.items.length !== index + 1 && "border-b"} border-grsy-300 flex flex-col md:flex-row md:items-center justify-between p-3 py-4 md:gap-15 w-full max-w-4xl`}>
              <div className='flex items-center mb-4 md:mb-0'>
                <div className='bg-zinc-100 p-4 rounded-lg mt-3'>
                  <img src={item.product.images[0]} alt="" className='w-15 h-15' />
                </div>
                <div className='ml-5'>
                  <h2 className='text-lg font-medium text-zinc-500'>{item.product.name}</h2>
                  <p className='text-sm font-medium text-zinc-500'>Category: {item.product.category}</p>
                </div>
              </div>
              <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0 text-gray-500 text-sm font-medium'>
                <p>Quantity: {item.quantity || 1}</p>
                <p>Status: <span className='text-green-600'>{order.status}</span></p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <p className='text-indigo-500 text-sm font-medium'>Amount: {currency}{item.product.offerPrice * item.quantity}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default orders