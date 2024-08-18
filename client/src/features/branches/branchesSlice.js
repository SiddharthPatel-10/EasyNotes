import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../app/api';

export const fetchBranchesByCourseId = createAsyncThunk(
  'branches/fetchBranchesByCourseId',
  async (courseId) => {
    try {
      const response = await api.get(`/api/branches?courseId=${courseId}`);
      return response.data;
    } catch (error) {
      throw Error('Error fetching branches');
    }
  }
);

const branchesSlice = createSlice({
  name: 'branches',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranchesByCourseId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBranchesByCourseId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchBranchesByCourseId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default branchesSlice.reducer;
