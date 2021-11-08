import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios'
// import { Flowcode, FLOWCODE_PATTERN } from "./FlowcodeActions";
import { API_BASE } from '../../features/Flowcode/constants'
import {CampaignCtaIdState, CampaignIdState, CampaignFlowcodeIdState, CampaignOverlayIdState,
    CampaignInputState, CampaignState, CampaignNameState, CampaignVideoIdState, CampaignImageIdState} from  './CampaignInterfaces'


const initialState: CampaignState = {
        campaign_id: null,
        name: "",
        video: null,
        image: null,
        flowcode: null,
        overlay: null,
        cta: null,
        output_video: null,
        task: ''
    }

export const fetchCampaign = async (campaignId: number) => {
    const API_URL = API_BASE.CAMPAIGN_UPLOAD + '/' + campaignId + '/'
    const response = await axios.get(API_URL)
    .then((response) => {
        return response;
    })
    .then((data) => {})
    .catch(err => {});
    return response
}


export const putCampaign = createAsyncThunk(
    'campaign/putCampaignResp',
    async (props: {campaignId: number | null, campaignData: CampaignInputState}) => {
        let API_URL = API_BASE.CAMPAIGN_GENERATE
        if(props.campaignId) {
            API_URL = API_BASE.CAMPAIGN_GENERATE + props.campaignId + '/' 
            const response = await axios.put(API_URL,JSON.stringify(props.campaignData),{
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
            const response = await axios.post(API_URL, JSON.stringify(props.campaignData),{
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

export const postCampaignData = createAsyncThunk(
    'campaign/postCampaign',
    // async (data: CampaignInputState) => {
    async (data: CampaignInputState) => {
        const API_URL = API_BASE.CAMPAIGN_GENERATE
        // const response = await axios.post(API_URL,JSON.stringify(data),{
        const response = await axios.post(API_URL,JSON.stringify(data),{
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                // 'Content-Type': 'multipart/form-data;boundary=------WebKitFormBoundaryQzI2iDIj4UQtnodZ',
            }
            })
        .then((response) => {
            return response.data;
        })
        .catch(err => {});
        return response
    }
);

export const putCampaignData = createAsyncThunk(
    'campaign/putCampaign',
    async (campaignData: CampaignState) => {
        const API_URL = API_BASE.CAMPAIGN_GENERATE + '/' + campaignData.campaign_id + '/'
        const response = await axios.put(API_URL,JSON.stringify(campaignData),{
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
);



export const CampaignAttributes = createSlice({
    name: 'CampaignAttributes',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setName: (state, action: PayloadAction<CampaignNameState>) => {
            state.name = action.payload.name
        },
        setId: (state, action: PayloadAction<CampaignIdState>) => {
            state.campaign_id = action.payload.campaign_id
        },
        setFlowcodeId: (state, action: PayloadAction<CampaignFlowcodeIdState>) => {
            state.flowcode = action.payload.flowcode
        },
        setOverlayId: (state, action: PayloadAction<CampaignOverlayIdState>) => {
            state.overlay = action.payload.overlay
        },
        setCtaId: (state, action: PayloadAction<CampaignCtaIdState>) => {
            state.cta = action.payload.cta
        },
        setVideoId: (state, action: PayloadAction<CampaignVideoIdState>) => {
            state.video = action.payload.video
        },
        setOutputVideoId: (state, action: PayloadAction<CampaignVideoIdState>) => {
            state.output_video = action.payload.video
        },
        setImageId: (state, action: PayloadAction<CampaignImageIdState>) => {
            state.image = action.payload.image
        },
        
        

    },
    extraReducers: (builder) => {
        builder
          .addCase(putCampaign.pending, (state) => {
            // state.status = 'loading';
          })
          .addCase(putCampaign.fulfilled, (state, action) => {
            // state.status = 'idle';
            
            state.campaign_id = action.payload.campaign_id;
            state.name = action.payload.name;
            state.video = action.payload.video;
            state.image = action.payload.image;
            state.flowcode = action.payload.flowcode;
            state.overlay = action.payload.overlay;
            state.cta = action.payload.cta;
            state.output_video = action.payload.output_video;
            state.task = action.payload.task;
          })
          
      },
});

export const { setName, setId, setVideoId, setOutputVideoId, setImageId, setCtaId, setFlowcodeId, setOverlayId} = CampaignAttributes.actions;


export const getCampaignDetails = (state: RootState) => state.campaign;
export const getCampaignName = (state: RootState) => state.campaign.name;
export const getCampaignId = (state: RootState) => state.campaign.campaign_id;
export const getCampaignVideo = (state: RootState) => state.campaign.video;
export const getCampaignImage = (state: RootState) => state.campaign.image;
export const getCampaignOutputVideo = (state: RootState) => state.campaign.output_video;

export default CampaignAttributes.reducer;