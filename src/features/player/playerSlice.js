import { createSlice } from '@reduxjs/toolkit';
import Player from '../../UI/organisms/Player';

const initialState = {
  playing: false,
  trackProgress: 0,
  songId: '',
};

const playerSlice = createSlice({
  name: Player,
  initialState,
  reducers: {
    setSong: (state, action) => {
      state.songId = action.payload;
    },
  },
});
export const { setSong } = playerSlice.actions;
export default playerSlice.reducer;
