import React, { useEffect, useState } from 'react'
// import profile from '../assets/profile/png'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,remove,set,push } from "firebase/database";
import { useSelector } from 'react-redux';

const Frindrequest = () => {
   const db = getDatabase();
   const [requestList,setRequestList] = useState([])
   let userInfo = useSelector((state)=>state.activeUser.value)
   let [search, setSearch] = useState([])
    let [empty, setEmpty] = useState([])

   useEffect(()=>{
      const friendRequestRef = ref(db, 'friendrequest');
      onValue(friendRequestRef, (snapshot) => {
         let arr = []
         snapshot.forEach(item=>{
            if(userInfo.uid == item.val().whorechiveid){

               arr.push({...item.val(),frid:item.key})
            }
         })
         setRequestList(arr)
      });
   },[])

   let handlecancel = (item)=>{
    //   console.log(item)
      remove(ref(db, 'friendrequest/'+item.frid))
   }

   let handleAccept = (item)=>{
      set(push(ref(db, 'friends')), {
         ...item
       }).then(()=>{
         remove(ref(db, 'friendrequest/'+item.frid))
       })
   }


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
    <h1 className='box-title'>Friend Request </h1>
    </div>
    <div className='box'>
    
    <div>
        <input type="text" className='searchInput' onChange={handleSearch}/>
    </div>

     {
         empty.length < 1
         ?
        requestList.map(item=>(
            <div className='List'>
              <img src={item.profile_picture} alt="" />
              <h3>{item.whosendname}</h3>
              <Button variant="contained" onClick={()=>handleAccept(item)}>Accept</Button>
              <Button variant="contained" color='error' onClick={()=>handlecancel(item)}>Cancel</Button>
           </div>
           ))
           :
           search.length > 0 ?
            search.map(item=>(
            <div className='List'>
              <img src={item.profile_picture} alt="" />
              <h3>{item.whosendname}</h3>
              <Button variant="contained" onClick={()=>handleAccept(item)}>Accept</Button>
              <Button variant="contained" color='error' onClick={()=>handlecancel(item)}>Cancel</Button>
           </div>
           ))
           :
           <p className='nosearch'>No Search here </p>
     }
     
     
    </div>
    </>
  )
}

export default Frindrequest