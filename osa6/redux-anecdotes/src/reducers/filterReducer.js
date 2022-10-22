import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeFilter(state, action) {
            const newState = action.payload
            return newState
        }
    }
})

export const {changeFilter} = filterSlice.actions
export default filterSlice.reducer