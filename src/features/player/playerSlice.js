import { createSlice } from '@reduxjs/toolkit';
import Player from '../../UI/organisms/Player';

const initialState = {
  playing: false,
  trackProgress: 0,
  songId: '',
  songImg: '',
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  songTitle: '',
  songArtist: '',
};

const playerSlice = createSlice({
  name: Player,
  initialState,
  reducers: {
    setSong: (state, action) => {
      state.activeSong = `${process.env.REACT_APP_API_URL}/song/song?id=${action.payload.songId}`;
      state.songTitle = action.payload.title;
      state.songArtist = action.payload.artist;
      state.isActive = true;
      state.isPlaying = true;
      state.songImg = `${process.env.REACT_APP_API_URL}/media?id=${action.payload.id}`;
    },

    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;

      if (action.payload?.data?.tracks?.hits) {
        state.currentSongs = action.payload.data.tracks.hits;
      } else if (action.payload?.data?.properties) {
        state.currentSongs = action.payload?.data?.tracks;
      } else {
        state.currentSongs = action.payload.data;
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});
export const { setSong, setActiveSong, nextSong, prevSong, playPause, selectGenreListId } =
  playerSlice.actions;
export default playerSlice.reducer;
