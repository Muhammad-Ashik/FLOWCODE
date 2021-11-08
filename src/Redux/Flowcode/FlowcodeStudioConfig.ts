import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface StudioConfig {
    redirect_code: string | null;
    studio_config_id: string;
  }

const initialState: StudioConfig = {
    redirect_code: '',
    studio_config_id: ''
}

export const FlowcodeStudioConfig = createSlice({
    name: 'FlowcodeStudioConfig',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setRedirectCode: (state, action) => {
            state.redirect_code = action.payload.redirect_code?action.payload.redirect_code:''
        },
        setConfigId: (state, action) => {
            state.studio_config_id = action.payload.studio_config_id?action.payload.studio_config_id:''
        },
        setConfigToNull: (state, action) => {
            state.studio_config_id = ''
            state.redirect_code = ''
        },

    }
});

export const { setConfigId, setRedirectCode, setConfigToNull } = FlowcodeStudioConfig.actions;

export const getConfigId = (state: RootState) => state.FlowcodeStudioConfig;

export default FlowcodeStudioConfig.reducer;