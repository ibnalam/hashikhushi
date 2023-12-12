import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'


import friends from "../assets/friends.png"
import honourse from "../assets/honourse.png"
import hsc from "../assets/hsc.png"
import kiron from "../assets/kiron.png"
import mijan from "../assets/mijan.png"
import sohan from "../assets/sohan.png"
import sonia from "../assets/sonia.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,remove,set,push  } from "firebase/database";







const Friends = () => {
    const db = getDatabase();
    let data = useSelector(state=> state.activeUser.value)
    let [reqList,setReqList] = useState([])
    let [friendList,setFriendList] = useState([])
    let dispatch = useDispatch()


    let [userList, setUserlist] = useState([])
    let [search, setSearch] = useState([])
    let [empty, setEmpty] = useState([])

    // useEffect(() => {
    //     const userRef = ref(db, 'users');
    //         onValue(userRef, (snapshot) => {
    //             let arr = []
    //             snapshot.forEach(item=> {
    //                 arr.push(item.val())
    //             })
    //             setUserlist(arr)
    //         });
    // },[])



    useEffect(()=>{
        const friendrequesttRef = ref(db, 'friendrequest');
        onValue(friendrequesttRef, (snapshot) => {
          let arr = []
          snapshot.forEach(item=>{
            if(item.val().whoreceiveid == data.uid){
                console.log(data)
              arr.push({...item.val(),frid:item.key})
            }
          })
          setReqList(arr)
        });
      },[])

      useEffect(()=>{
        const friendRef = ref(db, 'friends');
        onValue(friendRef, (snapshot) => {
          let arr = []
          snapshot.forEach(item=>{
            // console.log("ami friend",item.val())
            if(item.val().whosendid == data.uid || item.val().whoreceiveid == data.uid){
              arr.push({...item.val(),fid:item.key})
            }
          })
          setFriendList(arr)
        });
      },[])
    








    let handleSearch = (e)=>{
        setEmpty(e.target.value)
        console.log(e.target.value)
        let user =  userList.filter(item=> item.username.toLowerCase().includes(e.target.value.toLowerCase()))
        console.log(user)
        setSearch(user)

    }






  return (
   <>
    <div className='title-box' >
    <h1 className='box-title'>Friends</h1>
    </div>
    <div className='box'>
    <div>
        <input type="text" className='searchInput' onChange={handleSearch}/>
    </div>
    {
        empty.length < 1
        ?
        friendList.map(item=> (
            <div className='List'>
            <img src={hsc} alt="" />
            <div>
                <h3>{item.whosendid == data.uid ? item.whoreceivename:item.whosendname}</h3>
                {/* <h3>{item.whosendname}</h3> */}
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

export default Friends