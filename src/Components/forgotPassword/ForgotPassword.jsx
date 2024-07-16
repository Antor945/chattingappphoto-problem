import React, { useState } from 'react'
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
    const auth = getAuth();

    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleClick = () => {
        if (!email) {
            setEmailErr("Enter your email address ");
        } else {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                setEmailErr('You have entered an invalid email address!');
            }
        };
        if (email) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    setEmailErr('Password reset email sent!');
                    setEmail('')
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    return (
        <section className='bg-loginImg bg-cover bg-no-repeat h-screen relative '>
            <div className='flex justify-center items-center h-screen'>
                <div className='w-4/12 flex z-10'>
                    <div className=' bg-[#ffffff4d] w-full h-[550px] flex items-center justify-center relative
                       after:backdrop-blur-sm after:absolute after:top after:z-0 after:w-full after:h-full overflow-hidden
                       '>
                        <div className='z-10'>
                            <div className=' flex flex-col gap-3'>
                                {
                                    emailErr && <div className=' absolute top-0 text-center bg-red-500 text-white w-full
                                 py-1 text-base font-medium font-Poppins right-[2px]'>
                                        {emailErr}
                                    </div>
                                }
                                <h2 className=' text-primary font-Poppins font-semibold text-2xl text-center'>Forgot Password</h2>
                                <div className=' relative mt-5'>
                                    <h2 className=' text-base font-Poppins font-medium text-primary
                                 text-start'>Email</h2>
                                    <input onChange={handleEmail} className='w-[300px] px-3 outline-none border-b-2
                                     bg-transparent border-white focus:border-primary' type="email"value={email} />
                                    <div className='block absolute top-4 right-4'>
                                        <MdOutlineMailOutline />
                                    </div>
                                </div>
                                <div className=' flex justify-between mt-5'>
                                    <button className='outline-none bg-primary text-white font-Poppins font-medium
                                 py-2 px-10 border-2 rounded-md hover:bg-transparent duration-300 hover:text-primary'>
                                        <Link to={'/login'}> Back </Link>
                                    </button>
                                    <button onClick={handleClick} className=' outline-none bg-primary text-white font-Poppins font-medium
                                       py-2 px-10 border-2 rounded-md hover:bg-transparent duration-300 hover:text-primary'>
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' absolute backdrop-blur-sm top-0 h-screen w-screen'>
            </div>
        </section>
    )
}

export default ForgotPassword