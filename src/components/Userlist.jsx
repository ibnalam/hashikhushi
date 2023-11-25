import React from 'react'
import friends from "../assets/friends.png"
import honourse from "../assets/honourse.png"
import hsc from "../assets/hsc.png"
import kiron from "../assets/kiron.png"
import mijan from "../assets/mijan.png"
import sohan from "../assets/sohan.png"
import sonia from "../assets/sonia.png"
import Button from '@mui/material/Button';


const Userlist = () => {
  return (
    <div className='box'>
    <h1>User List </h1>
    <div className='List'>
        <img src={hsc} alt="" />
        <div>
            <h3>Friends Reunion</h3>
            <p>Hi Guys, Wassup!</p>
        </div>
        <Button variant="contained">Join</Button>
    </div>
    <div className='List'>
        <img src={hsc} alt="" />
        <div>
            <h3>Friends Reunion</h3>
            <p>Hi Guys, Wassup!</p>
        </div>
        <Button variant="contained">Join</Button>
    </div>
    <div className='List'>
        <img src={hsc} alt="" />
        <div>
            <h3>Friends Reunion</h3>
            <p>Hi Guys, Wassup!</p>
        </div>
        <Button variant="contained">Join</Button>
    </div>
    <div className='List'>
        <img src={hsc} alt="" />
        <div>
            <h3>Friends Reunion</h3>
            <p>Hi Guys, Wassup!</p>
        </div>
        <Button variant="contained">Join</Button>
    </div>
    <div className='List'>
        <img src={hsc} alt="" />
        <div>
            <h3>Friends Reunion</h3>
            <p>Hi Guys, Wassup!</p>
        </div>
        <Button variant="contained">Join</Button>
    </div>
    <div className='List'>
        <img src={hsc} alt="" />
        <div>
            <h3>Friends Reunion</h3>
            <p>Hi Guys, Wassup!</p>
        </div>
        <Button variant="contained">Join</Button>
    </div>
</div>
  )
}

export default Userlist