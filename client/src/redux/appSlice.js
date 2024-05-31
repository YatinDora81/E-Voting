import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
    name : "app",
    initialState : {
        darkTheme : false,
        isSidebar : false,
    },
    reducers : {
        changeTheme : (state,action)=>{
            state.darkTheme = !state.darkTheme
        },
        changeSideBar : (state,action)=>{
            state.isSidebar = !state.isSidebar
        }
    }
})

export const { changeTheme , changeSideBar } = appSlice.actions;
export default appSlice.reducer;