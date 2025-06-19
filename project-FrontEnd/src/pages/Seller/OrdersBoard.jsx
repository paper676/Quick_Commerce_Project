import React, { useEffect, useState } from 'react'
import { assets, dummyOrders } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';

function OrdersBoard() {
  const boxIcon = assets.box_icon;
  const {currency,isSeller,axios}=useAppContext();
  const [orders,setOrders]=useState([]);

  const fetchOrders=async ()=>{
    try {
      const {data}=await axios.get('/api/order/seller');
      if(data.success){
        setOrders(data.orders);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    if(isSeller){
      fetchOrders();
    }
  },[isSeller])

  return (
    <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
      <div className="flex flex-col md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        {orders.map((order, index) => (
          <div key={index} className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300">
            <div className="flex gap-5">
              <img className="w-12 h-12 object-cover" src={boxIcon} alt="boxIcon" />
              <div >
                {order.items.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <p className="font-medium text-sm">
                      {item.product.name}{" "} <span className={`text-indigo-500 text-xs ${item.quantity < 2 && "hidden"}`}>x {item.quantity}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm">
              <p className='font-medium mb-1'>{order.address.firstName} {order.address.lastName}</p>
              <p>{order.address.street}, {order.address.city}, </p>
              <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
              <p></p>
              <p>{order.address.phone}</p>
            </div>

            <p className="font-medium text-base my-auto text-black/70">{currency}{order.amount}</p>

            <div className="flex flex-col text-sm">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
}

export default OrdersBoard