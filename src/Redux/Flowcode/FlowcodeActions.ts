import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios'
// import { Flowcode, FLOWCODE_PATTERN } from "./FlowcodeActions";
import { API_BASE } from '../../features/Flowcode/constants'


export interface FlowcodeState {
    status: string;
    flowcode_id: number | null;
    url: string | null;
    url_or_code: string | null;
    pattern: string | null;
    color: string | null;
    theme: string | null;
    flowcode_image: string | number | Blob | null;
    flowcode_center_image: string | number | Blob | null;
    created_with: string | null;
}

export interface FlowcodeOutputState {
    flowcode_id: number | null;
    url: string | null;
    url_or_code: string | null;
    pattern: string | null;
    color: string | null;
    theme: string | null;
    flowcode_image: string | number | Blob | null;
    flowcode_center_image: string | number | Blob | null;
    created_with: string | null;
}


export interface FlowcodeImageState {
    flowcode_image: string| number | Blob | null;
}

export interface FlowcodeCreatedWithState {
    created_with: string | null;
}

export interface FlowcodeUrlOrCode {
    url_or_code: string | null;
}

export interface FlowcodePattern {
    pattern: string | null;
}

export interface FlowcodeInputState {
    url: string | null;
    url_or_code: string | null;
    pattern: string | null;
    color: string | null;
    theme: string | null;
    flowcode_image: string | number | Blob | null;
    flowcode_center_image: string | number | Blob | null;
    created_with: string | null;
}

const initialState: FlowcodeState = {
    status: 'idle',
    flowcode_id: null,
    url: '',
    url_or_code: '',
    pattern: '',
    color: 'white',
    theme: 'Standard',
    flowcode_image: null,
    flowcode_center_image: null,
    created_with: 'G',
}

export const fetchVideo = async (videoId: number) => {
    const API_URL = API_BASE.FLOWCODE_UPDATE + '/' + videoId + '/'
    const response = await axios.get(API_URL)
    .then((response) => {
        return response;
    })
    .then((data) => {})
    .catch(err => {});
    return response
}

export const postFlowcodeData = createAsyncThunk(
    'campaign/postFlowcodeResp',
    // async (data: CampaignInputState) => {
    async (data: FormData) => {
        const API_URL = API_BASE.FLOWCODE_UPDATE
        const response = await axios.post(API_URL,data,{
            headers: {
                // 'Content-Type': 'application/json;charset=UTF-8',
                'Content-Type': 'multipart/form-data;boundary=------WebKitFormBoundaryQzI2iDIj4UQtnodZ',
            }
            })
        .then((response) => {
            return response.data;
        })
        .catch(err => {});
        return response
    }
);

export const putFlowcode = createAsyncThunk(
    'campaign/putFlowcodeResp',
    async (props: {flowcodeId: number | null, flowcodeData: FlowcodeInputState}) => {
        let API_URL = API_BASE.FLOWCODE_UPDATE
        if(props.flowcodeId) {
            API_URL = API_BASE.FLOWCODE_UPDATE + props.flowcodeId + '/' 

            const response = await axios.put(API_URL,JSON.stringify(props.flowcodeData),{
                headers: {
                    // 'Content-Type': 'multipart/form-data;boundary=------WebKitFormBoundaryQzI2iDIj4UQtnodZ',
                    'Content-Type': 'application/json;charset=UTF-8',
                }
                })
            .then((response) => {
                return response.data;
            })
            .catch(err => {});
            return response
        } else{
            const response = await axios.post(API_URL, JSON.stringify(props.flowcodeData),{
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
        
    }
);


export const FlowcodeAttributes = createSlice({
    name: 'FlowcodeAttributes',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setFlowcodeData: (state, action: PayloadAction<FlowcodeOutputState>) => {
            state.flowcode_id = action.payload.flowcode_id
            state.url = action.payload.url
            state.url_or_code = action.payload.url_or_code
            state.pattern = action.payload.pattern
            state.color = action.payload.color
            state.theme = action.payload.theme
            state.flowcode_center_image = action.payload.flowcode_center_image
            state.flowcode_image = action.payload.flowcode_image
            state.created_with = action.payload.created_with
        },
        setFlowcodeImage: (state, action: PayloadAction<FlowcodeImageState>) => {
            state.flowcode_image = action.payload.flowcode_image
        },
        setFlowcodeCreatedWith: (state, action: PayloadAction<FlowcodeCreatedWithState>) => {
            state.created_with = action.payload.created_with
        },
        setFlowcodeUrlOrcode: (state, action: PayloadAction<FlowcodeUrlOrCode>) => {
            state.url_or_code = action.payload.url_or_code
        },
        setFlowcodePattern: (state, action: PayloadAction<FlowcodePattern>) => {
            state.pattern = action.payload.pattern
        }

    },
    extraReducers: (builder) => {
        builder
          .addCase(postFlowcodeData.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(postFlowcodeData.fulfilled, (state, action) => {
            if(action.payload){
                state.status = 'idle';
                state.flowcode_id = action.payload.flowcode_id
                state.url = action.payload.url
                state.url_or_code = action.payload.url_or_code
                state.pattern = action.payload.pattern
                state.color = action.payload.color
                state.theme = action.payload.theme
                state.flowcode_center_image = action.payload.flowcode_center_image
                state.flowcode_image = action.payload.flowcode_image
                state.created_with = action.payload.created_with
            }
          })
          .addCase(putFlowcode.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(putFlowcode.fulfilled, (state, action) => {
            if(action.payload){
                state.status = 'idle';
                state.flowcode_id = action.payload.flowcode_id
                state.url = action.payload.url
                state.url_or_code = action.payload.url_or_code
                state.pattern = action.payload.pattern
                state.color = action.payload.color
                state.theme = action.payload.theme
                state.flowcode_center_image = action.payload.flowcode_center_image
                state.flowcode_image = action.payload.flowcode_image
                state.created_with = action.payload.created_with
            }
          })
      },
});

export const { setFlowcodeData, setFlowcodeImage, setFlowcodeCreatedWith, 
    setFlowcodeUrlOrcode, setFlowcodePattern } = FlowcodeAttributes.actions;


export const getFlowcodeDetails = (state: RootState) => state.flowcodeResponse;

export default FlowcodeAttributes.reducer;