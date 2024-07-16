import React, { useEffect, useRef, useState } from 'react'
import { BsSendFill, BsThreeDotsVertical } from "react-icons/bs";
import { IoTriangle } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import moment from 'moment';
import ModalImage from "react-modal-image";
import { getDownloadURL, getStorage, ref as sref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import EmojiPicker from 'emoji-picker-react';


const Message = () => {
    const storage = getStorage();
    const db = getDatabase();
    const lastMsg = useRef(null);
    const [msg, setMsg] = useState('')
    const [sendMsg, setSendMsg] = useState([])
    const data = useSelector(state => state.userLoginInfo.userInfo.user);
    const msgData = useSelector(state => state.messageInfo.active);
    const [showEmoji, setShowEmoji] = useState(false)

    const handleMessage = (e) => {
        setMsg(e.target.value);
    };

    const handleSentMsg = () => {
        set(push(ref(db, 'message/')), {
            whoSendId: data.uid,
            whoSendName: data.displayName,
            whoReciverId: msgData.id,
            whoReciverName: msgData.name,
            msg: msg,
            date: new Date().toISOString()
        }).then(() => {
            setMsg('')
        })
    };



    useEffect(() => {
        const starCountRef = ref(db, 'message/');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if ((item.val().whoSendId == data.uid && item.val().whoReciverId == msgData.id)
                    || (item.val().whoReciverId == data.uid && item.val().whoSendId == msgData.id)) {
                    arr.push(item.val());
                }

            });
            setSendMsg(arr)
        })
    }, []);

    const handleImg = (e) => {
        const file = e.target.files[0];
        const storageRef = sref(storage, uuidv4());
        uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(storageRef).then((downloadURL) => {
                set(push(ref(db, 'message/')), {
                    whoSendId: data.uid,
                    whoSendName: data.displayName,
                    whoReciverId: msgData.id,
                    whoReciverName: msgData.name,
                    image: downloadURL,
                    date: new Date().toISOString()
                })
            });
        });
    };

    const handleShowEmoji = () => {
        setShowEmoji(!showEmoji)
    };

    const handleEmoji = (item) => {
        setMsg(msg + item.emoji)
    };

    useEffect(() => {
        if (lastMsg.current) {
            lastMsg.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [msg])


    useEffect(() => {
        const detectKeyDown = (e) => {
            if (e.key === 'Enter') {
                handleSentMsg();
            }
        };

        document.addEventListener('keydown', detectKeyDown);

    }, []);


    return (
        <div className='overflow-x-hidden border-2 rounded-xl relative'>
            <div>
                <div className='flex  items-center justify-between border-b-2 
                     z-10 bg-white  pt-6 '>
                    <Link to={'/messenger'} className=' absolute top-2 left-4 z-20 text-xl'>
                        <FaArrowLeft />
                    </Link>
                    <div className='flex items-center gap-3 py-4 px-3'>
                        <div className=' flex gap-3'>
                            <picture>
                                <img className='w-[70px] h-[70px] rounded-full' src={data.photoURL} alt="" />
                            </picture>
                        </div>
                        <div>
                            <h2 className=' font-Poppins text-[#000] font-semibold'>{msgData.name}</h2>
                            <h2 className='text-halka'>Online</h2>
                        </div>
                    </div>
                    <BsThreeDotsVertical className='text-[25px] text-primary' />
                </div>
            </div>
            <div className='shadow-lg h-[500px]   relative rounded-lg overflow-y-scroll no-scrollbar px-2'>
                {
                    sendMsg.map((item) => (

                        item.whoSendId == data.uid ?
                            item.image ?

                                <div className=' px-3 flex justify-end'>
                                    <div>
                                        <picture>
                                            <ModalImage className='w-full h-[200px] rounded-lg border-4 border-[#3747f9]'
                                                small={item.image}
                                                large={item.image}
                                            />
                                        </picture>
                                        <h2 className=' text-[10px] text-primary font-Poppins text-end px-2'>{moment(item.date).fromNow()}</h2>
                                    </div>
                                </div>

                                :


                                <div className='py-1'>
                                    <div className='px-4 relative overflow-hidden text-end'>
                                        <p className=' text-base font-Poppins bg-[#054ffa] inline px-2 text-white  py-1
                          rounded-md w-[50%] text-start '>{item.msg}</p>
                                        <IoTriangle className=' absolute bottom-[-2px] right-2 text-[#054ffa]' />
                                    </div>
                                    <h2 className=' text-[10px] text-primary font-Poppins text-end px-2'>{moment(item.date).fromNow()}</h2>
                                </div>
                            :
                            item.image ?
                                <div className=' px-3 flex '>
                                    <div>
                                        <picture>
                                            <ModalImage className='w-full h-[200px] rounded-lg border-2'
                                                small={item.image}
                                                large={item.image}
                                            />
                                        </picture>
                                        <h2 className=' text-[10px] text-primary font-Poppins text-end px-2'>{moment(item.date).fromNow()}</h2>
                                    </div>
                                </div>
                                :
                                <div className='py-1'>
                                    <div>
                                        <div className=' px-4 relative overflow-hidden'>
                                            <p className=' text-base font-Poppins  bg-[#fa05d9] inline px-2 text-white font-medium capitalize
                                        rounded-md py-1  w-[50%]'>{item.msg}</p>
                                            <IoTriangle className=' absolute bottom-[-2px] left-[8px] text-[#fa05d9]' />
                                        </div>
                                        <h2 className=' text-[10px] text-primary font-Poppins px-2'>{moment(item.date).fromNow()}</h2>
                                    </div>

                                </div>
                    ))
                }


                <div ref={lastMsg} />





            </div>

            <div className='mt-3   bottom-[20px]'>
                <div className='bg-[#F1F1F1] px-5 py-2 flex items-center rounded-md '>
                    <input type="message" onChange={handleMessage} value={msg}
                        className='w-full outline-none rounded-md text-base font-Poppins font-medium' />
                    <div className=' flex gap-4 '>
                        <MdOutlineEmojiEmotions onClick={handleShowEmoji} className=' text-[25px] hover:text-primary
                         hover:shadow-orange-400' />
                        {
                            showEmoji &&
                            <div className=' absolute bottom-10 left-0'>
                                <EmojiPicker onEmojiClick={(item) => handleEmoji(item)} />
                            </div>
                        }


                        <label >
                            <input onChange={handleImg} type="file" className=' hidden' />
                            <CiCamera className=' text-[25px] hover:text-primary' />
                        </label>
                        {
                            msg
                            &&
                            <button onClick={handleSentMsg} type='submit'>
                                <BsSendFill className=' text-[25px] text-primary ' />
                            </button>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message