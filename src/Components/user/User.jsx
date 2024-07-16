import React, { useEffect, useState } from 'react'
import { FaFacebookMessenger, FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { activeMsg } from '../../slices/messageSlice';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const db = getDatabase();
    const [user, setUser] = useState([]);
    const [friendRequestList, setFriendRequstList] = useState([]);
    const [friendList, setFriendList] = useState([]);
    const [blocklist, setBlocklist] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const data = useSelector(state => state.userLoginInfo.userInfo.user);

    useEffect(() => {
        const starCountRef = ref(db, 'users/');
        onValue(starCountRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (item.key != data.uid) {
                    arr.push({ ...item.val(), userid: item.key });
                };
            });
            setUser(arr);
        });
    }, []);

    const handleAddFriend = (item) => {
        set(push(ref(db, 'friendRequest/')), {
            sendername: data.displayName,
            senderid: data.uid,
            recivername: item.username,
            reciverid: item.userid
        });
    };

    const handleMsg = (item) => {
        dispatch(activeMsg({ id: item.userid, name: item.username }))
        localStorage.setItem('activeMsg', JSON.stringify({ id: item.userid, name: item.username }));
        setTimeout(() => {
            navigate('/message')
        }, 200);
    }

    useEffect(() => {
        const starCountRef = ref(db, 'friendRequest/');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                arr.push(item.val().senderid + item.val().reciverid);
            })
            setFriendRequstList(arr)
        });
    }, []);

    useEffect(() => {
        const starCountRef = ref(db, 'blocklist/');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                arr.push(item.val().blockbyid + item.val().blockid);
            });
            setBlocklist(arr)
        })
    }, []);


    useEffect(() => {
        const starCountRef = ref(db, 'friends/');
        onValue(starCountRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                arr.push(item.val().senderid + item.val().reciverid);
            });
            setFriendList(arr)
        })
    }, []);

    return (
        <section className=' w-full'>
            <div className=' flex justify-between items-center px-4'>
                <div className=' flex gap-2 items-center'>
                    <h2 className=' font-Poppins text-xl font-semibold text-primary'>User</h2>
                    <FaUser />
                </div>
                <BsThreeDotsVertical className=' text-xl text-primary' />
            </div>

            <div className=' px-4 relative'>
                <input type="serch" className='w-full outline-none px-3 border-blue-50 border-2 
       py-1 rounded-md' placeholder='search user' />
                <FaSearch className=' text-[23px] text-primary absolute top-2 right-7' />
            </div>
            {
                user == ''
                    ?
                    <div className=' h-40 flex justify-center items-center'>
                        <h2 className=' font-Poppins text-xl text-primary font-semibold'>
                            No User
                        </h2>
                    </div>
                    :
                    <div className=' '>
                        {
                            user.map((item) => (

                                <div>
                                    <div className='flex justify-around items-center'>
                                        <div className='w-[70px] h-[70px] rounded-full'>
                                            <picture>
                                                <img className=' rounded-full' src={data.photoURL} alt="" />
                                            </picture>
                                        </div>
                                        <div>
                                            <h2 className=' font-Poppins text-[#000] font-semibold'>
                                                {item.username}
                                            </h2>
                                            <h2 className='text-halka'>Hi Guys, Wassup!</h2>
                                        </div>
                                        <div>
                                            {
                                                blocklist.includes(item.userid + data.uid)
                                                    ||
                                                    blocklist.includes(data.uid + item.userid)
                                                    ?
                                                    <button className=' text-base bg-primary
                             text-white  rounded-lg px-3 py-[2px] capitalize'>blocked
                                                    </button>
                                                    :
                                                    friendList.includes(item.userid + data.uid)
                                                        ||
                                                        friendList.includes(data.uid + item.userid)
                                                        ?
                                                        <  FaFacebookMessenger onClick={() => handleMsg(item)} className=' text-[25px] text-primary group-hover:text-white duration-700' />

                                                        :
                                                        friendRequestList.includes(item.userid + data.uid)
                                                            ||
                                                            friendRequestList.includes(data.uid + item.userid)
                                                            ?
                                                            <button className=' text-base bg-primary
                                 text-white  rounded-lg px-3 py-[2px] capitalize'>pending
                                                            </button>
                                                            :
                                                            <button onClick={() => handleAddFriend(item)} className='text-base bg-primary
                                        text-white  rounded-lg px-3 py-[2px] capitalize'> Add
                                                            </button>
                                            }

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

export default User