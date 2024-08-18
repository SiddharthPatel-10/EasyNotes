import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../app/api';

export const fetchSubjects = createAsyncThunk('subjects/fetchSubjects', async (semesterId) => {
  const response = await api.get(`/api/subjects?semesterId=${semesterId}`);
  return response.data;
});

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default subjectsSlice.reducer;
