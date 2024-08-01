import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from './UserSlice'
import clientReducer from './clientSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const rootReducer = combineReducers({
    user : userReducer,
    client : clientReducer
})

const persistConfig = {
    key: 'root',
    storage, 
  }
  
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer : persistedReducer
})

export const persistor = persistStore(store)

export default store  
