import { createContext, Dispatch, SetStateAction } from 'react';

export interface IStorageContextValue<ItemT> {
  itemKey: string;
  item?: ItemT;
  setItem: Dispatch<SetStateAction<ItemT | undefined>>;
}

export const createStorageContext = <T,>() => {
  return createContext<IStorageContextValue<T> | null>(null);
}
