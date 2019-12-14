import uuid from 'uuid';
import { REMOVE_ALERT, SET_ALERT } from './types';
// We will dispatch these which will call the case in the alert reducer

// We want to be able to dispatch more than one action type from this arrow function
// We can add dispatch since we have thunk middleware
export const setAlert = (msg, alertType, timeOut = 5000) => dispatch => {
    // UUID.v4 will return a random universal long string/id
    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });

    // To remove alert after some time
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeOut);
};
