import React, { createRef, useState } from 'react'
import { MdAddPhotoAlternate } from 'react-icons/md'
import "cropperjs/dist/cropper.css";
import { Cropper } from 'react-cropper';
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { getAuth, updateProfile } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { getDatabase, push, set, ref as sref, update } from 'firebase/database';
import { useSelector } from 'react-redux';


const ImgPostPopup = ({ handleCancel, taitle, style }) => {

    const [image, setImage] = useState();
    const [caption, setCaption] = useState('')
    const [cropData, setCropData] = useState();
    const cropperRef = createRef();
    const storage = getStorage();
    const auth = getAuth();
    const navigate = useNavigate();
    const db = getDatabase();
    const data = useSelector(state => state.userLoginInfo.userInfo.user);


    const handleCaption = (e) => {
        setCaption(e.target.value);
    }

    const handleCropImg = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
            const storageRef = ref(storage, uuidv4());

            const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
            uploadString(storageRef, message4, 'data_url')
                .then((snapshot) => {
                    getDownloadURL(storageRef).then((downloadURL) => {
                        updateProfile(auth.currentUser, {
                            photoURL: downloadURL
                        }).then(() => {
                            getDownloadURL(storageRef).then((downloadURL) => {
                                set(push(sref(db, 'publicPost/')), {
                                    uploaderId: data.uid,
                                    uploaderName: data.displayName,
                                    caption: caption,
                                    img: downloadURL,
                                    date: new Date().toISOString()
                                }).then(() => {
                                    // update(ref(db, `users/${data.uid}`), {
                                    //     profilePhoto: downloadURL 
                                    // });
                                    toast('Image Upload Successful');
                                    setTimeout(() => {
                                        navigate('/home')
                                    }, 1000);
                                })
                            })
                        })
                    });

                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };


    return (
        <div className=' fixed left-0 bg-black text-white md:p-10 bg-gradient-to-t
          from-orange-300 via-blue-600  shadow-2xl h-screen w-screen top-0 flex
           justify-center items-center z-10 px-3 py-7 md:py-0'>
            <div>
                <div className=' flex justify-center items-center'>
                    <div className=' flex flex-col items-center '>
                        <h1 className=' font-medium md:text-[34px] text-white mb-3 font-sans capitalize text-2xl'>
                            {taitle}
                        </h1>
                        {
                            image &&
                            <div>
                                <h1 className=' font-medium text-[21px] text-secoundry mb-3 font-Poppins capitalize'>
                                    img-preview
                                </h1>
                                <div className={`${style} overflow-hidden border-2 border-secoundry`}>
                                    <div
                                        className="img-preview w-full h-full"
                                    />
                                </div>
                            </div>
                        }
                        <div className='flex flex-col gap-2  items-center'>
                            <ToastContainer
                                position="top-center"
                                autoClose={1000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="dark"
                                transition:Bounce
                            />
                            {
                                image &&
                                <div className="h-[200px] w-[300px]">
                                    <Cropper
                                        ref={cropperRef}
                                        style={{ height: "100%", width: "100%" }}
                                        zoomTo={0.5}
                                        initialAspectRatio={1}
                                        preview=".img-preview"
                                        src={image}
                                        viewMode={1}
                                        minCropBoxHeight={10}
                                        minCropBoxWidth={10}
                                        background={false}
                                        responsive={true}
                                        autoCropArea={1}
                                        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                                        guides={true}
                                    />
                                </div>
                            }

                        </div>
                    </div>
                </div>
                <div className=' text-center'>
                    <div className=' flex justify-center items-center '>
                        <label className=' flex items-center'>
                            <input onChange={handleCropImg} type="file" className=' hidden' />
                            <MdAddPhotoAlternate className=' text-black text-[25px]' />
                            <h2 className=' text-[20px] font-medium font-sans'> select photo</h2>
                        </label>
                    </div>
                    <div className=' flex flex-col gap-3'>
                        <div>
                            <textarea name="" id="" type="text" onChange={handleCaption} className=' outline-none md:w-80 py-3 font-Poppins
                        rounded-xl px-5 bg-transparent border-2 border-white text-black'
                                placeholder=' Write Caption' />

                        </div>

                        <div className='flex gap-3  justify-center'>
                            <h2 onClick={handleCancel} className='outline-none bg-primary text-white font-Poppins font-medium
                         py-2 px-10 border-2 rounded-md hover:bg-transparent duration-300 hover:text-primary'>
                                cancel
                            </h2>
                            <button onClick={getCropData} className='outline-none bg-primary text-white font-Poppins font-medium
                     py-2 px-10 border-2 rounded-md hover:bg-transparent duration-300 hover:text-primary'>Post</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImgPostPopup