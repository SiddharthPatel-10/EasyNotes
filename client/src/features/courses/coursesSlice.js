import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../app/api';

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
    try {
        const response = await api.get('/api/courses'); 
        return response.data; // Ensure this is returning an array of courses with 'id' and 'name'
      } catch (error) {
        throw Error('Error fetching courses');
      }
});

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default coursesSlice.reducer;
