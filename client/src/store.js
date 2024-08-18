import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'; 
import notesReducer from './features/notes/notesSlice'; 
import coursesReducer from './features/courses/coursesSlice';
import branchesReducer from './features/branches/branchesSlice';
import semestersReducer from './features/semesters/semestersSlice';
import subjectsReducer from './features/subjects/subjectsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
    courses: coursesReducer,
    branches: branchesReducer,
    semesters: semestersReducer,
    subjects: subjectsReducer,
  },
});
