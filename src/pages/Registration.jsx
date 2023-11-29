import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import regimg from '../assets/regimg.png'
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification,sendPasswordResetEmail} from "firebase/auth";
import { CirclesWithBar } from  'react-loader-spinner'
import wait from '../../src/assets/wait.gif'
import { MdVisibilityOff , MdVisibility  } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getDatabase, ref, set } from "firebase/database";







const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};




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


const Registration = () => {

  const db = getDatabase();
  

  let [passwordeye, setPasswordeye] = useState(false)



    const auth = getAuth();
    let navigate = useNavigate("")
    let [regdata,setRegdata] = useState({
        email:"",
        fullname:"",
        password:""
    })
     let [loader, setLoader] = useState(false)
     const [open, setOpen] = useState(false);
     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);


    let handleChange = (e)=>{
    setRegdata({...regdata,[e.target.name]:e.target.value})
    }

   let handleChageEye = (e) => {
    if(inputData.password.length>=0 ){
      setHideEye(true)
    }
    if(inputData.password.length==1){
      setHideEye(false)
    }
   }


    let handleSubmit = ()=> {
        setLoader(true)
        createUserWithEmailAndPassword(auth, regdata.email, regdata.password)
        .then((userCredential) => {
            console.log(userCredential.user.uid)
            sendEmailVerification(auth.currentUser)
            .then(() => {
              set(ref(db, 'users/'+ userCredential.user.uid), {
                username: regdata.fullname, 
                email: userCredential.user.email,
                profile_picture : "https://firebasestorage.googleapis.com/v0/b/hashikhushi-825a3.appspot.com/o/%E2%80%94Pngtree%E2%80%94male%20student%20icon_3728104.png?alt=media&token=09f29de6-431d-43a6-923c-c9db7c98a197"
              });
                setRegdata({
                    email:"",
                    fullname:"",
                    password:"",

                })
                navigate("/login")
                setLoader(false)
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            setLoader(false)
            // const errorMessage = error.message;
            console.log(errorCode)
            // console.log(errorMessage)
            if(errorCode.includes("already")){  // email er jonno 
                toast("email already in used")
            }
            if(errorCode.includes("password")){ // password er jonno 
                toast("please give atleast 6 charecter")     
            }
          });
        // if(regdata.email == ""){
        //     toast.error("Please give an email")
         
        // }else{
        //     let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        //     console.log(pattern.test(regdata.email))
        //     if(!pattern.test(regdata.email)){
        //         toast.error("Please give an valid email")
        //     }
        // }
        // if(regdata.fullname == ""){
        //     toast.error("Please give an fullname")
           
        // }
        // if(regdata.password == ""){
        //     toast.error("Please give an password")
           
        // }
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
   let handleSign =() => {
    navigate("/login")
   }

   let handleForgotPass = ()=> {
    sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log("done")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
   console.log("errocode")
  });
   }



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
        <h1>Get started with easily register</h1>
        <p>Free register and you can enjoy it</p>
        <div>
        <MyInput onChange={handleChange} name='email' id="outlined-basic" label="Email Address" variant="outlined" value={regdata.email}/>  
        </div>
        <div>
        <MyInput onChange={handleChange}  name='fullname' id="outlined-basic" label="Fullname" variant="outlined" value={regdata.fullname}/>
        </div>
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
            <>
              <MyButton onClick={handleSubmit} variant="contained">Sign Up</MyButton>
              <Button onClick={handleOpen}>Forgot Password</Button>
            </>
        }
        <div className='peradiv'>
        <p className='accountpera'>Already  have an account ? <span className='sign' onClick={handleSign}>Sign In </span></p>
        </div>
      </div>
        </Grid>
        <Grid item xs={6}>
        <img className='regimg' src={regimg}/>
        </Grid>
        </>
        }
   {/*======= Modals Start Here =========== */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Recover Your Password
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <MyInput onChange={handleChange} name='email'  id="outlined-basic" label="Email" variant="outlined" />
              <MyButton onClick={handleForgotPass}  variant="contained">Recover </MyButton>
              </Typography>
            </Box>
          </Modal>
  </Grid>
  )
}

export default Registration