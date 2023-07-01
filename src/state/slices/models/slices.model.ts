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
  handleCrudDelete: (item: CrudItemModel, mutationDelete: UseMutationResult) => void,
  crudMutationDelete: any,
  setCrudMutationDelete: (mutationDelete: any) => void,
  showInputInUpdate: ShowInputInUpdateModel
  setShowInputInUpdate: (showInputInUpdate: ShowInputInUpdateModel) => void
  handleCrudUpdate: (e: React.FormEvent<HTMLFormElement>, id: number) => void,
  crudMutationUpdate: any,
  setCrudMutationUpdate: (mutationUpdate: any) => void,
  handleCrudFieldOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  crudFieldOnUpdate: string,
  crudMutationCreate: any,
  handleCrudCreate: (name: string) => void
  setCrudMutationCreate: (mutationCreate: any) => void,
}

interface CrudItemModel {
  id: number;
  name: string;
}


interface ShowInputInUpdateModel {
  id: number | null,
  isShow: boolean
}