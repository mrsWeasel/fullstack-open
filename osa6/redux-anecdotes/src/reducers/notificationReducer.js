import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    text: 'Notification dummy message',
    visible: false,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notificationDummyReducer(state, action) {
            return state
        },
        changeText(state, action) {
            const text = action.payload
            return {
                ...state,
                text
            }
        },
        toggleVisibility(state, action) {
            const visible = action.payload
            return {
                ...state,
                visible
            }
        } 
    }
})

export const { changeText, toggleVisibility } = notificationSlice.actions
export default notificationSlice.reducer