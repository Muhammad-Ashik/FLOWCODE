import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ThemeState {
    value: number;
    name: string;
    code: string;
  }

const initialState = {
    value: 1,
    name: 'Standard',
    code: '#000000',
}

export const FlowcodeTheme = createSlice({
    name: 'flowcodeTheme',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeState>) => {
            state.name = action.payload.name
            state.value = action.payload.value
            state.code = action.payload.code
        },

    }
});

export const { setTheme } = FlowcodeTheme.actions;


export const selectTheme = (state: RootState) => state.flowcodeTheme;

export default FlowcodeTheme.reducer;