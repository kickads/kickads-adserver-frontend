import { StateCreator } from 'zustand';
import { CrudSlice } from './models/slices.model.ts';
import { confirmNotification } from '../../services/notification/notification.services.ts';

export const createCrudSlice: StateCreator<CrudSlice> = (set, get) => ({
  // BASE CONFIG
  crudPath: '',
  setCrudPath: (path) => {
    set(() => ({ crudPath: path }));
  },
  crudQueryKey: '',
  setCrudQueryKey: (crudQueryKey) => {
    set(() => ({ crudQueryKey: crudQueryKey }));
  },
  // CRUD DELETE
  crudMutationDelete: '',
  setCrudMutationDelete: (mutationDelete) => {
    set(() => ({ crudMutationDelete: mutationDelete }));
  },
  handleCrudDelete: (item, mutationDelete) => {
    confirmNotification({ title: item.name }).then(result => {
      (result.isConfirmed) && mutationDelete.mutate(item.id);
    });
  },
  // CRUD UPDATE
  crudMutationUpdate: '',
  setCrudMutationUpdate: (mutationUpdate) => {
    set(() => ({ crudMutationUpdate: mutationUpdate }));
  },
  handleCrudUpdate: (e, id) => {
    e.preventDefault();

    get().crudMutationUpdate.mutate({
      id: id,
      name: get().crudFieldOnUpdate
    });

    set(() => ({
      crudFieldOnUpdate: '',
      showInputInUpdate: { id: null, isShow: false }
    }));
  },
  // CRUD CREATE
  crudMutationCreate: '',
  setCrudMutationCreate: (mutationCreate) => {
    set(() => ({ crudMutationCreate: mutationCreate }));
  },
  handleCrudCreate: (name) => {
    get().crudMutationCreate.mutate(name);
  },
  // INPUT CHANGE
  crudFieldOnUpdate: '',
  handleCrudFieldOnChange: (e: React.ChangeEvent<HTMLInputElement>) => {
    set(() => ({ crudFieldOnUpdate: e.target.value }));
  },
  // SHOW INPUT UPDATE
  showInputInUpdate: {
    id: null,
    isShow: false
  },
  setShowInputInUpdate: (showInputInUpdate) => {
    set(() => ({ showInputInUpdate }));
  },
});