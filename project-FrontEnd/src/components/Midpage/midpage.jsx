import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

function midpage() {
    const {navigate}=useAppContext();
    return (
        <div className='mx-20 my-10'>
            <div className='bg-blue-300 h-100 w-full rounded-md pt-45 px-10'>
                <h1 className='sm:text-2xl md:text-3xl lg:text-5xl text-zinc-700 font-semibold tracking-tighter px-2'>All your Grocery At One Place,</h1>
                <h3 className='sm:text-xl md:text-2xl lg:lext-4xl text-zinc-700 font-light tracking-tighter px-2 pt-2'>Also get very quick</h3>
                <div className='pt-4'>
                    <Link to='/login'>
                        <button type="button" aria-label="getStarted" class="bg-indigo-800 hover:bg-indigo-900 px-7 py-2.5 text-white rounded-md active:scale-95 transition-all">
                            Get started
                        </button>
                    </Link>
                </div>
            </div>
            <div className='h-50 w-full flex justify-center items-center pt-20'>
                <div class="flex items-center divide-x divide-gray-300">
                    <div class="flex -space-x-3 pr-3">
                        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="image" class="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-1" />
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="image" class="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-[2]" />
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop" alt="image" class="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-[3]" />
                        <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="image" class="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-[4]" />
                    </div>
                    <div class="sm:pl-1 md:pl-3 ">
                        <div class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                            </svg>
                            <p class="text-gray-600 font-medium ml-2">5.0</p>
                        </div>
                        <p class="text-sm text-gray-500">Trusted by <span class="font-medium text-gray-800">100,000+</span> users</p>
                    </div>
                </div>
            </div>
            <div class="mt-20 w-full mx-2 md:mx-auto p-px rounded-2xl bg-gradient-to-r from-purple-600/20 to-blue-500/30">
                <div class="flex flex-col items-center justify-center text-center py-12 md:py-16 rounded-[15px] bg-gradient-to-r from-[#F3EAFF] to-[#E1EFFF]">
                    <div class="flex items-center justify-center bg-white px-3 py-1.5 shadow gap-1 rounded-full text-xs">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.503 10.06a3.3 3.3 0 0 0-.88 1.809 4.7 4.7 0 0 0-.067 1.03v.545h.75q.416-.002.825-.075a3.24 3.24 0 0 0 1.81-.882 1.65 1.65 0 0 0-.131-2.325 1.65 1.65 0 0 0-2.307-.103m1.632 1.621a2.1 2.1 0 0 1-1.182.563h-.206v-.207a2.1 2.1 0 0 1 .563-1.18.34.34 0 0 1 .225-.076.63.63 0 0 1 .44.206.506.506 0 0 1 .16.694m9.6-9.581a.853.853 0 0 0-.835-.835A8.2 8.2 0 0 0 6.816 3.28L5.288 5.062l-2.25-.468a.94.94 0 0 0-.863.253l-.637.637a.94.94 0 0 0-.263.76.94.94 0 0 0 .422.693l1.931 1.238.122.075 3 3.047.075.075 1.238 1.931a.94.94 0 0 0 .693.422h.104a.94.94 0 0 0 .656-.272l.637-.637a.94.94 0 0 0 .253-.863l-.468-2.24 1.725-1.482A8.24 8.24 0 0 0 13.735 2.1M2.915 5.765l1.238.263-.6.703-.937-.628zm5.982 6.657-.628-.938.703-.6.263 1.238zm1.978-5.053-3.45 2.943-2.737-2.737 2.943-3.45a6.98 6.98 0 0 1 4.932-1.688 7 7 0 0 1-1.688 4.932" fill="#5C67FF" />
                            <path d="M10.434 6.216a1.116 1.116 0 0 0-.056-1.594 1.086 1.086 0 0 0-1.918.742 1.1 1.1 0 0 0 .38.786 1.125 1.125 0 0 0 1.594.066" fill="#5C67FF" />
                        </svg>
                        <span class="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent font-medium">Trusted by Many</span>
                    </div>
                    <h2 class="text-2xl md:text-4xl font-medium mt-2">
                            Sell Your Products with <br/>
                            <span class="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Quick Commerce </span>
                            & Grow Profits!
                    </h2>
                    {/* <p class="text-slate-500 mt-2 max-w-lg max-md:text-sm">Achieve your goals faster with personalized strategies, hands-on support, and results that speak for themselves.</p> */}
                    <button onClick={()=>navigate('/seller')} type="button" class="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm px-5 py-2.5 rounded-xl font-medium mt-4 hover:scale-105 active:scale-95 transition-all duration-300">
                        Login As Seller
                    </button>
                </div>
            </div>
        </div>
    )
}
export default midpage
