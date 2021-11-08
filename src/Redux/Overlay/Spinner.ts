import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SpinnerState {
    status: string | null; 
    spin: boolean;
  }

const initialState: SpinnerState = {
    status: 'idle',
    spin: false,
}


export const Spinner = createSlice({
    name: 'spinner',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setSpin: (state, action: PayloadAction<SpinnerState>) => {
            state.status = 'idle'
            state.spin = action.payload.spin
        },
    }
});

export const { setSpin } = Spinner.actions;

export const getSpinner = (state: RootState) => state.Spinner;

export default Spinner.reducer;