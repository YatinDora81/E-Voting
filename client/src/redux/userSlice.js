import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name : "user",
    initialState : {
        userInfo : null,
    },
    reducers : {
        addUserInfo : (state,action)=>{
            state.userInfo = action.payload
        },
        clearUserInfo : (state,action)=>{
            state.userInfo = null
        }

    }
})

export const { addUserInfo,clearUserInfo } = userSlice.actions;
export default userSlice.reducer;