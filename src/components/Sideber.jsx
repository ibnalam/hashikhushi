import React from 'react';
import profile from '../assets/profil.png'
import { IoHomeOutline } from "react-icons/io5";
import { AiTwotoneMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useState, useRef, createRef } from 'react';
import { useEffect } from 'react';

import { useDispatch,useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';


// modals 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


//  cropper 
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";


//  firebase storage 
import { getStorage, ref, uploadString , getDownloadURL } from "firebase/storage";
import { logedUser } from '../slice/userSlice';

const Sideber = () => {

    const storage = getStorage();
    
    const auth = getAuth();
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let userInfo = useSelector((state) => state.activeUser.value)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const defaultSrc = "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
    const [image, setImage] = useState("");
    const [cropData, setCropData] = useState("#");
    const cropperRef = createRef();

    // let handleLogout = ()=> {
    //     navigate("/")
    //     dispatch(activeuser(null))
    //     localStorage.removeItem("user")
    // }

    
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
      



      const onChange = (e) => {
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
          const storageRef = ref(storage, userInfo.uid);
          const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
            uploadString(storageRef, message4, 'data_url').then((snapshot) => {
            console.log('Uploaded a data_url string!',snapshot);
            getDownloadURL(storageRef).then((downloadURL) => {
                console.log('File available at', downloadURL);
                updateProfile(auth.currentUser, {
                    photoURL:  downloadURL
                  }).then(() => {
                    console.log("user")
                    dispatch(logedUser({...userInfo,photoURL:downloadURL}))
                    localStorage.setItem("user", JSON.stringify({...userInfo,photoURL:downloadURL}))
                    setImage("")
                  })
              });
            });

        }
      };



  return (
    <div className='sideber'>
        <img  onClick={handleOpen} src={userInfo.photoURL} alt="" className='profile'/>
        <div>
            <h2 className='profilename'>{userInfo.displayName}</h2>
        </div>
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
        <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload Your Profile 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {image
          ?
          <div className='prevewBox'>
          <div
            className="img-preview"
          >
          </div>
          </div>
          :
          <img  onClick={handleOpen} src={userInfo.photoURL} alt="" className='profile'/>
         
        }
          <input  onChange={onChange} 
            // name="upload-photo"
            type="file"
            />
          {
            image && 
            <Cropper
            ref={cropperRef}
            style={{ height: 400, width: "100%" }}
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
            checkOrientation={false}
            guides={true}
         />
          }
           {
            image &&
             <>
             <button style={{ float: "right" }} onClick={getCropData}> upload </button>
             {/* <button style={{ float: "right" }} onClick={()=>setImage("")}> cancel </button> */}
             </>
           }
          </Typography>
        </Box>
      </Modal>
    </div>
    </div>
  )
}

export default Sideber