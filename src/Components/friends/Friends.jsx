import React, { useEffect, useState } from 'react'
import { FaFacebookMessenger, FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { activeMsg } from '../../slices/messageSlice';
import { useNavigate } from 'react-router-dom';

const Friends = () => {
  const db = getDatabase();
  const navigate = useNavigate();
  const [friend, setFriend] = useState([]);
  const data = useSelector(state => state.userLoginInfo.userInfo.user);
  const dispatch = useDispatch()

  useEffect(() => {
    const starCountRef = ref(db, 'friends/');
    onValue(starCountRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if (item.val().reciverid == data.uid || item.val().senderid == data.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFriend(arr)
    })
  }, []);

  const handleBlock = (item) => {

    if (data.uid == item.senderid) {
      set(push(ref(db, 'blocklist/')), {
        block: item.recivername,
        blockid: item.reciverid,
        blockbyname: data.displayName,
        blockbyid: data.uid
      }).then(() => {
        remove(ref(db, 'friends/' + item.id))
      });
    } else {
      set(push(ref(db, 'blocklist/')), {
        block: item.sendername,
        blockid: item.senderid,
        blockbyname: data.displayName,
        blockbyid: data.uid
      }).then(() => {
        remove(ref(db, 'friends/' + item.id))
      });
    }

  };

  const handleMsg = (item) => {
    if (item.reciverid == data.uid) {
      dispatch(activeMsg({ id: item.senderid, name: item.sendername }));
      localStorage.setItem('activeMsg', JSON.stringify({ id: item.senderid, name: item.sendername }));

      setTimeout(() => {
        navigate('/message')
      }, 200);
    } else {
      dispatch(activeMsg({ id: item.reciverid, name: item.recivername }));
      localStorage.setItem('activeMsg', JSON.stringify({ id: item.senderid, name: item.sendername }));
      setTimeout(() => {
        navigate('/message')
      }, 200);
    }
  }

  return (
    <section className=' w-full'>
      <div className=' flex justify-between items-center px-4'>
        <div className=' flex gap-2 items-center'>
          <h2 className=' font-Poppins text-xl font-semibold text-primary'>Friend List</h2>
          <FaUser />
        </div>
        <BsThreeDotsVertical className=' text-xl text-primary' />
      </div>
      {
        friend == ""
          ?
          <div className=' h-40 flex justify-center items-center'>
            <h2 className=' font-Poppins text-xl text-primary font-semibold'>
              You Have No Friend
            </h2>
          </div>
          :
          <div>
            <div className=' px-4 relative'>
              <input type="serch" className='w-full outline-none px-3 border-blue-50 border-2 
       py-1 rounded-md' placeholder='search Friends' />
              <FaSearch className=' text-[23px] text-primary absolute top-2 right-7' />
            </div>
            {
              friend.map((item) => (
                <div className=' '>
                  <div className='flex justify-around items-center'>
                    <div className='w-[70px] h-[70px] rounded-full'>
                      <picture>
                        <img className=' rounded-full' src={data.photoURL} alt="" />
                      </picture>
                    </div>
                    <div>
                      <h2 className=' font-Poppins text-[#000] font-semibold'>
                        {
                          item.reciverid == data.uid ? item.sendername : item.recivername
                        }
                      </h2>
                      <h2 className='text-halka'>Hi Guys, Wassup!</h2>
                    </div>
                    <div className=' flex gap-3 items-center'>
                      <  FaFacebookMessenger onClick={() => handleMsg(item)}
                        className=' text-[25px] text-primary group-hover:text-white duration-700' />
                      <button onClick={() => handleBlock(item)} className=' px-4 py-[2px] bg-primary text-white text-base rounded-lg'>
                        Block
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

export default Friends