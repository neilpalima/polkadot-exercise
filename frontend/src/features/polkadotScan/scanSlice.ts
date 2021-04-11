import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

import * as polkadotApi from './polkadotApi';

export interface LoadingState <T> {
  value: T | null;
  loading: boolean;
};

export interface ScanState {
  events: LoadingState <EventsTableData[]>,
  latestBlock: LoadingState <string | number>
  error?: string;
};

export interface EventsSearchParameters {
  startBlock: string;
  endBlock: string;
  endpoint: string;
};

export interface EventsTableData {
  extrinsic: string;
  block: string | number,
  event: string,
  data: unknown
}

const initialLoadingState = {
  value: null,
  loading: false
};

const initialState: ScanState = {
  events: {
    ...initialLoadingState
  },
  latestBlock: {
    ...initialLoadingState
  }
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getEvents = createAsyncThunk(
  'scan/fetchEvents',
  async (values: EventsSearchParameters) => {
    return await polkadotApi.getEvents(values);
  }
);

export const getLatestBlock = createAsyncThunk(
  'scan/latestBlock',
  async () => {
    return await polkadotApi.getLatestBlock();
  }
);

export const scanSlice = createSlice({
  name: 'scan',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = undefined;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.events.loading = true;
        state.events.value = [];
        state.error = undefined;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.events.loading = false;
        state.events.value = action.payload as any;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.events.loading = false;
        state.error = action.error.message;
      })
      .addCase(getLatestBlock.pending, (state) => {
        state.latestBlock.loading = true;
        state.error = undefined;
      })
      .addCase(getLatestBlock.fulfilled, (state, action) => {
        state.latestBlock.loading = false;
        state.latestBlock.value = action.payload;
      })
      .addCase(getLatestBlock.rejected, (state, action) => {
        state.latestBlock.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetError } = scanSlice.actions;

export const selectScanError = (state: RootState) => state.scan.error;
export const selectEvents = (state: RootState) => state.scan.events;
export const selectLatestBlock = (state: RootState) => state.scan.latestBlock;

export default scanSlice.reducer;