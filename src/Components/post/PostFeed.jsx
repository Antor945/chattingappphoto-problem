import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegComment, FaRegCommentDots } from 'react-icons/fa'
import { IoIosShareAlt } from 'react-icons/io'
import { MdPublic } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import post from '../../assets/post.jpg'
import Post from '../../part/post/Post'
import { ref, onValue, set, push, remove } from 'firebase/database';
import { getDatabase } from 'firebase/database'
import moment from 'moment'
import ModalImage from 'react-modal-image'
import { useSelector } from 'react-redux'
import { AiFillLike } from 'react-icons/ai'

const PostFeed = () => {
    const db = getDatabase();
    const [publicPost, setPublicPost] = useState([]);
    const [like, setLike] = useState([])
    const data = useSelector(state => state.userLoginInfo.userInfo.user);

    useEffect(() => {
        const starCountRef = ref(db, 'publicPost/');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), id: item.key });
            });
            setPublicPost(arr)
        })
    }, [db]);

    const handleLike = (item) => {
        set(push(ref(db, 'like/')), {
            likerName: data.displayName,
            likerId: data.uid,
            likeByName: item.uploaderId,
            likeById: item.uploaderName,
            postId: item.id
        });
    };

    const handleUndoLike = (likeId) => {
        remove(ref(db, 'like/' + likeId))
    }



    useEffect(() => {
        const starCountRef = ref(db, 'like/');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (item.val().likerId == data.uid) {
                    arr.push({ ...item.val(), id: item.key })
                }
            });
            setLike(arr);
        })
    }, [db, data.uid]);

    

    const isPostLiked = (postId) => {
        return like.find(item => item.postId === postId);
    }

    return (
        <div className='md:px-4 md:mt-6'>
            <Post />
            <div>
                {
                    publicPost.map((item) => {
                        const liked = isPostLiked(item.id);
                        return (
                            <div key={item.id}>
                                <div className=' flex  items-center justify-between mt-5'>
                                    <div className=' flex gap-4'>
                                        <picture>
                                            <ModalImage
                                                className=' w-[50px] h-[50px] rounded-full object-cover'
                                                small={post}
                                                large={post}
                                            />
                                        </picture>
                                        <div>
                                            <h2 className=' text-[15px] font-semibold mt-2 font-Poppins'>
                                                {item.uploaderName}
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
                                        <h2 className=' mt-2 text-base font-Poppins font-semibold'>{item.caption}</h2>
                                    </div>
                                    <div>
                                        <picture>
                                            <ModalImage className=' h-[330px] w-full object-cover'
                                                small={item.img}
                                                large={item.img}
                                            />
                                        </picture>
                                        <div className=' flex justify-between'>
                                            <div className=' flex gap-2'>
                                                {
                                                    liked
                                                        ? <AiFillLike onClick={() => handleUndoLike(liked.id)} className=' text-[22px] text-[#397eff]' />
                                                        : <AiFillLike onClick={() => handleLike(item)} className=' text-[22px]' />
                                                }
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
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PostFeed;
