import React from 'react'
import { FaHome, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { GiSelfLove } from "react-icons/gi";


const About = () => {
    return (
        <div className=' bg-white border-2 0 shadow-2xl p-5 rounded-2xl '>
            <div>
                <h2 className='text-xl font-sans text-black font-medium'>
                    Intro
                </h2>
                <p className=' text-[15px] font-sans text-black font-medium text-center'>
                    I’m nobody’s second option. Better you either CHOOSE me, or you lose me.
                </p>
                <button className='text-[18px] font-sans text-black font-medium bg-slate-100 w-full 
             text-center py-1 px-3 mt-3 rounded-lg hover:bg-slate-300 duration-500'>
                    Edit Bio
                </button>
            </div>
            <div className=' mt-6'>
                <div className=' flex items-center gap-4'>
                    <h2 className=' px-3 text-[20px] bg-slate-500 rounded-full inline-block text-white '>!</h2>
                    <h2><span className=' font-semibold font-sans'>profile</span> digital creator </h2>
                </div>
                <div className=' flex items-center gap-4 mt-2'>
                    <FaHome className=' text-[25px] text-slate-500' />
                    <h2> lives in <span className=' font-semibold font-sans'>Dhaka Banglasesh</span></h2>
                </div>
                <div className=' flex items-center gap-4 mt-2'>
                    <IoLocationOutline className=' text-[25px] text-slate-500' />
                    <h2> From <span className=' font-semibold font-sans'>Hatia Banglasesh</span></h2>
                </div>
                <div className=' flex items-center gap-4 mt-2'>
                    <GiSelfLove className=' text-[25px] text-slate-500' />
                    <h2 span className=' font-semibold font-sans'> Single</h2>
                </div>
                <div className=' flex items-center gap-4 mt-2'>
                    <FaInstagram className=' text-[25px] text-slate-500' />
                    <span className=' font-semibold font-sans'>Mdantor38</span>
                </div>
                <div className=' flex items-center gap-4 mt-2'>
                    <FaYoutube className=' text-[25px] text-slate-500' />
                    <span className=' font-semibold font-sans'> MD Antor Khan </span>
                </div>
                <div className=' flex items-center gap-4 mt-2'>
                    <FaTwitter className=' text-[25px] text-slate-500' />
                    <span className=' font-semibold font-sans'> Twitter  </span>
                </div>
            </div>
        </div>
    )
}

export default About