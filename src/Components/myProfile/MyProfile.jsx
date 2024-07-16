import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FaCamera, FaTools } from 'react-icons/fa'
import { FaArrowLeftLong, FaPesetaSign } from 'react-icons/fa6'
import { CiCamera } from 'react-icons/ci'
import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileimgPopup from '../../part/profileImgPopup/ProfileImgPopup'
import CoverImgPopup from '../../part/coverImgPopup/CoverImgPopup'
import { ref, onValue } from 'firebase/database';
import { getDatabase } from 'firebase/database'
import About from '../about/About'
import MyPost from '../MyPost/MyPost'
import Post from '../../part/post/Post'


const MyProfile = () => {
  const db = getDatabase();
  const [showUploadProfile, setShowUploadProfile] = useState(false);
  const [showUploadCover, setShowUploadCover] = useState(false);
  const [coverImg, setCoverImg] = useState([]);
  const [useCoverImg, setUseCoverImg] = useState('')
  const data = useSelector(state => state.userLoginInfo.userInfo.user);


  const handleCover = () => {
    setShowUploadCover(true)
  };
  const handleCancel = () => {
    setShowUploadCover(false)
    setShowUploadProfile(false)
  };
  const handleProfile = () => {
    setShowUploadProfile(true)
  };
  const handleCaption = () => {

  }

  useEffect(() => {
    const starCountRef = ref(db, 'coverimg/');
    onValue(starCountRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if (item.val().uploaderId == data.uid) {
          arr.push(item.val());
        }
      });
      setCoverImg(arr)
    })
  }, []);

  useEffect(() => {
    if (coverImg.length > 0) {
      setUseCoverImg(coverImg[coverImg.length - 1].coverimg);
    }
  }, [coverImg]);







  return (
    <section>
      <div className='max-w-container mx-auto md:px-5 px-2 relative'>
        <div>
          <div className='relative'>
            <picture>
              <img className=' w-full md:h-[300px] h-[150px] rounded-lg object-cover' src={useCoverImg} />
            </picture>

            <div onClick={handleCover} className=' bg-white flex gap-3 absolute md:bottom-[20px] md:right-[20px] right-2 bottom-2
             items-center px-3 py-1 shadow-xl rounded-lg'>
              <CiCamera className=' text-[27px]' />
              <h2 className=' font-sans md:text-[22px] font-medium md:block hidden'> cover photo</h2>
            </div>
            <div className=' absolute top-4 left-3'>
              <Link to="/home"><FaArrowLeftLong className=' text-xl' /></Link>
            </div>
          </div>

          {
            showUploadCover
            &&
            <CoverImgPopup handleCaption={handleCaption} handleCancel={handleCancel}
              taitle={' Upload cover picture'} style={'w-[220px] h-[120px]'} />
          }
          <div className=' mt-5 border-b-2 border-black/10 pb-5 flex justify-between items-center relative'>
            <div className=' md:flex md:gap-8 '>
              <div className=' absolute md:static top-[-100px] left-4 border-4 rounded-full'>
                <picture onClick={handleProfile} className=' relative'>
                  <img src={data.photoURL} alt="" className=' md:w-[150px] md:h-[150px] w-[100px] h-[100px] 
                  rounded-full' />
                  <div to='/' className=' p-2 bg-slate-400 inline-block md:text-[22px] text-xl
                     rounded-full absolute md:bottom-0 md:right-0 right-[-110px] bottom-[-100px]' >
                    <FaCamera />
                  </div>
                </picture>
              </div>
              {
                showUploadProfile
                &&
                <ProfileimgPopup handleCaption={handleCaption} handleCancel={handleCancel}
                  taitle={' Upload profile picture'} style={'w-[150px] h-[150px] rounded-full'} />
              }
              <div>
                <h2 className=' md:text-4xl text-xl font-Poppins  font-semibold mt-3 capitalize'>
                  {data.displayName}
                </h2>
                <h3 className=' md:text-2xl text-base font-Poppins font-medium'>
                  Arther
                </h3>
                <div className=' flex gap-3'>
                  <h2 className=' md:text-xl text-base font-Poppins font-semibold'>
                    2.2K followers
                  </h2>
                  <h2 className='md:text-xl text-base font-Poppins font-semibold'> 2.2K following</h2>
                </div>
              </div>
            </div>
            <div>
              <div className=' md:flex gap-3 items-center md:block hidden'>
                <div className=' flex items-center gap-3 bg-blue-700 px-2 py-1 rounded-lg'>
                  <FaPesetaSign />
                  <h2 className=' text-xl font-Poppins text-white font-medium'>Edit</h2>
                </div>
                <div className='flex items-center gap-3 bg-slate-400 px-4 py-1 rounded-lg'>
                  <FaTools />
                  <h2 className='text-xl font-Poppins text-white font-medium'> view tools</h2>
                </div>
              </div>
            </div>
          </div>
          <div className=' flex justify-between items-center'>
            <ul className=' flex flex-wrap md:gap-10 p-2'>
              <li className=' text-base font-Poppins font-medium px-2 py-1 hover:bg-slate-300 text-[#000]
             rounded-[4px]  duration-500'>Posts</li>
              <li className=' text-base font-Poppins font-medium px-2 py-1 hover:bg-slate-300 text-[#000]
             rounded-[4px]  duration-500'>About</li>
              <li className=' text-base font-Poppins font-medium px-2 py-1 hover:bg-slate-300 text-[#000]
             rounded-[4px]  duration-500'>Reels</li>
              <li className=' text-base font-Poppins font-medium px-2 py-1 hover:bg-slate-300 text-[#000]
             rounded-[4px]  duration-500'>Group</li>
            </ul>
            <div className=' px-3 py-2 rounded-md bg-slate-300 md:block hidden'>
              <BsThreeDots className=' text-[25px]  ' />
            </div>
          </div>

        </div>
        <div className=' md:flex gap-5'>
          <div className=' md:w-5/12'>
            <About />
          </div>
          <div className=' md:w-7/12'>
            <Post />
            <MyPost />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyProfile