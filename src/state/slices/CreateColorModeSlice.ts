import { StateCreator } from 'zustand';
import { ColorModeSlice } from './models/colorMode.model.ts';

const colorModeInitialState = localStorage.getItem('theme') ?? 'light';

if (colorModeInitialState === 'dark') {
  localStorage.theme = 'dark';
  document.documentElement.classList.add('dark');
} else {
  localStorage.theme = 'light';
  document.documentElement.classList.remove('dark');
}

export const createColorModeSlice: StateCreator<ColorModeSlice> = (set) => ({
  colorMode: colorModeInitialState,
  setColorMode: (colorMode) => {
    set(() => ({ colorMode: colorMode }));

    if (colorMode === 'dark') {
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
    }
  }
});