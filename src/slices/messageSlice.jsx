import { createSlice } from '@reduxjs/toolkit'

export const activeMessageSlice = createSlice({
    name: 'active',
    initialState: {
        active: localStorage.getItem('activeMsg')
            ?
            JSON.parse(localStorage.getItem('activeMsg'))
            :
            null,
    },
    reducers: {
        activeMsg: (state, actions) => {
            state.active = actions.payload
        },
    },
})

export const { activeMsg } = activeMessageSlice.actions

export default activeMessageSlice.reducer