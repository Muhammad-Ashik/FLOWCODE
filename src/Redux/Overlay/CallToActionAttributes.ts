import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
// import { Flowcode, FLOWCODE_PATTERN } from "./FlowcodeActions";
import axios from 'axios'
import { API_BASE } from '../../features/Flowcode/constants'



export interface CtaTextState {
    text: string | null;
  }

export interface CtaColorState {
    text_color: string | number[] | null;
  }

export interface CtaBackgroundState {
    background_color: string | number[] | null;
  }

export interface CTAState {
    status: string;
    cta_id: number | null;
    text: string | null;
    text_color: string | number[] | null;
    background_color: string | number[] | null;
}
export interface CTAInputState {
    text: string | null;
    text_color: string | number[] | null;
    background_color: string | number[] | null;
  }


export interface CTAOutputState {
    cta_id: number | null;
    text: string | null;
    text_color: string | number[] | null;
    background_color: string | number[] | null;
}

const initialState: CTAState = {
    status: 'idle',
    cta_id: null,
    text: '',
    text_color: '#ffffff',
    background_color: '#000000',
}


export const putCTA = createAsyncThunk(
    'campaign/putCTAResp',
    async (props: {ctaId: number | null, ctaData: CTAInputState}) => {
        let API_URL = API_BASE.CTA_UPLOAD
        if(props.ctaId) {
            API_URL = API_BASE.CTA_UPLOAD + props.ctaId + '/' 
            const response = await axios.put(API_URL,JSON.stringify(props.ctaData),{
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
            const response = await axios.post(API_URL, JSON.stringify(props.ctaData),{
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


export const CtaAttributes = createSlice({
    name: 'CtaAttributes',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setCTAText: (state, action: PayloadAction<CtaTextState>) => {
            state.text = action.payload.text
        },
        setCtaTextColor: (state, action: PayloadAction<CtaColorState>) => {
            state.text_color = action.payload.text_color?action.payload.text_color.toString(): ''
        },
        setCtaBackground: (state, action: PayloadAction<CtaBackgroundState>) => {
            state.background_color = action.payload.background_color?action.payload.background_color.toString(): ''
        },
        setCtaDetails: (state, action: PayloadAction<CTAOutputState>) => {
            state.cta_id = action.payload.cta_id
            state.text = action.payload.text
            state.text_color = action.payload.text_color
            state.background_color = action.payload.background_color
        },

    },
    extraReducers: (builder) => {
        builder
          .addCase(putCTA.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(putCTA.fulfilled, (state, action) => {
            state.status = 'idle';
            state.cta_id = action.payload.cta_id
            state.text = action.payload.text
            state.text_color = action.payload.text_color
            state.background_color = action.payload.background_color
          })
      },
});

export const { setCTAText, setCtaTextColor, setCtaBackground, setCtaDetails } = CtaAttributes.actions;


export const selectCta = (state: RootState) => state.cta;

export default CtaAttributes.reducer;