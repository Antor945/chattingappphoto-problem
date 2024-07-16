import React, { useState } from 'react'
import { FaImages } from 'react-icons/fa'
import { useSelector } from 'react-redux';

import PublicPostPopup from '../../part/publicPostPopup/PublicpostPopup'

const Post = () => {

    const [showPost, setShowPost] = useState(false);
    const data = useSelector(state => state.userLoginInfo.userInfo.user)

    const postClick = () => {
        setShowPost(true)
    };
    const handleCancel = () => {
        setShowPost(false)
    }

   

    return (
        <section className=''>
            <div className=' flex justify-between items-center'>
                <div>
                    <picture>
                        <img src={data.photoURL} alt="" className=' w-[50px] h-[50px] rounded-full' />
                    </picture>
                </div>
                <div onClick={postClick}>
                    <input type="text" className=' md:w-[300px] bg-slate-200 px-5 py-2 rounded-2xl outline-none
                      ' />
                </div>
                <div>
                    <FaImages className=' text-[28px] text-blue-500' />
                </div>
            </div>
            <div className=' '>
                {
                    showPost &&
                    <PublicPostPopup handleCancel={handleCancel} taitle={"Create Post"}
                        style={"h-[100px] w-[200px]"} />
                }
            </div>
        </section>
    )
}

export default Post