import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./slices/generalSlice";
// import cinemaSlice from "./slices/cinemaSlice";
// import watchSlice from "./slices/watchSlice";

const dataStore = configureStore({
    reducer: {
        generalSlice,
        // watchSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
})

export default dataStore