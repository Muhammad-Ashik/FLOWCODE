import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface MessageState {
    status: string | null;
    message: string | null;

  }

const initialState: MessageState = {
    status: 'idle',
    message: '',
}


export const Messages = createSlice({
    name: 'Messages',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setMessage: (state, action: PayloadAction<MessageState>) => {
            state.message = action.payload.message
        },
    }
});

export const { setMessage } = Messages.actions;

export const getMessage = (state: RootState) => state.Messages;

export default Messages.reducer;