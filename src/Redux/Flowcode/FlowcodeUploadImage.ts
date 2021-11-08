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


export const postFlowcodeImage = createAsyncThunk(
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

export const putFlowcodeImage = createAsyncThunk(
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


export const FlowcodeUploadImageAttributes = createSlice({
    name: 'FlowcodeUploadImageAttributes',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setFlowcodeUploadImageData: (state, action: PayloadAction<CampaignImageState>) => {
            state.image_id = action.payload.image_id
            state.image = action.payload.image
        },
        setFlowcodeUploadImageToNull: (state, action) => {
            state.image_id = null
            state.image = null
            state.status = 'idle'
            state.height = 0
            state.width = 0

        },

    },
    extraReducers: (builder) => {
        builder
          .addCase(postFlowcodeImage.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(postFlowcodeImage.fulfilled, (state, action) => {
            state.status = 'idle';
            state.image_id = action.payload.image_id
            state.image = (action.payload.image)
            state.width = action.payload.width
            state.height = action.payload.height
          })
          .addCase(putFlowcodeImage.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(putFlowcodeImage.fulfilled, (state, action) => {
            state.status = 'idle';
            state.image_id = action.payload.image_id
            state.image = action.payload.image
            state.width = action.payload.width
            state.height = action.payload.height
          })
      },
});

export const { setFlowcodeUploadImageData, setFlowcodeUploadImageToNull } = FlowcodeUploadImageAttributes.actions;


export const getFlowcodeUploadImageDetails = (state: RootState) => state.flowcodeUploadImage;

export default FlowcodeUploadImageAttributes.reducer;