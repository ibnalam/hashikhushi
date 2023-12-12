import React, { useState,useEffect } from 'react'
import Grid from '@mui/material/Grid';
import imghere from '../assets/imghere.jpg'
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, createUserWithEmailAndPassword ,  signInWithEmailAndPassword, GoogleAuthProvider ,sendEmailVerification,signInWithPopup } from "firebase/auth";
import { CirclesWithBar } from  'react-loader-spinner'
import wait from '../assets/wait.gif'
import { MdVisibilityOff , MdVisibility  } from "react-icons/md";

import { useNavigate } from 'react-router-dom';
import google from '../assets/google.png'
import { useDispatch,useSelector } from 'react-redux';
// import userSlice from '../slice/userSlice';
import { logedUser } from '../slice/userSlice';




const MyInput = styled(TextField) ({
    width: '90%',
    marginBottom: '20px'
});
const MyButton = styled(Button)({
  backgroundColor: '#5F35F5',
  width: "90%",
  padding: "20px 0",
  borderRadius: "86px"
});
const Login = () => {
  let dispatch = useDispatch()
    const auth = getAuth();
    let navigate = useNavigate("")
    let userInfo = useSelector(state => state.activeUser.value)
    console.log(userInfo)
    let [passwordeye, setPasswordeye] = useState(false)
    let [regdata,setRegdata] = useState({
        email:"",
        fullname:"",
        password:""
    })
     let [loader, setLoader] = useState(false)
    let handleChange = (e)=>{
        setRegdata({...regdata,[e.target.name]:e.target.value})
    }
    let handleSubmit = ()=>{
        setLoader(true)
        signInWithEmailAndPassword(auth, regdata.email, regdata.password)
        .then((userCredential) => {
            console.log(userCredential)
            dispatch(logedUser(userCredential.user))
            localStorage.setItem("user",JSON.stringify(userCredential.user))
            if(userCredential.user.emailVerified){
                setRegdata({
                    email:"",
                    password:""
                })
                navigate("/page/homee")
                setLoader(false)
            }else {
                toast("Please verify your email ")
                setLoader(false)   
            }
          })
          .catch((error) => {
            const errorCode = error.code;
            setLoader(false)
            // const errorMessage = error.message;
            console.log(errorCode)
            // console.log(errorMessage)
            if(errorCode.includes("login")){  // login  er jonno 
                toast("Not match email or password")
            }
          });
        if(regdata.email == ""){
            toast.error("Please give an email")
         
        }else{
            let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            console.log(pattern.test(regdata.email))
            if(!pattern.test(regdata.email)){
                toast.error("Please give an valid email")
            }
        }
       
        if(regdata.password == ""){
            toast.error("Please give an password")
           
        }
        // else{
        //     let lowercase = /(?=.*[a-z])/
        //     let capital = /(?=.*[A-Z])/
        //     let number = /(?=.*[0-9])/
        //     let symbol = /(?=.*[!@#$%^&*])/
        //     let length = /(?=.{8,})/
        //     if(!lowercase.test(regdata.password)){
        //         toast.error("Please add lowercase")
        //     }
        //     if(!capital.test(regdata.password)){
        //         toast.error("Please add capital")
        //     }
        //     if(!number.test(regdata.password)){
        //         toast.error("Please add number")
        //     }
        //     if(!symbol.test(regdata.password)){
        //         toast.error("Please add symbol")
        //     }
        //     if(!length.test(regdata.password)){
        //         toast.error("Password must be minimum 8character")
        //     }
        // }
    }

    let handlesignIn = ()=> {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
      .then(()=> {
        navigate("/login")
      })
    }
    let handlesignUp = () => {
      navigate("/")
    }

    useEffect(()=>{
      if(userInfo != null){
        navigate("/logout")
      }
    },[])



  return (
    <Grid container >
    {/* <button onClick={notify}>Notify!</button> */}
    {loader
    ?
    <img style={{width:"100%", height:"100vh"}} src={wait}/>
    :
    <>
<Grid item xs={6}>
  <div className='regbox'>
    <h1>Login to your account!</h1>
   <div className='googlelog'>
   <Button onClick={handlesignIn} variant="outlined"> <img src={google}/>Login With Google</Button>

   </div>
    <div>
    <MyInput onChange={handleChange} name='email' id="outlined-basic" label="Email Address" variant="outlined" value={regdata.email}/>
    </div>
    {/* <div>
    <MyInput onChange={handleChange}  name='fullname' id="outlined-basic" label="Fullname" variant="outlined" value={regdata.fullname}/>
    </div> */}
    <div className='eyediv'>
        <>
        <MyInput
         type= {passwordeye ? "text" : "password"} 
         onChange={handleChange}  name='password' id="outlined-basic" label="Password" variant="outlined" value={regdata.password} />
          <div className='eyepass' onClick={() => setPasswordeye(!passwordeye)}>
            {
              passwordeye ? <MdVisibility/> : <MdVisibilityOff/>
            }
          </div>
        </>
   </div>

    {loader 
    ?    
    <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel='circles-with-bar-loading'
        />
    :
        <MyButton onClick={handleSubmit} variant="contained">Login to Continue</MyButton>
    }
    <div className='peradiv'>
      <p className=''>Don’t have an account ? <span onClick={handlesignUp} className='sign'>Sign up</span></p>
    </div>
  </div>
    </Grid>
    <Grid item xs={6}>
    <img className='imghere' src={imghere}/>  
    </Grid>
    </>
    }
    </Grid>
  )
}

export default Login