import React from 'react'
import ProductCard from './productCard.jsx'
import { useAppContext } from '../../context/AppContext'

function BestSellerList() {
  const { products } = useAppContext();
  return (
    <div className='mt-10'>
      <h2 className='text-4xl text-zinc-700 tracking-tighter px-3 pt-2'>Best Seller</h2>
      <div className='grid grid-cols-2 sm-grid-cols-1 md:grid-cols-3 lg:grid-cols-5 px-5 gap-4 md:gap-6 mqx-w-25 mt-5'>
        {products.filter((product)=> product.inStock).slice(0,5).map((product,index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  )
}

export default BestSellerList 