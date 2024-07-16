import React, { useState } from 'react'
import { IoMdHome } from "react-icons/io";
import { FaUserFriends, FaUserPlus, FaFacebookMessenger } from "react-icons/fa";
import { IoNotifications, IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

const Navbar = ({ sidebarClick }) => {

    const [activeIcon, setActiveIcon] = useState('');

    const handleIconClick = (iconName) => {
        setActiveIcon(iconName);
    }

    return (
        <nav className=' w-full py-3 bg-[#37f8c5] fixed z-10'>
            <ul className=' flex md:justify-center md:gap-16 justify-around'>
                <li className=' relative group'>
                    <Link onClick={() => handleIconClick('home')} to={'/home'}>
                        <IoMdHome className=' text-primary text-[30px]' />
                        <div className={`h-1 ${activeIcon == 'home' ? "w-full" : "w-[0px]"}  bg-primary  duration-500 rounded-md bottom-0`}>
                        </div>
                    </Link>
                </li>
                <li className=' relative group'>
                    <Link onClick={() => handleIconClick('profile')} to={'/myprofile'}>
                        <CgProfile className=' text-primary text-[30px]' />
                        <div className={`h-1 ${activeIcon == 'profile' ? "w-full" : "w-[0px]"}  bg-primary  duration-500 rounded-md bottom-0`}>
                        </div>
                    </Link>
                </li>
                <li className='group relative'>
                    <Link onClick={() => handleIconClick('friend')} to={'/friends'}>
                        <FaUserFriends className=' text-primary text-[30px]' />
                        <div className={`h-1 ${activeIcon == 'friend' ? "w-full" : "w-[0px]"}  bg-primary  duration-500 rounded-md bottom-0`}>
                        </div>
                    </Link>
                </li>
                <li className='group relative  md:block hidden'>
                    <Link onClick={() => handleIconClick('friendrequest')} to={'/request'}>
                        <FaUserPlus className=' text-primary text-[30px]' />
                        <div className={`h-1 ${activeIcon == 'friendrequest' ? "w-full" : "w-[0px]"}  bg-primary  duration-500 rounded-md bottom-0`}>
                        </div>
                    </Link>
                </li>
                <li className='group relative md:block hidden'>
                    <IoNotifications onClick={() => handleIconClick('Notifications')} className=' text-primary text-[30px]' />
                    <div className={`h-1 ${activeIcon == 'Notifications' ? "w-full" : "w-[0px]"}  bg-primary  duration-500 rounded-md bottom-0`}>
                    </div>
                </li>
                <li className='group relative'>
                    <Link onClick={() => handleIconClick('Messenger')} to={'./messenger'}>
                        <FaFacebookMessenger className=' text-primary text-[30px]' />
                        <div className={`h-1 ${activeIcon == 'Messenger' ? "w-full" : "w-[0px]"}  bg-primary  duration-500 rounded-md bottom-0`}>
                        </div>
                    </Link>
                </li>
                <li onClick={() => handleIconClick('Settings')} className='group relative'>
                    <IoSettingsOutline onClick={sidebarClick} className=' text-primary text-[30px]' />

                    
                    <div className={`h-1 ${activeIcon == 'Settings' ? " w-[0px]" : "w-full rotate-[360deg]"}  bg-primary  duration-500 rounded-md bottom-0`}>
                    </div>
                </li>
            </ul>

        </nav>
    )
}

export default Navbar