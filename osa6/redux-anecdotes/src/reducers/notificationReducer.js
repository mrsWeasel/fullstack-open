import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    text: 'Notification dummy message',
    visible: false,
    timeoutId: undefined,
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
        },
        setTimeoutId(state, action) {
            if (state.timeoutId) clearTimeout(state.timeoutId)

            const timeoutId = action.payload
            return {
                ...state,
                timeoutId
            }
        }
    }
})

export const { setNotification, toggleVisibility, setTimeoutId } = notificationSlice.actions

export const notify = (message, timeout) => {

    return async dispatch => {
        dispatch(setNotification(message))
        dispatch(toggleVisibility(true))
        const hideAfterDelay = setTimeout(() => {
            dispatch(toggleVisibility(false))
        }, timeout * 1000)
        dispatch(setTimeoutId(hideAfterDelay))
    }
}

export default notificationSlice.reducer