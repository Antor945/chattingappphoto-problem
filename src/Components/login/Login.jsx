import React, { useEffect, useState } from 'react'
import loginImg2 from '../../assets/loginImg2.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../../slices/userSlice';


const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr('');
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordErr('');
  };

  const handleClick = () => {
    if (!email) {
      setEmailErr("Enter your email address ");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailErr('You have entered an invalid email address!');
      };
    };

    if (!password) {
      setPasswordErr("password is required");
    } else if (!/(?=.*[a-z])/.test(password)) {
      setPasswordErr("1 lowercase alphabetical character")
    } else if (!/(?=.*[A-Z])/.test(password)) {
      setPasswordErr("1 uppercase alphabetical character")
    } else if (!/(?=.*[0-9])/.test(password)) {
      setPasswordErr(" 1 numeric character")
    } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setPasswordErr("At least one special character")
    } else if (!/(?=.{8,})/.test(password)) {
      setPasswordErr("The string must be eight characters or longer")
    };
    if (email && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
      && /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(password)) {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          sendEmailVerification(auth.currentUser)
          dispatch(userLoginInfo(user));
          localStorage.setItem('userLoginInfo', JSON.stringify(user));

          toast('Login successfuly done,please verify email');
          setEmail('');
          setPassword('');
          setTimeout(() => {
            navigate('/home')
          }, 3000);
        })
        .catch((error) => {
          if (error) {
            setEmailErr('Invalid email or password');
          }
        });
    }
  };


  useEffect(() => {
    const detectKeyDown = (e) => {

      if (e.key === 'Enter') {
        handleClick();
      };
      
    };

    document.addEventListener('keydown', detectKeyDown);

  }, []);





  return (
    <section className='bg-loginImg bg-cover bg-no-repeat h-screen relative '>
      <div className='flex justify-center items-center h-screen'>
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
        <div className='md:w-7/12 flex z-10 px-6'>
          <div className='md:w-[50%] md:block hidden'>
            <picture>
              <img className=' w-full h-[550px] border-[2px] object-cover' src={loginImg2} alt="" />
            </picture>
          </div>
          <div className=' md:bg-[#ffffff4d] md:w-[50%] flex items-center justify-center relative
           md:after:backdrop-blur-sm after:backdrop-blur-[2px] after:absolute after:top after:z-0 after:w-full
            after:h-full overflow-hidden
                     '>
            <div className='z-10'>
              <div className=' flex flex-col gap-3'>

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

                <h1 className=' font-Poppins text-[23px] font-semibold text-primary uppercase text-center'>Login</h1>

                <div className=' relative'>
                  <h2 className=' text-base font-Poppins font-medium text-primary
                                 text-start'>Email</h2>
                  <input onChange={handleEmail} className=' w-full px-3 outline-none border-b-2
                    bg-transparent border-black text-black font-Poppins ' type="email" value={email} />
                  <div className='block absolute top-4 right-4'>
                    <MdOutlineMailOutline />
                  </div>
                </div>

                <div className=' relative'>
                  <h2 className=' text-base font-Poppins font-medium text-primary
                                 text-start'>Password</h2>
                  <input onChange={handlePassword} value={password} className=' w-full px-3 
                    outline-none border-b-2 bg-transparent border-black text-black font-Poppins ' type={showPassword == true ? "text" : 'password'} />
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

                <button onClick={handleClick} className='outline-none bg-primary text-white font-Poppins font-medium
                                 py-2 px-10 border-2 rounded-md hover:bg-transparent duration-300 hover:text-primary'>
                  Login
                </button>
                <div>
                  <h2 className=' text-primary font-Poppins font-normal text-base
                                    '>Create a new account ?
                    <Link to={'/registration'} className=' md:text-primary text-white font-Poppins font-medium'> Registration</Link>
                  </h2>
                  <h2 className=' text-primary font-Poppins font-medium text-base'>
                    <Link to={'/forgotPassword'}>Forgot Password?</Link>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=' absolute md:backdrop-blur-sm backdrop-blur-[2px] top-0 h-screen w-screen'>
      </div>
    </section>
  )
}

export default Login