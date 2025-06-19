import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import ProductCard from './productCard';

function AllProducts() {
    const { products, searchQuery } = useAppContext();
    const [filterProducts, setFilterProducts] = useState([]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilterProducts(products.filter(
                product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        } else {
            setFilterProducts(products);
        }
    }, [products, searchQuery])
    return (
        <div className='mt-10 px-10 pt-5'>
            <h2 className='text-4xl text-zinc-700 tracking-tighter px-3 pt-2'>All Products</h2>
            <div className='grid grid-cols-2 sm-grid-cols-1 md:grid-cols-3 lg:grid-cols-5 px-5 gap-4 md:gap-6 mqx-w-25 mt-5'>
                {filterProducts.filter(product => product.inStock).map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    )
}

export default AllProducts