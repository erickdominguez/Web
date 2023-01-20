import { createSlice } from '@reduxjs/toolkit';
import Player from '../../UI/organisms/Player';

const initialState = {
  playing: false,
  trackProgress: 0,
};

const playerSlice = createSlice({
  name: Player,
  initialState,
  reducers: {},
});

export default playerSlice.reducer;
