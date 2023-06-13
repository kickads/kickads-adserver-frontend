import { StateCreator } from 'zustand';
import Cookies from 'js-cookie';
import { UserSlice } from './models';

const credentials = Cookies.get('credentials');
const initialState = JSON.parse(credentials ?? '{}');

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: initialState,
  setUser: (credentials) => {
    set(() => ({ user: credentials }));
  }
});