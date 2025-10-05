import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      // Ensure we have valid data
      if (!action.payload || !action.payload.song) {
        console.warn("Invalid payload for setActiveSong:", action.payload);
        return;
      }
      
      state.activeSong = action.payload.song;

      // Handle different data formats with better error checking
      if (action.payload?.data?.tracks?.hits) {
        state.currentSongs = action.payload.data.tracks.hits;
      } else if (action.payload?.data?.properties) {
        state.currentSongs = action.payload?.data?.tracks;
      } else if (action.payload?.data?.data) {
        // Deezer API format
        state.currentSongs = action.payload.data.data;
      } else if (Array.isArray(action.payload.data)) {
        // Direct array format
        state.currentSongs = action.payload.data;
      } else {
        state.currentSongs = action.payload.data || [];
      }

      state.currentIndex = action.payload.i || 0;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      // Ensure we have valid data
      if (state.currentSongs.length === 0 || action.payload < 0 || action.payload >= state.currentSongs.length) {
        console.warn("Invalid index for nextSong:", action.payload);
        return;
      }
      
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      // Ensure we have valid data
      if (state.currentSongs.length === 0 || action.payload < 0 || action.payload >= state.currentSongs.length) {
        console.warn("Invalid index for prevSong:", action.payload);
        return;
      }
      
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

export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId } = playerSlice.actions;

export default playerSlice.reducer;