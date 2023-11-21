import React from 'react'
import profile from '../assets/profil.png'
import { IoHomeOutline } from "react-icons/io5";
import { AiTwotoneMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link } from 'react-router-dom';

const Sideber = () => {
  return (
    <div className='sideber'>
        <img src={profile} alt="" className='profile'/>
        <div className='icons'>
            <Link to="/page/home" className='active'>
                <IoHomeOutline  className='homeicon '/><br/>
            </Link>
            <Link to="/page/message" >
                <AiTwotoneMessage className='messageicon'/><br/>
            </Link>
            <Link to="/page/notification" >
                <IoMdNotificationsOutline  className='noticon'/><br/>
            </Link>
            <Link to="/page/settings" >
                 <IoSettingsOutline  className='settingicon'/><br/>
            </Link>
            <Link to="/page/logout"  >
                 <MdLogout className='logicon'/>    
            </Link>

        </div>
    </div>
  )
}

export default Sideber