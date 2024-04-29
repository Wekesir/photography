import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name : "user",
    initialState : {
        loading: false,
        userDetails : [],
        isAunthenticated : false,
    },
    reducers : {
        loginSuccess : ( state, action ) => { //When the user has successfully logged in
            state.userDetails = action.payload;
            state.isAunthenticated = true;
        },
        logOut : ( state ) => { //When  the logout action has been called 
            state.userDetails = [];
            state.isAunthenticated = false;
        }, 
    }
})

export const { loginSuccess, logOut } = userSlice.actions

export default userSlice.reducer