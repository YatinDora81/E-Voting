import {createSlice} from "@reduxjs/toolkit"

const dbSlice = createSlice({
    name : "db",
    initialState : {
        cdata : [],
        city : [],
        userVoted : false,
    },
    reducers : {
        addCData : (state,action)=>{
            state.cdata = action.payload;
        },
        addCity : (state,action)=>{
            state.city =action.payload
        },
        changeUserVoted : (state,action)=>{
            state.userVoted = action.payload
        }
    }
})

export const { addCData ,addCity , changeUserVoted } = dbSlice.actions
export default dbSlice.reducer