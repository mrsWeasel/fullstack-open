import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    text: 'Notification dummy message',
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notificationDummyReducer(state, action) {
            return state
        }
    }
})

export const { notificationDummyReducer } = notificationSlice.actions
export default notificationSlice.reducer