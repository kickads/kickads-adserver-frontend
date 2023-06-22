import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../../config/axios/axios.config.ts';
import { useStore } from '../../../../state/store/store.tsx';
import { User } from '../../../../models/User/user.model.ts';
import { UsersResponse } from '../AdminUsers.tsx';

async function getAllUsers(userToken: string | null) {
  const { data } = await axiosInstance.get<UsersResponse>('users', {
    headers: {
      'Authorization': `Bearer ${ userToken }`
    }
  });

  return data.data.users;
}

export function useUsersFiltered() {
  const userToken = useStore(state => state.userToken);
  const [ users, setUsers ] = useState<User[]>([]);
  const [ usersFiltered, setUsersFiltered ] = useState<User[]>([]);
  const data = useQuery({
    queryKey: [ 'users' ],
    queryFn: () => getAllUsers(userToken)
  });

  useEffect(() => {

    if (data.isSuccess) {
      setUsers(data.data);
      setUsersFiltered(data.data);
    }
  }, []);

  const handleUserOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsersFiltered(data.data.filter(user => user.name.toLowerCase().includes(e.target.value)) ?? []);
  };

  return { users, usersFiltered, handleUserOnChange };
}