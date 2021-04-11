import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from 'features/authentication/authSlice';
import scanReducer from 'features/polkadotScan/scanSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    scan: scanReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
