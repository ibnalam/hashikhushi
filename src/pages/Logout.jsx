import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { logedUser } from '../slice/userSlice';





const Logout = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const auth = getAuth();

  let userInfo = useSelector(state => state.activeUser.value)
  console.log(userInfo)



    let handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/login")
            dispatch(logedUser(null))
            localStorage.removeItem("user")
          })
    }
    useEffect(()=>{
      if(userInfo == null){
        navigate("/login")
      }
    },[])


  return (
   
    <Button onClick={handleLogout} variant="contained">Log Out</Button>

  )
}

export default Logout