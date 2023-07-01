import { User } from '../../../models/User/user.model.ts';
import { UseMutationResult } from '@tanstack/react-query';

export interface UserSlice {
  user: User | null,
  userToken: string | null,
  setUserAuth: (userCredentials: User, userToken: string) => void,
  removeUserAuth: () => void,
}


export interface CrudSlice {
  crudPath: string,
  setCrudPath: (path: string) => void,
  crudQueryKey: string,
  setCrudQueryKey: (crudQueryKey: string) => void,
  crudMutationDelete: any,
  setCrudMutationDelete: (mutationDelete: any) => void,
  handleCrudDelete: (item: CrudItemModel, mutationDelete: UseMutationResult) => void,
  crudMutationUpdate: any,
  setCrudMutationUpdate: (mutationUpdate: any) => void,
  handleCrudUpdate: (e: React.FormEvent<HTMLFormElement>, id: number) => void,
  crudMutationCreate: any,
  setCrudMutationCreate: (mutationCreate: any) => void,
  handleCrudCreate: (name: string) => void
  crudFieldOnUpdate: string,
  handleCrudFieldOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  showInputInUpdate: ShowInputInUpdateModel
  setShowInputInUpdate: (showInputInUpdate: ShowInputInUpdateModel) => void
}

interface CrudItemModel {
  id: number;
  name: string;
}


interface ShowInputInUpdateModel {
  id: number | null,
  isShow: boolean
}