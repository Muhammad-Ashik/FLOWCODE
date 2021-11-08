import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ColorState {
    value: number;
    name: string;
    code: string;
    themes: Array<any>;
  }

const initialState = {
    value: 1,
    name: 'Black',
    code: '#000000',
    themes: [
        {
            style: {
              circleFill: '#fff',
              circleBorder: '#000000',
              circleColor: '#000000'
            },
            value: 1,
            name: 'Standard',
          },
          {
            style: {
              circleFill: '#000000',
              circleBorder: '#000000',
              circleColor: '#fff'
            },
            value: 2,
            name: 'Standard inverted'
          }
    ]
}

export const FlowcodeColor = createSlice({
    name: 'flowcodeColor',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setColor: (state, action: PayloadAction<ColorState>) => {
            state.name = action.payload.name
            state.value = action.payload.value
            state.code = action.payload.code
            state.themes = action.payload.themes
        },

    }
});

export const { setColor } = FlowcodeColor.actions;

export const selectColor = (state: RootState) => state.flowcodeColor;

export default FlowcodeColor.reducer;