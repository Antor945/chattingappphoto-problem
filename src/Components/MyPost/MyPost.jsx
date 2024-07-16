import React, { useEffect, useState } from 'react'
import { AiFillLike } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegComment, FaRegCommentDots } from 'react-icons/fa'
import { IoIosShareAlt } from 'react-icons/io'
import { MdPublic } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import post from '../../assets/post.jpg'
import Post from '../../part/post/Post'
import { ref, onValue } from 'firebase/database';
import { getDatabase } from 'firebase/database'
import moment from 'moment'
import { data } from 'autoprefixer'
import { useSelector } from 'react-redux'
import ModalImage from 'react-modal-image'


const MyPost = () => {

    const db = getDatabase();
    const [publicPost, setPublicPost] = useState([]);
    const data = useSelector(state => state.userLoginInfo.userInfo.user);

    useEffect(() => {
        const starCountRef = ref(db, 'publicPost/');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (item.val().uploaderId == data.uid) {
                    arr.push(item.val());
                }
            });
            setPublicPost(arr)
        })
    }, []);

    const handleLike = (item) => {
        console.log(item);
    }


    return (
        <div>
            {
                publicPost.map((item) => (
                    <div>
                        <div className=' flex  items-center justify-between mt-5'>
                            <div className=' flex gap-4'>
                                <picture>
                                    <img src={post} alt="" className=' w-[50px] h-[50px] rounded-full' />
                                </picture>
                                <div>
                                    <h2 className=' text-[15px] font-Poppins  font-semibold mt-2 capitalize'>
                                        {
                                            item.uploaderName
                                        }
                                    </h2>
                                    <div className=' flex gap-3 items-center'>
                                        <h2> {moment(item.date).fromNow()}</h2>
                                        <MdPublic />
                                    </div>

                                </div>
                            </div>
                            <div className=' flex gap-8'>
                                <BsThreeDots className=' text-[25px] ' />
                                <RxCross2 className=' text-[25px] ' />
                            </div>
                        </div>
                        <div>
                            <div>
                                <h2 className=' mt-2 text-base font-Poppins font-medium'>{item.caption}</h2>
                            </div>
                            <div>
                                <picture>
                                    <ModalImage className=' h-[330px] w-full rounded-xl object-cover'
                                        small={item.img}
                                        large={item.img}
                                    />
                                </picture>
                                <div className=' flex justify-between'>
                                    <div className=' flex gap-2'>
                                        <AiFillLike onClick={() => handleLike(item)} className=' text-[22px]' />
                                        <h2 className=' text-[15px] font-sans font-semibold'>Like</h2>
                                    </div>
                                    <div className=' flex gap-2'>
                                        <FaRegComment className=' text-[22px]' />
                                        <h2 className=' text-[15px] font-sans font-semibold'>Comment</h2>
                                    </div>
                                    <div className=' flex gap-2'>
                                        <FaRegCommentDots className=' text-[22px]' />
                                        <h2 className=' text-[15px] font-sans font-semibold'>Send</h2>
                                    </div>
                                    <div className=' flex gap-2'>
                                        <IoIosShareAlt className=' text-[22px]' />
                                        <h2 className=' text-[15px] font-sans font-semibold'>Share</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default MyPost