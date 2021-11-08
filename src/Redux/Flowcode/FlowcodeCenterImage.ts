import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios'
// import { Flowcode, FLOWCODE_PATTERN } from "./FlowcodeActions";
import { API_BASE } from '../../features/Flowcode/constants'
import { CampaignImageState } from  '../Requests/CampaignInterfaces'


const initialState: CampaignImageState = {
    status: 'idle',
    image_id: null,
    image: null,
    width: 0,
    height: 0
}


export const postFlowcodeCenterImage = createAsyncThunk(
    'flowcode/postCenterImage',
    // async (data: CampaignInputState) => {
    async (data: FormData) => {
        const API_URL = API_BASE.IMAGE_UPLOAD
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

export const putFlowcodeCenterImage = createAsyncThunk(
    'flowcode/putCenterImage',
    async (props: {imageId: number, imageData: FormData}) => {
        const API_URL = API_BASE.IMAGE_UPLOAD + props.imageId + '/'   ///// 
        const response = await axios.put(API_URL,props.imageData,{
            headers: {
                'Content-Type': 'multipart/form-data;boundary=------WebKitFormBoundaryQzI2iDIj4UQtnodZ',
                // 'Content-Type': 'application/json;charset=UTF-8',
            }
            })
        .then((response) => {
            return response.data;
        })
        .catch(err => {});
        return response
    }
);


export const FlowcodeCenterImageAttributes = createSlice({
    name: 'FlowcodeCenterImageAttributes',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setFlowcodeCenterImageData: (state, action: PayloadAction<CampaignImageState>) => {
            state.image_id = action.payload.image_id
            state.image = action.payload.image
        }

    },
    extraReducers: (builder) => {
        builder
          .addCase(postFlowcodeCenterImage.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(postFlowcodeCenterImage.fulfilled, (state, action) => {
            state.status = 'idle';
            state.image_id = action.payload.image_id
            state.image = (action.payload.image)
            state.width = action.payload.width
            state.height = action.payload.height
          })
          .addCase(putFlowcodeCenterImage.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(putFlowcodeCenterImage.fulfilled, (state, action) => {
            state.status = 'idle';
            state.image_id = action.payload.image_id
            state.image = (action.payload.image)
            state.width = action.payload.width
            state.height = action.payload.height
          })
      },
});

export const { setFlowcodeCenterImageData } = FlowcodeCenterImageAttributes.actions;


export const getFlowcodeCenterImageDetails = (state: RootState) => state.flowcodeCenterImage;

export default FlowcodeCenterImageAttributes.reducer;