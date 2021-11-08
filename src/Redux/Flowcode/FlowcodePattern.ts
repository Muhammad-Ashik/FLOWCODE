import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
// import { Flowcode, FLOWCODE_PATTERN } from "./FlowcodeActions";

export interface PatternState {
    value: string;
    name: string;
    isStyle: boolean;
    hasColor: boolean;
    hasPattern: boolean;
  }

const initialState: PatternState = {
    value: '',
    name: 'Standard',
    isStyle: true,
    hasColor: true,
    hasPattern: true
}

export const FlowcodePattern = createSlice({
    name: 'flowcodePattern',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setPattern: (state, action: PayloadAction<PatternState>) => {
            state.name = action.payload.name
            state.value = action.payload.value
            state.isStyle = action.payload.isStyle
            state.hasColor = action.payload.hasColor
            state.hasPattern = action.payload.hasPattern
        },

    }
});

export const { setPattern } = FlowcodePattern.actions;


export const selectPattern = (state: RootState) => state.flowcodePattern;

export default FlowcodePattern.reducer;