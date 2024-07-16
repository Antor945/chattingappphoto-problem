import React from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import {
    FaFacebookMessenger, FaPhotoVideo,
    FaUserFriends, FaStore, FaNewspaper, FaLayerGroup, FaBusinessTime, FaRegSave, FaGamepad,
    FaUserPlus
} from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const SideBar = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogout = () => {

        signOut(auth).then(() => {
            navigate('/login')
            localStorage.removeItem('userLoginInfo')

        }).catch((error) => {
        });
    };

    return (
        <div className='flex flex-col gap-7  mt-8 md:px-0 px-4'>
            <Link to={'/home'}>
                <div className='flex items-center gap-3 py-5 px-4 group duration-300 hover:bg-primary rounded-2xl shadow-2xl w-full'>
                    < FaNewspaper className=' text-[25px] text-primary group-hover:text-white duration-700' />
                    <h2 className=' text-[18px] font-montserrat font-medium group-hover:text-white'>Feeds</h2>
                </div>
            </Link>

            <Link to={'/friends'}>
                <div className='flex items-center gap-3 py-5 px-4 group duration-300 hover:bg-primary rounded-2xl shadow-2xl'>
                    < FaUserFriends className=' text-[25px] text-primary group-hover:text-white duration-700' />
                    <h2 className=' text-[18px] font-montserrat font-medium group-hover:text-white '>Friends</h2>
                </div>
            </Link>

            <Link to={'/user'}>
                <div className='flex items-center gap-3 py-5 px-4 group duration-300 hover:bg-primary rounded-2xl shadow-2xl'>
                    < FaUserFriends className=' text-[25px] text-primary group-hover:text-white duration-700' />
                    <h2 className=' text-[18px] font-montserrat font-medium group-hover:text-white '>users</h2>
                </div>
            </Link>

            <Link to={'/request'}>
                <div className='flex items-center gap-3 py-5 px-4 group duration-300 hover:bg-primary rounded-2xl shadow-2xl'>
                    < FaUserPlus className=' text-[25px] text-primary group-hover:text-white duration-700' />
                    <h2 className=' text-[18px] font-montserrat font-medium group-hover:text-white '>Friend Request</h2>
                </div>
            </Link>

            <Link to={'/messenger'}>
                <div className='flex items-center gap-3 py-5 px-4 group duration-300 hover:bg-primary rounded-2xl shadow-2xl'>
                    <  FaFacebookMessenger className=' text-[25px] text-primary group-hover:text-white duration-700' />
                    <h2 className=' text-[18px] font-montserrat font-medium group-hover:text-white'>Messenger</h2>
                </div>
            </Link>

            <Link to={'/mygroup'}>
                <div className='flex items-center gap-3 py-5 px-4 group duration-300 hover:bg-primary rounded-2xl shadow-2xl'>
                    < FaLayerGroup className=' text-[25px] text-primary group-hover:text-white duration-700' />
                    <h2 className=' text-[18px] font-montserrat font-medium group-hover:text-white'>My Group</h2>
                </div>
            </Link>

            <Link to={'/grouplist'}>
                <div className='flex items-center gap-3 py-5 px-4 group duration-300 hover:bg-primary rounded-2xl shadow-2xl'>
                    < FaLayerGroup className=' text-[25px] text-primary group-hover:text-white duration-700' />
                    <h2 className=' text-[18px] font-montserrat font-medium group-hover:text-white'>Group List</h2>
                </div>
            </Link>

            <Link to={'/blocklist'}>
                <div className='flex items-center gap-3 py-5 px-4 group duration-300 hover:bg-primary rounded-2xl shadow-2xl'>
                    < ImBlocked className=' text-[25px] text-primary group-hover:text-white duration-700' />
                    <h2 className=' text-[18px] font-montserrat font-medium group-hover:text-white'>Block List</h2>
                </div>
            </Link>

            <div className='flex items-center gap-3 py-5 px-4 group duration-300 hover:bg-primary rounded-2xl shadow-2xl'>
                <  IoSettingsOutline  className=' text-[25px] text-primary group-hover:text-white duration-700' />
                <h2 className=' text-[18px] font-montserrat font-medium group-hover:text-white'>Settings</h2>
            </div>

            <div onClick={handleLogout} className='flex items-center gap-3 py-5 px-4 group duration-300 hover:bg-primary
            rounded-2xl shadow-2xl'>
                <LuLogOut className=' text-[25px] text-primary group-hover:text-white duration-700 ' />
                <h2 className=' text-[18px] font-montserrat font-medium group-hover:text-white'>Logout</h2>
            </div>

        </div>
    )
}

export default SideBar