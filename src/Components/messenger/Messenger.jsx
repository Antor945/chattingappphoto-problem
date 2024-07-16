import { getDatabase, onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { FaFacebookMessenger, FaSearch, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { activeMsg } from '../../slices/messageSlice'
import { useNavigate } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const Messenger = () => {

    const db = getDatabase();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [friend, setFriend] = useState([]);
    const data = useSelector(state => state.userLoginInfo.userInfo.user);


    useEffect(() => {
        const starCountRef = ref(db, 'friends/');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (item.val().reciverid == data.uid || item.val().senderid == data.uid) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setFriend(arr)
        })
    }, []);


    const handleMsg = (item) => {
        if (item.reciverid == data.uid) {
            dispatch(activeMsg({ id: item.senderid, name: item.sendername }))
            localStorage.setItem('activeMsg', JSON.stringify({ id: item.senderid, name: item.sendername }));
            setTimeout(() => {
                navigate('/message')
            }, 200);
        } else {
            dispatch(activeMsg({ id: item.reciverid, name: item.recivername }))
            localStorage.setItem('activeMsg', JSON.stringify({ id: item.reciverid, name: item.recivername }));
            setTimeout(() => {
                navigate('/message')
            }, 200);
        }
    }

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3
    };

    const pic = 'https://wallpapers.com/images/high/cool-profile-pictures-panda-man-gsl2ntkjj3hrk84s.webp'

    return (
        <section className=' w-full px-4'>
            <div className='  relative'>
                <input type="search" className='w-full outline-none px-3 border-blue-50 border-2 
                              py-1 rounded-md' placeholder='search Friends' />
                <FaSearch className=' text-[23px] text-primary absolute top-2 right-7' />
            </div>
            <div className='mb-4'>
                <div className="slider-container">
                    <Slider {...settings}>
                        <div className=' p-3'>
                            <picture>
                                <img className='w-[50px] h-[50px] rounded-full' src={pic} alt="" />
                            </picture>
                        </div>
                        <div className=' p-3'>
                            <picture>
                                <img className='w-[50px] h-[50px] rounded-full' src={pic} alt="" />
                            </picture>
                        </div>
                        <div className=' p-3'>
                            <picture>
                                <img className='w-[50px] h-[50px] rounded-full' src={pic} alt="" />
                            </picture>
                        </div>
                        <div className=' p-3'>
                            <picture>
                                <img className='w-[50px] h-[50px] rounded-full' src={pic} alt="" />
                            </picture>
                        </div>
                        <div className=' p-3'>
                            <picture>
                                <img className='w-[50px] h-[50px] rounded-full' src={pic} alt="" />
                            </picture>
                        </div>
                        <div className=' p-3'>
                            <picture>
                                <img className='w-[50px] h-[50px] rounded-full' src={pic} alt="" />
                            </picture>
                        </div>
                        <div className=' p-3'>
                            <picture>
                                <img className='w-[50px] h-[50px] rounded-full' src={pic} alt="" />
                            </picture>
                        </div>
                        <div className=' p-3'>
                            <picture>
                                <img className='w-[50px] h-[50px] rounded-full' src={pic} alt="" />
                            </picture>
                        </div>
                    </Slider>
                </div>
            </div>
            {
                friend.map((item) => (
                    <div onClick={() => handleMsg(item)} className='px-3 '>
                        <div className='flex justify-between items-center'>
                            <div className=' flex items-center'>
                                <div className='w-[70px] h-[70px] rounded-full'>
                                    <picture>
                                        <img className=' rounded-full' src={data.photoURL} alt="" />
                                    </picture>
                                </div>
                                <div>
                                    <h2 className=' font-Poppins text-[#000] font-semibold'>
                                        {
                                            item.reciverid == data.uid ? item.sendername : item.recivername
                                        }
                                    </h2>
                                    <h2 className='text-halka'>Hi Guys, Wassup!</h2>
                                </div>
                            </div>
                            <div className=' flex gap-3 items-center'>
                                <  FaFacebookMessenger
                                    className=' text-[25px] text-primary group-hover:text-white duration-700' />
                            </div>
                        </div>
                        <div className='h-[1px] bg-slate-400 mt-2'>

                        </div>
                    </div>
                ))
            }


        </section>
    )
}

export default Messenger