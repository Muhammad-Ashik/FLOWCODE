import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
// import { Flowcode, FLOWCODE_PATTERN } from "./FlowcodeActions";
import axios from 'axios'
import { API_BASE } from '../../features/Flowcode/constants'


export interface CampaignNameState {
    name: string;
  }

export interface OverlaySizeState {
    size: string;
}

export interface OverlayStartState {
    start: number | null;
}

export interface OverlayDurationState {
    duration: number | null;
}

export interface OverlayTemplateState {
    template: number;
}

export interface CtaTextState {
    cta_text: string;
  }


export interface OverlayInputState {
    name: string | null;
    // cta_text: '',
    size: string | null;
    start: number | null;
    duration: number | null;
    template: number;
  }

export interface OverlayOutputState {
    overlay_id: number | null;
    name: string | null;
    // cta_text: '',
    size: string | null;
    start: number | null;
    duration: number | null;
    template: number | null;
  }  

export interface OverlayState {
    status: string;
    overlay_id: number | null;
    name: string | null;
    // cta_text: '',
    size: string | null;
    start: number | null;
    duration: number | null;
    template: number | null;
  }

const initialState: OverlayState = {
    status: 'idle',
    overlay_id: null,
    name: '',
    // cta_text: '',
    size: 'Large',
    start: 1,
    duration: null,
    template: 1
}


export const putOverlay = createAsyncThunk(
    'campaign/putOverlayResp',
    async (props: {overlayId: number | null, overlayData: OverlayInputState}) => {
        
        let API_URL = API_BASE.OVERLAY_UPLOAD
        if(props.overlayId) {
            API_URL = API_BASE.OVERLAY_UPLOAD + props.overlayId + '/' 
            const response = await axios.put(API_URL,JSON.stringify(props.overlayData),{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                }
            })
            .then((response) => {
                return response.data;
            })
            .catch(err => {});
            return response
        } else{
            const response = await axios.post(API_URL, JSON.stringify(props.overlayData),{
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                }
                })
            .then((response) => {
                return response.data;
            })
            .catch(err => {});
            return response
        }
    }
);

export const OverlayAttributes = createSlice({
    name: 'OverlayAttributes',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setName: (state, action: PayloadAction<CampaignNameState>) => {
            state.name = action.payload.name
        },
        setOverlaySize: (state, action: PayloadAction<OverlaySizeState>) => {
            state.size = action.payload.size
        },
        setOverlayStart: (state, action: PayloadAction<OverlayStartState>) => {
            state.start = action.payload.start
        },
        setOverlayDuration: (state, action: PayloadAction<OverlayDurationState>) => {
            state.duration = action.payload.duration
        },
        setOverlayTemplate: (state, action: PayloadAction<OverlayTemplateState>) => {
            state.template = action.payload.template
        },
        setOverlay: (state, action: PayloadAction<OverlayOutputState>) => {
            state.overlay_id = action.payload.overlay_id
            state.name = action.payload.name
            state.size = action.payload.size
            state.start = action.payload.start
            state.duration = action.payload.duration
            state.template = action.payload.template
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(putOverlay.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(putOverlay.fulfilled, (state, action) => {
            state.status = 'idle';
            state.overlay_id = action.payload.overlay_id
            state.name = action.payload.name
            state.size = action.payload.size
            state.start = action.payload.start
            state.duration = action.payload.duration
            state.template = state.template
          })
      },
});

export const { setName, setOverlaySize, setOverlayStart, setOverlayDuration, setOverlayTemplate, 
    setOverlay } = OverlayAttributes.actions;


export const selectOverlay = (state: RootState) => state.overlayAttributes;

export default OverlayAttributes.reducer;