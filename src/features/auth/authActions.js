import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../helpers/api';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await api.get(`auth/login?email=${email}&password=${password}`, config);
      localStorage.setItem('userToken', response.data.token);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const loginArtist = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await api.get(`artist/login?email=${email}&password=${password}`, config);
      localStorage.setItem('userToken', response.data.token);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, birth }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await api.post('auth/register', { name, email, password, birth }, config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const registerArtist = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, birth, country, genre }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await api.post(
        'artist/register',
        { name, email, password, birth, country, genre, role: 'ASSOCIATE', status: 'ACTIVE' },
        config,
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
