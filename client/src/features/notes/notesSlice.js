import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../app/api'; // Use your configured axios instance

// Thunk to fetch notes based on subjectId
export const fetchNotes = createAsyncThunk('notes/fetchNotes', async (subjectId) => {
  const response = await api.get(`/api/notes?subjectId=${subjectId}`);
  return response.data;
});

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default notesSlice.reducer;
