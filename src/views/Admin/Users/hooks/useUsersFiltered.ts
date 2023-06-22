import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../../config/axios/axios.config.ts';
import { useStore } from '../../../../state/store/store.tsx';
import { User } from '../../../../models/User/user.model.ts';
import { UsersResponse } from '../AdminUsers.tsx';

async function getAllUsers(userToken: string | null) {
  const { data: { data: users } } = await axiosInstance.get<UsersResponse>('users', {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });

  return users;
}

export function useUsersFiltered() {
  const userToken = useStore(state => state.userToken);
  const [ users, setUsers ] = useState<User[]>([]);
  const [ usersFiltered, setUsersFiltered ] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers(userToken).then(data => {
      setUsers(data.users);
      setUsersFiltered(data.users);
    });
  }, []);

  const handleUserOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsersFiltered(users.filter(user => user.name.toLowerCase().includes(e.target.value)) ?? []);
  };

  return { users, usersFiltered, handleUserOnChange };
}