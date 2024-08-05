import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name : "user",
    initialState : {
        loading: false,
        userDetails : {},
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
        updateProfilePicture : (state, action) => {
            state.userDetails.image = action.payload
        },
        removeProfilePicture : (state) => {
            state.userDetails.image = ""; //Sets the image string to an empty string 
        },
    }
})

export const { loginSuccess, logOut, updateProfilePicture, removeProfilePicture } = userSlice.actions

export default userSlice.reducer