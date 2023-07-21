import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'https://booking-system-api-ahmadaiman5.sigma-school-full-stack.repl.co'

const initialState = {
    bookings: [],
    status: 'idle',
    error: null,
    loading: false,
}

export const fetchAllBooking = createAsyncThunk('bookings/fetchAllBooking', async () => {
    const response = await axios.get(`${BASE_URL}/bookings`);
    return response.data;
  });

  export const fetchBooking = createAsyncThunk('bookings/fetchBooking', async (user_id) => {
    const response = await axios.get(`${BASE_URL}/bookings/${user_id}`);
    return response.data;
  });


export const addBooking = createAsyncThunk('bookings/addBooking', async (formData) => {
    const response = await axios.post(`${BASE_URL}/bookings`, formData);
    return response.data;
})

export const updateBooking = createAsyncThunk('bookings/updateBooking', async ({ id, formData }) => {
  
    const response = await axios.put(`${BASE_URL}/bookings/${id}`, formData);
    return response.data;

});



  export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async (id) => {
    const response = await axios.delete(`${BASE_URL}/bookings/${id}`);
    return response.data;
  });
  

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
         .addCase(fetchAllBooking.fulfilled, (state, action) => {
            state.bookings = action.payload;
            state.loading = false
         })
         .addCase(fetchBooking.fulfilled, (state, action) => {
            state.bookings = action.payload;
            state.loading = false
         })
         .addCase(addBooking.fulfilled, (state, action) => {
            state.bookings.push(action.payload)
         })
         .addCase(updateBooking.fulfilled, (state, action) => {
            const index = state.bookings.findIndex((booking) => booking.id === action.payload.id)
            if (index !== -1) {
                state.bookings[index] = action.payload
            }
         })
         .addCase(deleteBooking.fulfilled, (state, action) => {
           state.bookings = state.bookings.filter((booking) => booking.id !== action.payload)
         })
         .addCase(fetchAllBooking.rejected, (state, action) => {
          state.error = action.error.message;
          state.bookings = [];
          state.loading = false;
        })
        .addCase(fetchBooking.rejected, (state, action) => {
          state.error = action.error.message;
          state.bookings = []; 
          state.loading = false;
        })
        .addCase(updateBooking.rejected, (state, action) => {
          state.error = action.error.message;
        });
        
    }
    
})

export default bookingsSlice.reducer