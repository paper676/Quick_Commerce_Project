import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';
const InputField = ({ type, placeholder, name, handleChange, address }) => (
    <input className='w-full px-2 py-3 border border-gray-200 rounded outline-none
    text-gray-500 focus:border-blue-400 transition'
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        value={address[name]}
        required
    />
)
function AddNewAddress() {
    const { axios,navigate,user } = useAppContext();
    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        country: '',
        zipcode: '',
        phone: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }))
    }

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post('/api/address/add', {address});
            if (data.success) {
                toast.success(data.message);
                navigate('/user/cart');
            } else {
                toast.success(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(()=>{
        if(!user){
            navigate('/user/cart');
        }
    },[])
    return (
        <div className='mt-10 pb-10 px-10 lg:px-20'>
            <h1 className='sm:text-xl md:text-2xl  lg:text-3xl text-zinc-600 tracking-tighter px-3 pt-2'>Add <span className='text-zinc-900'>Shipping Address</span></h1>
            <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
                <div className='flex-1 max-w-md'>
                    <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
                        <div className='grid grid-cols-2 gap-3'>
                            <InputField handleChange={handleChange} address={address} type="text" name="firstName" placeholder="First Name" />
                            <InputField handleChange={handleChange} address={address} type="text" name="lastName" placeholder="Last Name" />
                        </div>
                        <InputField handleChange={handleChange} address={address} type="email" name="email" placeholder="Email" />
                        <InputField handleChange={handleChange} address={address} type="text" name="street" placeholder="Street Name" />
                        <div className='grid grid-cols-2 gap-3'>
                            <InputField handleChange={handleChange} address={address} type="text" name="city" placeholder="City Name" />
                            <InputField handleChange={handleChange} address={address} type="text" name="state" placeholder="City Name" />
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            <InputField handleChange={handleChange} address={address} type="number" name="zipcode" placeholder="Pincode" />
                            <InputField handleChange={handleChange} address={address} type="text" name="country" placeholder="Country" />
                        </div>
                        <InputField handleChange={handleChange} address={address} type="text" name="phone" placeholder="Phone" />
                        <button className='w-full bg-green-600/80 text-white mt-5 py-3  hover:bg-green-600/70 transition cursor-pointer uppercase'>Save Address</button>
                    </form>
                </div>
                <img src={assets.add_address_iamge} alt="add_address_iamge" />
            </div>
        </div>
    )
}

export default AddNewAddress