import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios'
// import { Flowcode, FLOWCODE_PATTERN } from "./FlowcodeActions";
import { API_BASE } from '../../features/Flowcode/constants'
import {CampaignCtaIdState, CampaignIdState, CampaignFlowcodeIdState, CampaignOverlayIdState,
    CampaignInputState, CampaignState, CampaignNameState, CampaignVideoIdState, CampaignImageIdState} from  './CampaignInterfaces'


export interface CampaignOutputState {
    status: string;
    campaign_id: number | null;
    name: string | null;
    video: {
        video_id: number | null;
        video: string | null;
    };
    image: {
        image_id: number | null;
        image: string | null;
    };
    flowcode:  {
        flowcode_id: number | null;
        url: string | null;
        pattern: string | null;
        color: string | null;
        theme: string | null;
        flowcode_image: string | null;
        flowcode_center_image: string | null;
    };
    overlay:  {
        overlay_id: number | null;
        name: string | null;
        size: string | null;
        start: number | null;
        duration: number | null;
        template: number | null;
    };
    cta: {
        cta_id: number | null;
        text: string | null;
        text_color: string | null;
        background_color: string | null;
    };
    output_video: {
        video_id: number | null;
        video: string | null;
    };
    task: string | null;
    preview_url: string | null;
    progress_task: string | null;
}

const initialState: CampaignOutputState = {
    status: 'idle',
    campaign_id: null,
    name: "",
    video: {
        video_id: null,
        video: null,
    },
    image: {
        image_id: null,
        image: null,
    },
    flowcode:  {
        flowcode_id: null,
        url: null,
        pattern: null,
        color: null,
        theme: null,
        flowcode_image: null,
        flowcode_center_image: null,
    },
    overlay:  {
        overlay_id: null,
        name: null,
        size: null,
        start: null,
        duration: null,
        template: null,
    },
    cta: {
        cta_id: null,
        text: null,
        text_color: null,
        background_color: null,
    },
    output_video: {
        video_id: null,
        video: null,
    },
    task: null,
    preview_url: null,
    progress_task: null,

}


export const fetchCampaign = createAsyncThunk(
    'campaign/fetchCampaignResp',
    async (props: {campaignId: number, preview: boolean}) => {
        const { campaignId, preview } = props
        const API_URL = API_BASE.GET_OUTPUT_VIDEO + campaignId + '/'

        const response = await axios.get(API_URL, {
            params: {
                preview: preview?preview:false
            }
          })
            .then((response) => {
                return response.data;
            })
            .catch(err => {});
            return response
    }
);


export const CampaignOutputVideoAttributes = createSlice({
    name: 'CampaignAttributes',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setCampaignName: (state, action: PayloadAction<CampaignNameState>) => {
            state.name = action.payload.name
        },
        setCampaignId: (state, action: PayloadAction<CampaignIdState>) => {
            state.campaign_id = action.payload.campaign_id
        }
        

    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchCampaign.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchCampaign.fulfilled, (state, action) => {
            state.status = 'idle';
            
            if(action.payload){
                state.campaign_id = action.payload.campaign_id;
                state.name = action.payload.name;
                state.video = action.payload.video;
                state.image = action.payload.image;
                state.flowcode = action.payload.flowcode;
                state.overlay = action.payload.overlay;
                state.cta = action.payload.cta;
                state.output_video = action.payload.output_video;
                state.task = action.payload.task;
                state.preview_url = action.payload.preview_url;
                state.progress_task = action.payload.progress_task;
            }
          })
          
      },
});

export const { setCampaignName, setCampaignId} = CampaignOutputVideoAttributes.actions;


export const getCampaignOtputVideo = (state: RootState) => state.campaignOutput.output_video;
export const getCampaignOtput = (state: RootState) => state.campaignOutput;

export default CampaignOutputVideoAttributes.reducer;