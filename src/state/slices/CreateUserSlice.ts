import { StateCreator } from 'zustand';
import { UserSlice } from './models';
import { getCookie } from '../../helpers';

const credentials = getCookie('credentials');
const initialState = JSON.parse(credentials ?? '{}');

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: initialState,
  setUser: (credentials) => {
    set(() => ({ user: credentials }));
  }
});