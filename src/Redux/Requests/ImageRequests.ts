import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios'
// import { Flowcode, FLOWCODE_PATTERN } from "./FlowcodeActions";
import { API_BASE } from '../../features/Flowcode/constants'
import { CampaignImageState} from  './CampaignInterfaces'


const initialState: CampaignImageState = {
    status: 'idle',
    image_id: null,
    image: null,
    width: 0,
    height: 0
}

export const fetchImage = async (videoId: number) => {
    const API_URL = API_BASE.IMAGE_UPLOAD + '/' + videoId + '/'
    const response = await axios.get(API_URL)
    .then((response) => {
        return response;
    })
    .then((data) => {})
    .catch(err => {});
    return response
}

export const deleteImageData = createAsyncThunk(
    'campaign/deleteImage',
    // async (data: CampaignInputState) => {
    async (id: number) => {
        const API_URL = API_BASE.IMAGE_UPLOAD + id + '/'
        const response = await axios.delete(API_URL)
        .then((response) => {
            return response.data;
        })
        .catch(err => {});
        return response
    }
);


export const postImageData = createAsyncThunk(
    'campaign/postImage',
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

export const putImage = createAsyncThunk(
    'campaign/putImage',
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


export const ImageAttributes = createSlice({
    name: 'ImageAttributes',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setInputImageData: (state, action: PayloadAction<CampaignImageState>) => {
            state.image_id = action.payload.image_id
            state.image = action.payload.image
            state.width = action.payload.width
            state.height = action.payload.height
        }

    },
    extraReducers: (builder) => {
        builder
          .addCase(postImageData.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(postImageData.fulfilled, (state, action) => {
            state.status = 'idle';
            state.image_id = action.payload.image_id
            state.image = action.payload.image
            state.width = action.payload.width
            state.height = action.payload.height
          })
          .addCase(putImage.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(putImage.fulfilled, (state, action) => {
            state.status = 'idle';
            state.image_id = action.payload.image_id
            state.image = action.payload.image
            state.width = action.payload.width
            state.height = action.payload.height
          })
          .addCase(deleteImageData.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(deleteImageData.fulfilled, (state, action) => {
            state.status = 'idle';
            state.image_id = null
            state.image = null
            state.width = 0
            state.height = 0
          })
      },
});

export const { setInputImageData } = ImageAttributes.actions;


export const getRailmageDetails = (state: RootState) => state.railImage;

export default ImageAttributes.reducer;