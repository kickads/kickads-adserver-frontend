import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createUserSlice } from '../slices/CreateUserSlice.ts';
import { createColorModeSlice } from '../slices/CreateColorModeSlice.ts';
import { UserSlice } from '../slices/models/slices.model.ts';
import { ColorModeSlice } from '../slices/models/colorMode.model.ts';

export const useStore = create<UserSlice & ColorModeSlice>()(devtools((...a) => ({
  ...createUserSlice(...a),
  ...createColorModeSlice(...a)
})));