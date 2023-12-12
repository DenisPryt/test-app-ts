import {
  createStorageContext,
  createStorageProvider,
  createUseStorage,
} from '../session-storage';

export type { IStorageContextValue, IStorageProviderProps } from '../session-storage';

export interface ISubscriptionStorageItem {
  userIds: string[];
  organizationId: string;
}

const SubscriptionStorageContext = createStorageContext<ISubscriptionStorageItem>();

export const SubscriptionStorageProvider = createStorageProvider(SubscriptionStorageContext);
export const useSubscriptionStorage = createUseStorage(SubscriptionStorageContext);
