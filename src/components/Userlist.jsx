import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import friends from "../assets/friends.png"
import honourse from "../assets/honourse.png"
import hsc from "../assets/hsc.png"
import kiron from "../assets/kiron.png"
import mijan from "../assets/mijan.png"
import sohan from "../assets/sohan.png"
import sonia from "../assets/sonia.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue  } from "firebase/database";


import TextField from '@mui/material/TextField';


const Userlist = () => {
    const db = getDatabase();

    let [userList, setUserlist] = useState([])
    let [search, setSearch] = useState([])
    let [empty, setEmpty] = useState([])
    let userInfo = useSelector((state) => state.activeUser.value)
   

    useEffect(()=> {
         const userRef = ref(db, 'users');
        onValue(userRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=> {
                if(item.key != userInfo.uid ){
                    arr.push(item.val())  
                }
                console.log(item.key)
            })
            setUserlist(arr)
        });
    },[])

    let handleSearch = (e)=>{
        setEmpty(e.target.value)
        console.log(e.target.value)
        let user =  userList.filter(item=> item.username.toLowerCase().includes(e.target.value.toLowerCase()))

        console.log(user)
        setSearch(user)
             
    

        // userList.filter(item=> {
        //     console.log(item.username.toLowerCase().includes(e.target.value.toLowerCase())) 

        // })

    }


  return (

   <>
   
    <div className='title-box' >
    <h1 className='box-title'>User List </h1>
    </div>
    <div className='box'>
    
   
    <div>
        <input type="text" className='searchInput' onChange={handleSearch}/>
    </div>
    {
        empty.length < 1
        ?
        userList.map(item=> (
            <div className='List'>
            <img src={item.profile_picture} alt="" />
            <div>
                <h3>{item.username}</h3>
                <p>Hi Guys, Wassup!</p>
            </div>
            <Button variant="contained">Join</Button>
        </div>
        ))
         :
         search.length > 0 ?
         search.map(item=> (
            <div className='List'>
            <img src={hsc} alt="" />
            <div>
                <h3>{item.username}</h3>
                <p>Hi Guys, Wassup!</p>
            </div>
            <Button variant="contained">Join</Button>
        </div>
        ))
        : 
        <p className='nosearch'>No Search here </p>
    }

   
</div>

   </>
  )
}

export default Userlist