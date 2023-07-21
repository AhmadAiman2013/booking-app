import { configureStore } from "@reduxjs/toolkit";
import bookingsReducer from "./features/bookings/bookingsSlice"

export const store = configureStore({
    reducer: {
        bookings: bookingsReducer,
    }
})