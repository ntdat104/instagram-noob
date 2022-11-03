import { makeStore } from '~/redux/store';

export type Store = ReturnType<typeof makeStore>;

export type StoreDispatch = Store['dispatch'];

export type RootState = ReturnType<Store['getState']>;
