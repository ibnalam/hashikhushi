import { createSlice } from '@reduxjs/toolkit'
// import { json } from 'react-router-dom'                        




const initialState = {
  value: localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
}


export const userSlice = createSlice({
  name: 'loginuser',
  initialState,
  reducers: {
    logedUser: (state,action) => {  
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { logedUser } = userSlice.actions

export default userSlice.reducer