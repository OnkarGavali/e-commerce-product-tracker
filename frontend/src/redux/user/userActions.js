import { UserActionTypes } from "./userActiontypes";

export const setCurrentUser = user => ({
    type : UserActionTypes.SET_CURRENT_USER,
    payload : user
});