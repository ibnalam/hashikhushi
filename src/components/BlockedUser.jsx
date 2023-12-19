import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import friends from "../assets/friends.png"
import honourse from "../assets/honourse.png"
import hsc from "../assets/hsc.png"
import kiron from "../assets/kiron.png"
import mijan from "../assets/mijan.png"
import sohan from "../assets/sohan.png"
import sonia from "../assets/sonia.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,remove,set,push  } from "firebase/database";


const BlockedUser = () => {
    const db = getDatabase();
    let [blockList,setblockList] = useState([])
    let userInfo = useSelector((state)=>state.activeUser.value)

    let [userList, setUserlist] = useState([])
    let [search, setSearch] = useState([])
    let [empty, setEmpty] = useState([])

    useEffect(()=> {
        
        const blockRef = ref(db, 'block');
       onValue(blockRef, (snapshot) => {
           let arr = []
           snapshot.forEach(item=> {
            if(userInfo.uid == item.val().blockbyid){
                arr.push({
                    id: item.key,
                    block: item.val().block,
                    blockid: item.val().blockid,
                })
            }else if(userInfo.uid == item.val().blockid)  {
                arr.push({
                    id: item.key,
                    blockby: item.val().blockby,
                    blockbyid: item.val().blockbyid,
                })
            }
           })
           setblockList(arr)
       });
   },[])





    let handleSearch = (e)=>{
        setEmpty(e.target.value)
        console.log(e.target.value)
        let user =  blockList.filter(item=> item.username.toLowerCase().includes(e.target.value.toLowerCase()))
        setSearch(user)
    }



  return (
    <>
    <div className='title-box' >
    <h1 className='box-title'>Blocked User</h1>
    </div>
    <div className='box'>
    <div>
        <input type="text" className='searchInput' onChange={handleSearch}/>
    </div>
    {
        empty.length < 1
        ?
        blockList.map(item=> (
            <div className='List'>
            <img src={hsc} alt="" />
            <div>
                <h3>{item.block}</h3>
                <h3>{item.blockby}</h3>
                {/* {
                    item.blockby
                    ?
                    <Button variant="contained">blocked me</Button>
                   :
                   <Button variant="contained">unblock</Button>
                } */}


                {/* {
                    item.blockby && 
                    <Button variant="contained">blocked me</Button>
                } */}
                <p>Hi Guys, Wassup!</p>
            </div>
            {
                    item.blockid && 
                    <Button variant="contained">unblock</Button>
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

export default BlockedUser