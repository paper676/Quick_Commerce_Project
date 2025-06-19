import React, { useEffect } from 'react'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

function sellerLogin() {
    const [sellerId, setSellerId] = React.useState("");
    const [password, setPassword] = React.useState("");
    const {isSeller,setIsSeller,navigate,axios}=useAppContext();
    
    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            const {data}=await axios.post('/api/seller/login',{sellerId,password});
            if(data.success){
                setIsSeller(true);
                navigate('/seller');
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        if(isSeller){
            navigate('/seller')
        }
    },[isSeller])

    return !isSeller && (
        <div className='w-full p-20 flex justify-center align-center'>
            <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
                <p className="text-2xl font-medium m-auto">
                    <span className="text-indigo-500">Seller login</span>
                </p>
                <div className="w-full">
                    <p>Seller Id</p>
                    <input onChange={(e) => setSellerId(e.target.value)} value={sellerId} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required />
                </div>
                <button className="mt-5 bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                    Login
                </button>
            </form>
        </div>
    );
}

export default sellerLogin