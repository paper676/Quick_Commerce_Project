import React from 'react'
import AppLogo from '../../assets/LogoName1.png'
import { assets } from '../../assets/assets';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
function SellerHome() {
    const {navigate,axios}=useAppContext();
    const sidebarLinks = [
        { name: "Add Products", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/productslist", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    const logout= async ()=>{
        try {
            const {data}=await axios.post('/api/seller/logout');
            if(data.success){
                toast.success(data.message);
                navigate('/');
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
                <Link to='/ '>
                    <img className="h-9" src={AppLogo} alt="dummyLogoColored" />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button onClick={logout} className='border rounded-full text-sm px-4 py-1 cursor-pointer'>Logout</button>
                </div>
            </div>
            <div className='flex'>
                <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col">
                    {sidebarLinks.map((item) => (
                        <NavLink to={item.path} key={item.name} end={item.path === '/seller'}
                            className={({isActive})=>`flex items-center py-3 px-4 gap-3 
                                ${isActive ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                                    : "hover:bg-gray-100/90 border-white text-gray-700"
                                }`
                            }
                        >
                            <img src={item.icon} alt="" className='w-5 h-5'/>
                            <p className="md:block hidden text-center font-medium">{item.name}</p>
                        </NavLink>
                    ))}
                </div> 
                <Outlet/>
            </div>
            
        </>
    );
}

export default SellerHome