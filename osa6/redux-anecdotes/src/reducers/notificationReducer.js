import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    text: 'Notification dummy message',
    visible: false,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
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

export const { setNotification, toggleVisibility } = notificationSlice.actions

export const notify = (message, timeout) => {
    const delay = () => {
        return new Promise(resolve => setTimeout(resolve, timeout * 1000))
    }

    return async dispatch => {
        dispatch(setNotification(message))
        dispatch(toggleVisibility(true))
        await delay()
        dispatch(toggleVisibility(false))
    }
}

export default notificationSlice.reducer