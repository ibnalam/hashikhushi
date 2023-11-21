import { createSlice } from '@reduxjs/toolkit'
import { json } from 'react-router-dom'


export const userSlice = createSlice({
  name: 'loginuser',
  initialState: {
    value: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")):null,
  },
  reducers: {
    logedUser: (state,action) => {  
      console.log("loged user",action.payload)
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { logedUser } = userSlice.actions

export default userSlice.reducer