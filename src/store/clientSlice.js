import { createSlice } from "@reduxjs/toolkit";

const ClientSlice = createSlice({
    name : "client",
    initialState : {
        folder : '',
        loading : false,
    },
    reducers : {
        setFolderID : (state, action) => {
            state.folder = action.payload
        },
        unsetFolderID : (state) => { //Remove the folder ID
            state.folder = ''
        }
    }
})
export const {folderAccessDetails, unsetFolderID} = ClientSlice.actions 
export default ClientSlice.reducer;