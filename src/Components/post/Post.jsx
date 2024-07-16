import React from 'react'
import { AiFillLike } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegComment, FaRegCommentDots } from 'react-icons/fa'
import { IoIosShareAlt } from 'react-icons/io'
import { MdPublic } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import post from '../../assets/post.jpg'

const Post = () => {
    return (
        <div className='px-4 '>
            <div className=' flex  items-center justify-between mt-5'>
                <div className=' flex gap-4'>
                    <picture>
                        <img src={post} alt="" className=' w-[50px] h-[50px] rounded-full' />
                    </picture>
                    <div>
                        <h2 className=' text-[15px] font-semibold font-mono mt-2'>
                            md antor khan</h2>
                        <div className=' flex gap-3 items-center'>
                            <h2>46m </h2>
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
                    <h2 className=' mt-2 text-base font-sans font-semibold'>ersgearfgyhaufoih</h2>
                </div>
                <div>
                    <picture>
                        <img src={post} alt="" className=' h-[330px] w-full' />
                    </picture>
                    <div className=' flex justify-between'>
                        <div className=' flex gap-2'>
                            <AiFillLike className=' text-[22px]' />
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
}

export default Post