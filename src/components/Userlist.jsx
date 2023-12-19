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
import { getDatabase, ref, onValue , set , push  } from "firebase/database";


import TextField from '@mui/material/TextField';


const Userlist = () => {

    const db = getDatabase();
    let [userList, setUserlist] = useState([])
    let [search, setSearch] = useState([])
    let [empty, setEmpty] = useState([])
    // let [searchUserList,setSearchUserList] =useState([])
    let userInfo = useSelector((state) => state.activeUser.value)


    

    useEffect(()=> {
         const userRef = ref(db, 'users');
        onValue(userRef, (snapshot) => {
            let arr = []
            snapshot.forEach(item=> {
                if(item.key != userInfo.uid){
                    arr.push({...item.val(),userid:item.key})  
                }
                // console.log(item.key)
            })
            setUserlist(arr)
        });
    },[])


    let [frid, setfrid] = useState([])
    let [fid, setfid] = useState([])

    useEffect(()=> {
        const friendrequestRef = ref(db, 'friendrequest');
       onValue(friendrequestRef, (snapshot) => {
           let arr = []
           snapshot.forEach(item=> {
                arr.push(item.val().whosendid+item.val().whorechiveid)
                //  + item.val().whorechiveid
           })
           setfrid(arr)
       });
   },[])
   
    useEffect(()=> {
        const friendrequestRef = ref(db, 'friends');
       onValue(friendrequestRef, (snapshot) => {
           let arr = []
           snapshot.forEach(item=> {
                arr.push(item.val().whosendid+item.val().whorechiveid)
                //  + item.val().whorechiveid
           })
           setfid(arr)
       });
   },[])



    let handleSearch = (e)=>{
        setEmpty(e.target.value)
        let user =  userList.filter(item=> item.username.toLowerCase().includes(e.target.value.toLowerCase()))
        setSearch(user)
    }


    // let handleSearch =(e)=>{
    //     let filterUser =  userList.filter((item)=>{
    //       setEmpty(e.target.value)
    //         return item.userName.toLowerCase().includes(e.target.value.toLowerCase())
    //       })
    //     setSearchUserList(filterUser)
    //     }



    let handleFriend = (item)=> {
        console.log({
            whosendid: userInfo.uid,
            whosendname: userInfo.displayName,
            whorechiveid: item.userid,
            whorechivename:item.username
        })
        set(push(ref(db, 'friendrequest')), {
            whosendid: userInfo.uid,
            whosendname: userInfo.displayName, 
            whorechiveid: item.userid,
            whorechivename:item.username
          }).then(()=>{
            console.log("done")
          })
        // console.log(item)
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
            <img src={item.profile_picture} alt=""/>
            <div>
                <h3>{item.username}</h3>
                <p>Hi Guys, Wassup!</p>
            </div>
            {
                frid.includes(userInfo.uid+item.userid) || frid.includes(item.userid+userInfo.uid )

                ?
                
                <Button variant="contained" disabled >pending</Button>
                : fid.includes(userInfo.uid+item.userid) || fid.includes(item.userid+userInfo.uid ) 
                ?
                <Button variant="contained" color='success' >Friends</Button>
                :

                <Button variant="contained" onClick={()=>handleFriend(item)}>+</Button>
            }
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
            <Button variant="contained" onClick={handleFriend}>+</Button>
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