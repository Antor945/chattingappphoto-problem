import React, { useEffect, useState } from 'react'
import Navbar from '../../part/navBar/Navbar';
import User from '../user/User';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SideBar from '../sideBar/SideBar';


const Home = () => {
  const auth = getAuth();
  const [verify, setVerify] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false)
  const nevigate = useNavigate()
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) {
      nevigate('/login');
    }
  }, []);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user.emailVerified) {
        setVerify(true);
      }
    });
  }, []);

  const sidebarClick = () => {
    setShowSideBar(!showSideBar);
    console.log(showSideBar);
  }
  const falseClick = () => {
    setShowSideBar(false);
  };

  // const active = () => {

  // }

  return (
    <>
      {
        verify ?
          <section>
            <div> <Navbar sidebarClick={sidebarClick} /></div >
            <div className=' max-w-container mx-auto'>
              <div className=' flex justify-between gap-4 relative'>
                <div className='md:w-4/12 mt-16 md:block hidden'>
                  <User />
                </div>
                <div className='md:w-5/12 w-full mt-16'>
                  <Outlet />
                </div>
                <div onClick={falseClick} className={`md:w-3/12 mt-16 md:block md:static absolute bg-white w-full
                 duration-500 
                ${showSideBar ? "left-0" : "left-[-500px]"} `}>
                  <SideBar />
                </div>
              </div>
            </div>
          </section >
          :
          <div className=' bg-primary h-screen flex justify-center items-center'>
            <div className=' text-center'>
              <h1 className=' text-2xl font-Poppins font-medium text-white mb-5'>Please verify Your Email</h1>
              <Link to={'/login'}>
                <button className='outline-none bg-white text-primary font-Poppins font-medium
                 py-2 px-10 border-2 rounded-md hover:bg-transparent duration-300 hover:text-white'>
                  Back To Login
                </button>
              </Link>
            </div>
          </div>

      }
    </>
  )
}

export default Home