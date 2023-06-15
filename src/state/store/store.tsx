import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createColorModeSlice, createUserSlice } from '../slices';
import { ColorModeSlice, UserSlice } from '../slices/models';

export const useStore = create<UserSlice & ColorModeSlice>()(devtools((...a) => ({
  ...createUserSlice(...a),
  ...createColorModeSlice(...a)
})));