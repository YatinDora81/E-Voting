import { configureStore } from '@reduxjs/toolkit'
import appSlice from './appSlice';
import userSlice from './userSlice';
import dbSlice from './dbSlice';

const Store = configureStore({
    reducer: {
        "app"  : appSlice,
        "user" : userSlice,
        "db" : dbSlice
    },
})


export default Store;