import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaSearch, FaUserFriends } from 'react-icons/fa';

const GroupList = () => {

    const [groupList, setGroupList] = useState([]);
    const db = getDatabase();

    useEffect(() => {
        const starCountRef = ref(db, 'Grouplist/');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                
                    arr.push({ ...item.val()});
              
            })
            setGroupList(arr);
        });
    }, []);


    return (
        <div>
            <div className=' flex justify-between items-center px-4 mt-3'>
                <div className=' flex gap-2 items-center '>
                    <h2 className=' font-Poppins text-xl font-semibold text-primary'> Group List</h2>
                    <FaUserFriends className=' text-2xl text-primary' />
                </div>
                <BsThreeDotsVertical className=' text-3xl text-primary' />

            </div>
            <div className=' px-4 relative'>
                <input type="serch" className='w-full outline-none px-3 border-blue-50 border-2 
                 py-1 rounded-md' placeholder='search user' />
                <FaSearch className=' text-[23px] text-primary absolute top-2 right-7' />
            </div>
            {
                groupList.map((item) => (
                    <div className=' '>
                        <div className='flex justify-around items-center'>
                            <div className='w-[70px] h-[70px] rounded-full'>
                                <picture>
                                    <img className=' rounded-full' src='' alt="" />
                                </picture>
                            </div>
                            <div>
                                <h2 className=' font-Poppins text-[#000] font-semibold'>
                                    {item.groupName}
                                </h2>
                                <h2 className='text-halka'>{item.tagline}</h2>
                            </div>
                            <div>
                                <button className=' bg-primary text-white text-[20px] rounded-lg outline-none
                                 px-3'>
                                    Join
                                </button>
                            </div>
                        </div>
                        <div className='h-[1px] bg-slate-400 mt-2'>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default GroupList