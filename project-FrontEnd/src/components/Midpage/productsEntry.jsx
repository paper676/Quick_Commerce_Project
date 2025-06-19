import React from 'react'
import ImageGallery from './ImageGallery'
import {assets,categories} from '../../assets/assets.js'
import CategoryList from './CategoryList.jsx'
import BestSellerList from './BestSellerList.jsx'
import NewsLetter from './NewsLetter.jsx'
function ProductsEntry() {
  return (
    <div className='w-full px-10 pt-3'>
      <ImageGallery/>
      <CategoryList/>
      <BestSellerList/>
      <NewsLetter/>
    </div>
  )
}

export default ProductsEntry