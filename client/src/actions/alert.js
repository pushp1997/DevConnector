import uuid from 'uuid';
import { REMOVE_ALERT, SET_ALERT } from './types';

// We can add dispatch since we have thunk middleware
export const setAlert = (msg, alertType) => dispatch => {
    // UUID.v4 will return a random universal long string/id
    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });
};
