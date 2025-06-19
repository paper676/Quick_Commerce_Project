import React from 'react'
import ProductCard from '../../components/Midpage/productCard'
import { useAppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom';
import { categories } from '../../assets/assets';
function productCategory() {
    const { products } = useAppContext();
    const { category } = useParams();

    const searchCategory = categories.find(item => item.path.toLowerCase() === category?.toLowerCase());
    const filteredproducts = products.filter(product => product.category[0].toLowerCase() === category?.toLowerCase());

    return (
        <div className='mt-5 px-10 pt-5'>
            {searchCategory ? (
                <div>
                    <h2 className='text-4xl text-zinc-700 tracking-tighter px-5 pt-2'>
                        {searchCategory.text.toUpperCase()}
                    </h2>

                    {filteredproducts.length > 0 ? (
                        <div className='grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 px-5 gap-4 md:gap-6 mt-10'>
                            {filteredproducts
                                .filter(product => product.inStock)
                                .map((product, index) => (
                                    <ProductCard key={index} product={product} />
                                ))}
                        </div>
                    ) : (
                        <div className='flex  justify-center h-[25rem] p-10 mt-10'>
                            <p className='text-sm font-medium text-zinc-500 mt-15'>No items found in the "{category}" category.</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className='w-full h-[25rem] flex justify-center p-10'>
                    <p className='text-red-500'>{category} Category not found.</p>
                </div>
            )}
        </div>
    )
}

export default productCategory