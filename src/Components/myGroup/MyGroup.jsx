import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { FaSearch, FaUserFriends } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const MyGroup = () => {
    const [showGroup, setShowGroup] = useState(false);
    const [name, setName] = useState('');
    const [tagline, setTagline] = useState('');
    const [mygroup, setMygroup] = useState([])
    const data = useSelector(state => state.userLoginInfo.userInfo.user);
    const db = getDatabase();

    const showCreateGroup = () => {
        setShowGroup(!showGroup);
    }

    const handleCreate = () => {
        if (name && tagline) {
            set(push(ref(db, 'Grouplist/')), {
                groupName: name,
                tagline: tagline,
                admin: data.uid
            }).then(() => {
                setName('');
                setTagline('');
                setShowGroup(false);
            });
        };
    };

    useEffect(() => {
        const starCountRef = ref(db, 'Grouplist/');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (item.val().admin == data.uid) {
                    arr.push({ ...item.val(), id: item.key });
                }
            })
            setMygroup(arr);
        });
    }, []);

    const handledelete = (item) => {
        remove(ref(db, 'Grouplist/' + item.id));
    }

    console.log(mygroup);

    return (
        <div className=' px-4 '>
            <div className=' flex justify-between items-center  mt-3'>
                <div className=' flex gap-2 items-center '>
                    <h2 className=' font-Poppins text-xl font-semibold text-primary'>My Group</h2>
                    <FaUserFriends className=' text-2xl text-primary' />
                </div>
                <div onClick={showCreateGroup} className=' inline-block'>
                    {
                        showGroup
                            ?
                            <div className=' text-base font-Poppins font-medium text-white bg-primary px-2 py-1 rounded-md'>
                                Cancel
                            </div>
                            :
                            <div className=' text-base font-Poppins font-medium text-white bg-primary px-2 py-1 rounded-md'>
                                Create Group +
                            </div>
                    }
                </div>
            </div>
            <div className='relative'>
                <input type="serch" className='w-full outline-none px-3 border-blue-50 border-2 
         py-1 rounded-md' placeholder='search user' />
                <FaSearch className=' text-[23px] text-primary absolute top-2 right-7' />
            </div>


            {
                showGroup
                &&
                <div className=' flex flex-col gap-3 mt-3'>
                    <div>
                        <h2 className=' text-base font-Poppins text-primary font-medium'> Group Name</h2>
                        <input onChange={(e) => setName(e.target.value)} type="name" className=' border-2 border-primary outline-none w-full px-3 py-1 rounded-md'
                            placeholder='Enter your group name' />
                    </div>
                    <div>
                        <h2 className=' text-base font-Poppins text-primary font-medium'> Group Tagline</h2>
                        <input onChange={(e) => setTagline(e.target.value)} type="name" className=' border-2 border-primary outline-none w-full px-3 py-1 rounded-md'
                            placeholder='Enter your Group Tagline' />
                    </div>
                    <div className=' flex gap-4'>
                        <button onClick={handleCreate} className=' bg-primary w-full text-xl py-2 font-Poppins text-white rounded-xl
                  hover:bg-white hover:border-2 hover:border-primary hover:text-primary duration-500
                    '>Create
                        </button>
                    </div>
                </div>
            }
            {
                mygroup.map((item) => (
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
                                <button onClick={() => handledelete(item)} className=' bg-primary text-white text-[20px] rounded-lg outline-none
                                 px-3'>
                                    Delete
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

export default MyGroup