import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const Request = () => {
    const db = getDatabase();
    const data = useSelector(state => state.userLoginInfo.userInfo.user);
    const [friendRequest, setFriendRequest] = useState([])
    // console.log(data.uid);

    useEffect(() => {
        const starCountRef = ref(db, 'friendRequest/');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (item.val().reciverid == data.uid) {
                    arr.push({ ...item.val(), id: item.key })
                }
            })
            setFriendRequest(arr);
        });
    }, []);
    // console.log(friendRequest);

    const handleAccept = (item) => {
        console.log(item);
        set(push(ref(db, 'friends/')), {
            ...item
        }).then(() => {
            remove(ref(db, 'friendRequest/' + item.id))
        });
    }

    return (
        <section>
            <div className=' flex justify-between items-center px-4'>
                <div className=' flex gap-2 items-center'>
                    <h2 className=' font-Poppins text-xl font-semibold text-primary'>Friend Request</h2>
                    <FaUser />
                </div>
                <BsThreeDotsVertical className=' text-xl text-primary' />
            </div>
            <div className=' px-4 relative'>
                <input type="serch" className='w-full outline-none px-3 border-blue-50 border-2 
            py-1 rounded-md' placeholder='search Friend Request' />
                <FaSearch className=' text-[23px] text-primary absolute top-2 right-7' />
            </div>

            {
                friendRequest == ""
                    ?
                    <div className=' h-40 flex justify-center items-center'>
                        <h2 className=' font-Poppins text-xl text-primary font-semibold'>
                            You Have No Friend Request
                        </h2>
                    </div>
                    :
                    <div>
                        {
                            friendRequest.map((item) => (
                                <div className=' '>
                                    <div className='flex justify-around items-center'>
                                        <div className='w-[70px] h-[70px] rounded-full'>
                                            <picture>
                                                <img className=' rounded-full' src='' alt="" />
                                            </picture>
                                        </div>
                                        <div>
                                            <h2 className=' font-Poppins text-[#000] font-semibold'>
                                                {item.sendername}
                                            </h2>
                                            <h2 className='text-halka'>Hi Guys, Wassup!</h2>
                                        </div>
                                        <div>
                                            <button onClick={() => handleAccept(item)} className=' bg-primary text-white text-[20px] rounded-lg outline-none
                                 px-3'>
                                                Accept
                                            </button>
                                        </div>
                                    </div>
                                    <div className='h-[1px] bg-slate-400 mt-2'>

                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }



        </section>
    )
}

export default Request