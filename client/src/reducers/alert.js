import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];
// In some cases we might not even have any payload data, we just need to call action type
export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        // we could write case 'SET_ALERT', but common convention is to use variables or constants for types
        case SET_ALERT:
            // State is immutable, so, we have to include any other state that's already there
            return [...state, payload];
        case REMOVE_ALERT:
            // Remove a specific alert by id
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}
