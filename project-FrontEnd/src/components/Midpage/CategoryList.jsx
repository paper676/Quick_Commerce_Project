import React from 'react'
import { assets, categories } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext';

function CategoryList() {
    const {navigate}=useAppContext();
  return (
    <div className='mt-10'>
        <h2 className='text-4xl text-zinc-700 tracking-tighter px-3 pt-2'>Categories</h2>
        <div className='grid grid-cols-2 sm-grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-5 gap-5 px-2'>
            {categories.map((category,index)=>(
                <div key={index} className='group cursor-pointer py-2 px-2 gap-2 rounded-lg flex flex-col justify-center 
                items-center'
                style={{backgroundColor:category.bgColor}}
                onClick={()=>{
                    navigate(`/user/products/${category.path.toLowerCase()}`);
                    scrollTo(0,0);
                }}
                >
                    <img className='group-hover:scale-102 transition max-w-25' src={category.image} alt={category.text} />
                    <p className='text-sm font-medium text-zinc-500'>{category.text}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default CategoryList