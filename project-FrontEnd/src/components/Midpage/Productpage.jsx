import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import { Link, useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';

import ProductCard from './productCard';

function Productpage() {
    const { products, navigate, currency, addToCart } = useAppContext();
    const { id } = useParams();

    const product = products.find((item) => item._id === id);
    const [relatedproducts, setRelatedProducts] = useState([])
    const [thumbnail, setThumbnail] = useState(null);

    useEffect(() => {
        if (product) {
            let productsCopy = products.slice()
            productsCopy = productsCopy.filter((item) => product.category == item.category);
            setRelatedProducts(productsCopy.slice(0, 5));
        }
    }, [products])

    useEffect(() => {
        setThumbnail(product?.images[0] ? product.images[0] : null)
    }, [product])

    return product && (
        <div className="max-w-6xl w-full px-15 pt-10">
            <p>
                <Link to={'/user'}>Home</Link> /
                <Link to={'/user/products'}> Products</Link> /
                <Link to={`/user/products/${product.category[0]}`}> {product.category[0]}</Link> /
                <span className="text-indigo-500"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.images.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                            <img key={i} src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" />
                        ))}
                        <p>(4)</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: {currency}{product.price}</p>
                        <p className="text-2xl font-medium">MRP: {currency}{product.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={() => addToCart(product._id)} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button onClick={() => { addToCart(product._id); navigate('/user/cart') }} className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>

            <div className='mt-10'>
                <h2 className='text-4xl text-zinc-700 tracking-tighter px-3 pt-2'>Related Products</h2>
                <div className='grid grid-cols-2 sm-grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-5 gap-4 md:gap-6 mt-5'>
                    {relatedproducts.filter((product) => product.inStock).map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Productpage