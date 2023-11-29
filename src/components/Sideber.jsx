import React from 'react'
import profile from '../assets/profil.png'
import { IoHomeOutline } from "react-icons/io5";
import { AiTwotoneMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link } from 'react-router-dom';

import { useDispatch,useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';






const Sideber = () => {
    const auth = getAuth();
    let dispatch = useDispatch()
    let navigate = useNavigate()


    // let handleLogout = ()=> {
    //     navigate("/")
    //     dispatch(activeuser(null))
    //     localStorage.removeItem("user")
    // }




  return (
    <div className='sideber'>
        <img src={profile} alt="" className='profile'/>
        <div className='icons'>

            <div className='icons-part'>
            <Link to="/page/homee" className={window.location.pathname == "/page/homee"  && "active"}>
                <IoHomeOutline  className='icon '/><br/>
            </Link>
            </div>

           <div className='icons-part'>
           <Link to="/page/message" className={window.location.pathname == "/page/message"  && "active"}>
                <AiTwotoneMessage className='icon'/><br/>
            </Link>
           </div>

            <div className='icons-part'>
            <Link to="/page/notification" className={window.location.pathname == "/page/notification"  && "active"}>
                <IoMdNotificationsOutline className='icon'/><br/>
            </Link>
            </div>

            <div className='icons-part'>
            <Link to="/page/settings"  className={window.location.pathname == "/page/settings"  && "active"}>
                 <IoSettingsOutline className='icon'/><br/>
            </Link>
            </div>

            <div className='icons-part logpart'>
            <Link to="/page/logout" className={window.location.pathname == "/page/logout" && "active"} >
                 <MdLogout className='icon'/>
            </Link>
            </div>

        </div>
    </div>
  )
}

export default Sideber