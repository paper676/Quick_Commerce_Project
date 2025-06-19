import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { useLocation } from 'react-router-dom';

function Loading() {
    const {navigate}=useAppContext();
    let {search}=useLocation();
    const query=new URLSearchParams(search)
    const nexturl=query.get('next');
    useEffect(()=>{
        if(nexturl){
            setTimeout(()=>{
                navigate(`/user/${nexturl}`)
            },5000)
        }
    },[nexturl])
  return (
    <div className='flex justify-center items-center h-[30rem]'>
        <div className='animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-green-500'></div>
    </div>
  )
}

export default Loading