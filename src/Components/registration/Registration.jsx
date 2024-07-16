import React, { useEffect, useState } from 'react'
import registrationImg2 from '../../assets/registrationImg2.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash, FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDatabase, ref, set } from "firebase/database";




const Registration = () => {
    const auth = getAuth();
    const db = getDatabase();

    const [name, setName] = useState('');
    const [nameErr, setNameErr] = useState('');

    const [lastName, setlastName] = useState('');
    const [lastNameErr, setlastNameErr] = useState('');

    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');

    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const [confrompassword, setConfromPassword] = useState('');
    const [confrompasswordErr, setConfromPasswordErr] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfromPassword, setShowConfromPassword] = useState(false);


    const navigate = useNavigate();
    const fullName = name + ' ' + lastName

    const handleName = (e) => {
        setName(e.target.value);
        setNameErr('');
    };
    const handleLastName = (e) => {
        setlastName(e.target.value);
        setlastNameErr('');
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setEmailErr('');
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setPasswordErr('');
    }
    const handleConfraomPassword = (e) => {
        setConfromPassword(e.target.value);
        setConfromPasswordErr('');
    }

    const handleClick = () => {
        if (!name) {
            setNameErr('please enter your name');
        };

        if (!lastName) {
            setlastNameErr("Enter Your Last Name");
        };

        if (!email) {
            setEmailErr("Enter your email address ");
        } else {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                setEmailErr('You have entered an invalid email address!');
            }
        };

        if (!password) {
            setPasswordErr("password is required");
        } else if (!/(?=.*[a-z])/.test(password)) {
            setPasswordErr("1 lowercase alphabetical character")
        }
        else if (!/(?=.*[A-Z])/.test(password)) {
            setPasswordErr("1 uppercase alphabetical character")
        } else if (!/(?=.*[0-9])/.test(password)) {
            setPasswordErr(" 1 numeric character")
        } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
            setPasswordErr("  at least one special character")
        } else if (!/(?=.{8,})/.test(password)) {
            setPasswordErr("The string must be eight characters or longer")
        }
        if (password != confrompassword) {
            setConfromPasswordErr("password don't exist")
        }
        if (name && lastName && email && password == confrompassword && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            && /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(password)) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((user) => {

                    updateProfile(auth.currentUser, {
                        displayName: fullName,
                        photoURL: "https://i.ibb.co/xqbFFbC/default-avatar-icon-of-social-media-user-vector.jpg"
                    }).then(() => {
                        toast('registration successfully done');
                        setTimeout(() => {
                            setName('');
                            setlastName('');
                            setEmail('');
                            setPassword('');
                            setConfromPassword('');
                            navigate('/login')
                        }, 2000);
                    }).then(() => {
                        set(ref(db, 'users/' + user.user.uid), {
                            username: user.user.displayName,
                            email: user.user.email,
                            password: password
                        });
                    })
                }).catch((error) => {
                    if (error) {
                        setEmailErr("Email Already in use");
                    }
                });

        }
    }

    useEffect(() => {
        const detectKeyDown = (e) => {
          if (e.key === 'Enter') {
            handleClick();
          }
        };
    
        document.addEventListener('keydown', detectKeyDown);
    
      }, []);
      

    return (
        <section className='bg-registrationImg bg-cover bg-no-repeat h-screen relative overflow-hidden'>
            <div className='md:flex justify-center items-center md:h-screen'>
                <div className='md:w-7/12 flex  md:flex-row flex-col-reverse z-10'>
                    <div className='md:w-[50%] hidden md:block'>
                        <picture>
                            <img className=' md:w-full md:h-[550px] border-[2px] object-cover' src={registrationImg2} alt="" />
                        </picture>
                    </div>
                    <div className=' bg-[#ffffff4d] md:w-[50%] flex items-center justify-center relative
                     md:after:backdrop-blur-sm after:backdrop-blur-[2px] after:absolute after:top after:z-0 after:w-full after:h-full overflow-hidden
                      pb-40 md:pb-0'>
                        <div className='z-10'>
                            <div className=' flex flex-col gap-3'>
                                <div>
                                    {
                                        nameErr && <div className=' absolute top-0 text-center bg-red-500 text-white w-full
                                 py-1 text-base font-medium font-Poppins right-[2px]'>
                                            {nameErr}
                                        </div>
                                    }
                                    {
                                        lastNameErr && <div className=' absolute top-0 text-center bg-red-500 text-white w-full
                                 py-1 text-base font-medium font-Poppins right-[2px]'>
                                            {lastNameErr}
                                        </div>
                                    }
                                    {
                                        emailErr && <div className=' absolute top-0 text-center bg-red-500 text-white w-full
                                 py-1 text-base font-medium font-Poppins right-[2px]'>
                                            {emailErr}
                                        </div>
                                    }
                                    {
                                        passwordErr && <div className=' absolute top-0 text-center bg-red-500 text-white w-full
                                    py-1 text-base font-medium font-Poppins right-[2px]'>
                                            {passwordErr}
                                        </div>
                                    }
                                    {
                                        confrompasswordErr && <div className=' absolute top-0 text-center bg-red-500 text-white w-full
                                    py-1 text-base font-medium font-Poppins right-[2px]'>
                                            {confrompasswordErr}
                                        </div>
                                    }
                                    <ToastContainer
                                        position="top-center"
                                        autoClose={2000}
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
                                </div>
                                <h1 className=' font-Poppins text-[23px] font-semibold text-primary uppercase text-center'>registration</h1>

                                <div className=' relative'>
                                    <h2 className=' text-base font-Poppins font-medium text-primary
                                 text-start'>Name</h2>
                                    <input onChange={handleName} className=' w-[260px]  px-3 outline-none border-b-2
                                 bg-transparent border-black' type="name" value={name} />
                                    <div className='block absolute top-4 right-4'>
                                        <FaRegUser />
                                    </div>
                                </div>

                                <div className=' relative'>
                                    <h2 className=' text-base font-Poppins font-medium text-primary
                                 text-start'>Last Name</h2>
                                    <input onChange={handleLastName} className=' w-[260px] px-3 outline-none border-b-2
                                 bg-transparent border-black' type="lastName" value={lastName} />
                                    <div className='block absolute top-4 right-4'>
                                        <FaRegUser />
                                    </div>
                                </div>

                                <div className=' relative'>
                                    <h2 className=' text-base font-Poppins font-medium text-primary
                                 text-start'>Email</h2>
                                    <input onChange={handleEmail} className=' w-[260px] px-3 outline-none border-b-2
                                 bg-transparent border-black' type="email" value={email} />
                                    <div className='block absolute top-4 right-4'>
                                        <MdOutlineMailOutline />
                                    </div>
                                </div>

                                <div className=' relative'>
                                    <h2 className=' text-base font-Poppins font-medium text-primary
                                 text-start'>Password</h2>
                                    <input onChange={handlePassword} value={password} className=' w-[260px] px-3 
                                    outline-none border-b-2 bg-transparent border-black ' type={showPassword == true ? "text" : 'password'} />
                                    <div className='block absolute top-4 right-4'>
                                        {
                                            showPassword
                                                ?
                                                <FaRegEye onClick={() => setShowPassword(!showPassword)} />
                                                :
                                                <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} />
                                        }
                                    </div>
                                </div>

                                <div className=' relative'>
                                    <h2 className=' text-base font-Poppins font-medium text-primary
                                 text-start'>Confrom Password</h2>
                                    <input onChange={handleConfraomPassword} value={confrompassword} className=' w-[260px] px-3 
                                    outline-none border-b-2 bg-transparent border-black ' type={showConfromPassword == true ? "text" : 'password'} />
                                    <div className='block absolute top-4 right-4'>
                                        {
                                            showConfromPassword
                                                ?
                                                <FaRegEye onClick={() => setShowConfromPassword(!showConfromPassword)} />
                                                :
                                                <FaRegEyeSlash onClick={() => setShowConfromPassword(!showConfromPassword)} />
                                        }
                                    </div>
                                </div>

                                <button onClick={handleClick} className='outline-none bg-primary text-white font-Poppins font-medium
                                 py-2 px-10 border-2 rounded-md hover:bg-transparent duration-300 hover:text-primary'>
                                    Registration
                                </button>
                                <div className='md:pb-5 pb-8'>
                                    <h2 className=' text-primary font-Poppins font-normal text-base
                                    '>Already  have an account ?
                                        <Link to={'/login'} className=' text-[#48fc7e]'> Login</Link>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' absolute z-0 backdrop-blur-sm top-0 h-screen w-screen md:block hidden'>
            </div>
        </section>
    )
}

export default Registration