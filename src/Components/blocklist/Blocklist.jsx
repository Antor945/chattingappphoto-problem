import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaSearch } from 'react-icons/fa'
import { ImBlocked } from 'react-icons/im'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const Blocklist = () => {
    const db = getDatabase();
    const data = useSelector(state => state.userLoginInfo.userInfo.user);
    const [blocklist, setBlocklist] = useState([])

    useEffect(() => {
        const starCountRef = ref(db, 'blocklist/');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (data.uid == item.val().blockbyid) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setBlocklist(arr)
        })
    }, []);

    const handleUnblock = (item) => {
        remove(ref(db, 'blocklist/' + item.id))
    }


    return (
        <section className=' w-full'>
            <div className=' flex justify-between items-center px-4'>
                <div className=' flex gap-2 items-center '>
                    <h2 className=' font-Poppins text-xl font-semibold text-primary'>Block List</h2>
                    <ImBlocked />
                </div>
                <BsThreeDotsVertical className=' text-xl text-primary' />
            </div>
            <div className=' px-4 relative'>
                <input type="serch" className='w-full outline-none px-3 border-blue-50 border-2 
       py-1 rounded-md' placeholder='search user' />
                <FaSearch className=' text-[23px] text-primary absolute top-2 right-7' />
            </div>
            {
                blocklist == ''
                    ?
                    <div className=' h-40 flex justify-center items-center'>
                        <h2 className=' font-Poppins text-xl text-primary font-semibold'>
                            Block List Blank
                        </h2>
                    </div>
                    :
                    <div>
                        {
                            blocklist.map((item) => (
                                <div className=' '>
                                    <div className='flex justify-around items-center'>
                                        <div className='w-[70px] h-[70px] rounded-full'>
                                            <picture>
                                                <img className=' rounded-full' src={data.photoURL} alt="" />
                                            </picture>
                                        </div>
                                        <div>
                                            <h2 className=' font-Poppins text-[#000] font-semibold'>
                                                {item.block}
                                            </h2>
                                            <h2 className='text-halka'>Hi Guys, Wassup!</h2>
                                        </div>
                                        <div>
                                            <button onClick={() => handleUnblock(item)}
                                                className='text-base bg-primary text-white  rounded-lg px-3 py-[2px] capitalize'> unblock
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

export default Blocklist