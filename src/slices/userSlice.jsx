import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: localStorage.getItem('userLoginInfo')
            ?
            JSON.parse(localStorage.getItem('userLoginInfo'))
            :
            null,
    },
    reducers: {
        userLoginInfo: (state, actions) => {
            state.userInfo = actions.payload
        },
    },
})

export const { userLoginInfo } = userSlice.actions

export default userSlice.reducer