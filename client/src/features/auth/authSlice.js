import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Set the base URL for axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api/v1/auth', 
});

const initialState = {
  userInfo: localStorage.getItem('token') ? { token: localStorage.getItem('token') } : null,
  loading: false,
  error: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signupRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
      localStorage.removeItem('token');
    },
  },
});

export const { 
  loginRequest, 
  loginSuccess, 
  loginFailure, 
  signupRequest, 
  signupSuccess, 
  signupFailure,
  login,
  logout 
} = authSlice.actions;

export default authSlice.reducer;

// Thunks for login and signup actions
export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axiosInstance.post('/login', userData);
    localStorage.setItem('token', JSON.stringify(data.token));
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || error.message));
  }
};

export const signupUser = (userData) => async (dispatch) => {
  try {
    dispatch(signupRequest());
    const { data } = await axiosInstance.post('/signup', userData);
    localStorage.setItem('token', JSON.stringify(data.token));
    dispatch(signupSuccess(data));
  } catch (error) {
    dispatch(signupFailure(error.response?.data?.message || error.message));
  }
};
