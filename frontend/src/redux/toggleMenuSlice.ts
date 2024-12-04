import { createSlice } from '@reduxjs/toolkit';

interface ToggleMenuState {
  isOpen: boolean;
}

const initialState: ToggleMenuState = {
  isOpen: false,
};

const toggleMenuSlice = createSlice({
  name: 'toggleMenu',
  initialState,
  reducers: {
    toggleMenu(state) {
      console.log("Mandeha");
      state.isOpen = !state.isOpen;
    },
    openMenu(state) {
      state.isOpen = true;
    },
    closeMenu(state) {
      state.isOpen = false;
    },
  },
});

export const { toggleMenu, openMenu, closeMenu } = toggleMenuSlice.actions;

export default toggleMenuSlice.reducer;
