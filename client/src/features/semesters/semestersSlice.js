import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../app/api';

export const fetchSemesters = createAsyncThunk('semesters/fetchSemesters', async (branchId) => {
  const response = await api.get(`/api/semesters?branchId=${branchId}`);
  return response.data;
});

const semestersSlice = createSlice({
  name: 'semesters',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSemesters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSemesters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchSemesters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default semestersSlice.reducer;
