import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../slices/userSlice'
import messageSlice from '../slices/messageSlice'


export default configureStore({
  reducer: {
    userLoginInfo: userSlice,
    messageInfo :messageSlice
  },
})