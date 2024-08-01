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
        }
    }
})
export const {folderAccessDetails} = ClientSlice.actions 
export default ClientSlice.reducer;