import { StateCreator } from 'zustand';
import { CrudSlice } from './models/slices.model.ts';
import { confirmNotification } from '../../services/notification/notification.services.ts';

export const createCrudSlice: StateCreator<CrudSlice> = (set, get) => ({
  crudPath: '',
  crudQueryKey: '',
  setCrudPath: (path) => {
    set(() => ({ crudPath: path }));
  },
  setCrudQueryKey: (crudQueryKey) => {
    set(() => ({ crudQueryKey: crudQueryKey }));
  },
  handleCrudDelete: (item, mutationDelete) => {
    confirmNotification({ title: item.name }).then(result => {
      (result.isConfirmed) && mutationDelete.mutate(item.id);
    });
  },
  crudMutationDelete: '',
  setCrudMutationDelete: (mutationDelete) => {
    set(() => ({ crudMutationDelete: mutationDelete }));
  },
  showInputInUpdate: {
    id: null,
    isShow: false
  },
  setShowInputInUpdate: (showInputInUpdate) => {
    set(() => ({ showInputInUpdate }));
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
  crudMutationUpdate: '',
  setCrudMutationUpdate: (mutationUpdate) => {
    set(() => ({ crudMutationUpdate: mutationUpdate }));
  },
  crudFieldOnUpdate: '',
  handleCrudFieldOnChange: (e: React.ChangeEvent<HTMLInputElement>) => {
    set(() => ({ crudFieldOnUpdate: e.target.value }));
  },
  crudMutationCreate: '',
  handleCrudCreate: (name) => {
    get().crudMutationCreate.mutate(name);
  },
  setCrudMutationCreate: (mutationCreate) => {
    set(() => ({ crudMutationCreate: mutationCreate }));
  }
});