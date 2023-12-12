import { useContext, Context } from 'react';

import { IStorageContextValue } from './create-storage-context';

export const createUseStorage = <ItemT,>(context: Context<IStorageContextValue<ItemT> | null>) => {
  return () => useContext(context as Context<IStorageContextValue<ItemT>>); // TODO: check it?
};
