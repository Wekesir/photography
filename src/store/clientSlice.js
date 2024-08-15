import { createSlice } from "@reduxjs/toolkit";

const ClientSlice = createSlice({
    name : "client",
    initialState : {
        folder : '',
        loading : false,
        clientEmail : '',
    },
    reducers : {
        setFolderID : (state, action) => {
            state.folder = action.payload
        },
        setClientEmail : (state, action) => {
            state.clientEmail = action.payload
        },
        unsetFolderID : (state) => { //Remove the folder ID
            state.folder = ''
        }
    }
})
export const {setFolderID, setClientEmail, unsetFolderID} = ClientSlice.actions 
export default ClientSlice.reducer;