import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { CircleUser } from 'lucide-react';
import AppLogo from '../../assets/LogoName1.png'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
function UserLogdinNavbar() {
    const [open, setOpen] = React.useState(false)
    const {setUser,navigate,searchQuery,setSearchQuery,getCartTotalAmt,getCartCount,axios}=useAppContext();
    const logout=async ()=>{
        try {
            const {data}=await axios.get('/api/user/logout');
            if(data.success){
                setUser(null);
                navigate('/');
                toast.success(data.message);
            }else{
                toast.success(data.message);
            }
        } catch (error) {
            toast.success(error.message);
        }
    }
    useEffect(()=>{
        if(searchQuery.length > 0){
            navigate('/user/products');
        }
    },[searchQuery])
    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <a onClick={()=>{
                navigate('/user');
                scrollTo(0,0);
            }} className='cursor-pointer'>
                <img className="h-9" src={AppLogo} alt="dummyLogoColored" />
            </a>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <a onClick={()=>navigate('/user/products')} className='cursor-pointer text-sm text-zinc-700'>All Products</a>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e)=> setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                        <path clip-rule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

                <Link to='/user/cart'>
                    <div className="relative cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#615fff" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        {getCartCount() > 0 &&
                        (<button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">{getCartCount()}</button>)
                        }
                    </div>
                </Link>
                <div className="relative group cursor-pointer">
                    <CircleUser className="text-4xl text-indigo-900 font-bold" />
                    <ul className="hidden group-hover:block absolute top-6 right-0 bg-white shadow-md border border-gray-200 w-40 rounded-md z-40 text-sm">
                        <Link to='/user/profile'><li className="px-4 py-2 hover:bg-zinc-200 cursor-pointer">Profile</li></Link>
                        <hr className='text-zinc-200' />
                        <Link to='/user/order'><li className="px-4 py-2 hover:bg-zinc-200 cursor-pointer">My Orders</li></Link>
                        <hr className='text-zinc-200' />
                        <li onClick={logout} className="px-4 py-2 text-red-400 hover:bg-zinc-200 cursor-pointer">Logout</li>
                    </ul>
                </div>
            </div>
            <div className='flex flex-row items center sm:hidden gap-8'>
                <Link to='/user/cart'>
                    <div className="relative cursor-pointer">
                        <svg width="22" height="22" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#615fff" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        {getCartCount() > 0 &&
                        (<button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">{getCartCount()}</button>)
                        }
                    </div>
                </Link>
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu">
                    {/* Menu Icon SVG */}
                    <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="21" height="1.5" rx=".75" fill="#426287" />
                        <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
                        <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <ul className="z-50 w-full bg-white">
                    <Link to='/user/profile'><li className="px-4 py-2 hover:bg-zinc-200 cursor-pointer">Profile</li></Link>
                    <hr className='text-zinc-200' />
                    <Link to='/user/order'><li className="px-4 py-2 hover:bg-zinc-200 cursor-pointer">My Orders</li></Link>
                    <hr className='text-zinc-200' />
                    <li onClick={logout} className="px-4 py-2 text-red-400 hover:bg-zinc-200 cursor-pointer">Logout</li>
                </ul>
            </div>

        </nav>
    )
}

export default UserLogdinNavbar