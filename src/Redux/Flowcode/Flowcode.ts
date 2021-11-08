import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface FlowcodeUrlState {
    url: string,
    status: string
  }

export interface FlowcodeUrlImgState {
    url: string,
    status: string,
    img: string | null,
  }

const API_BASE = 'https://generator.flowcode.com/v1/flowcode?data='

const initialState: FlowcodeUrlImgState = {
    url: '',
    status: 'loading',
    img: null,
}

export const getFlowCodeAsync = createAsyncThunk(
    'flowcode/fetchFlowcode',
    async (url: string) => {
        
      const response = await fetch(API_BASE+encodeURIComponent('https://'+url))
      .then((response) => {
        return response.json();
      })
      return response;
    }
  ); 

export const Flowcode = createSlice({
    name: 'flowcode',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setUrl: (state, action: PayloadAction<FlowcodeUrlState>) => {
            state.url = action.payload.url
        },
        setUrlToNone: (state, action) => {
          state.url = ''
          state.status = 'idle'
      },
    },
    extraReducers: (builder) => {
        builder
          .addCase(getFlowCodeAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getFlowCodeAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.img = action.payload;
          });
      },
});

export const { setUrl, setUrlToNone } = Flowcode.actions;

export const getFlowcode = (state: RootState) => state.flowCode;

export default Flowcode.reducer;