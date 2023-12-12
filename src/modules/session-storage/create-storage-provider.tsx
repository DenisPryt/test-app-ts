import React, { Context, useState, PropsWithChildren, useEffect } from 'react';
import { IStorageContextValue } from './create-storage-context';

export interface IStorageProviderProps {
  storage: Storage;
  itemKey: string;
  // errorMessage: string;
}

export const createStorageProvider = <ItemT,>(context: Context<IStorageContextValue<ItemT> | null>) => {
  return ({ children, storage, itemKey }: PropsWithChildren<IStorageProviderProps>) => {
    const [item, setItem] = useState<ItemT>();

    useEffect(() => {
      if (!itemKey || !storage) {
        return;
      }

      try {
        const strItem = storage.getItem(itemKey);
        if (strItem) {
          setItem(JSON.parse(strItem) as ItemT);
        }
      } catch (e) {
        console.warn(`Storage invalid initial value`);

        if (e instanceof Error) {
          console.warn(`Error: ${e.message}`);
        }

        storage.removeItem(itemKey);
      }
    }, [storage, itemKey]);
    
    useEffect(() => {
      if (!itemKey || !storage) {
        return;
      }

      try {
        if (item) {
          storage.setItem(itemKey, JSON.stringify(item));
        } else {
          // storage.removeItem(itemKey);
        }
      } catch (e) {
        if (e instanceof Error) {
          console.error(`Storage error: ${e.message}`);
          // setErrorMessage(e.message);
        } else {
          console.error('Storage unknown error');
          // setErrorMessage(e.message); or rethrow ?
        }
      }
    }, [storage, itemKey, item]);

    return <context.Provider value={{item, setItem, itemKey}}>{children}</context.Provider>
  };
};
