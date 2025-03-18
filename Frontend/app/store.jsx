// // app/store.js
// import { configureStore } from '@reduxjs/toolkit'
// import contactReducer from '../../Frontend/src/features/contact/contactSlice'
// import snackbarReducer from '../../Frontend/src/features/snackbar/snackbarSlice'
// // import userReducer from '../features/user/userSlice'

// // import { persistReducer, persistStore } from 'redux-persist'
// // import storage from 'redux-persist/lib/storage'

// // const persistConfig = {
// //   key: 'root',
// //   storage,
// //   whitelist: ['user'], // Persist user data only
// // }

// // const persistedUserReducer = persistReducer(persistConfig, userReducer)

// export const store = configureStore({
//   reducer: {
//     // user: persistedUserReducer,
//     snackbar: snackbarReducer,
//     contact:contactReducer,
 
  
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// })

// export const persistor = persistStore(store)





//! new
import { configureStore } from "@reduxjs/toolkit";
import contactReducer from '../../Frontend/src/features/contact/contactSlice';
import snackbarReducer from '../../Frontend/src/features/snackbar/snackbarSlice';

const store = configureStore({
  reducer: {
    contact: contactReducer, // Contact slice for handling messages
    snackbar: snackbarReducer,
  },
});

export default store;

