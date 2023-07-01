import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createUserSlice } from '../slices/CreateUserSlice.ts';
import { createColorModeSlice } from '../slices/CreateColorModeSlice.ts';
import { createCrudSlice } from '../slices/CreateCrudSlice.ts';
import { CrudSlice, UserSlice } from '../slices/models/slices.model.ts';
import { ColorModeSlice } from '../slices/models/colorMode.model.ts';

export const useStore = create<UserSlice & ColorModeSlice & CrudSlice>()(devtools((...a) => ({
  ...createUserSlice(...a),
  ...createColorModeSlice(...a),
  ...createCrudSlice(...a),
})));