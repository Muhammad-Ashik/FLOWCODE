import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios'
// import { Flowcode, FLOWCODE_PATTERN } from "./FlowcodeActions";
import { API_BASE } from '../../features/Flowcode/constants'
import {CampaignVideoState} from  './CampaignInterfaces'


const initialState: CampaignVideoState = {
    status: 'idle',
    video_id: null,
    video: null,
    width: null,
    height: null,
    side_rail_width: {
      small: null,
      large: null,
    },
    side_rail_height: {
      small: null,
      large: null,
    },
    thumbnail: null,
    fps: null,
    n_frames: null,
    duration: null,
}

export const fetchVideo = async (videoId: number) => {
    const API_URL = API_BASE.VIDEO_UPLOAD + '/' + videoId + '/'
    const response = await axios.get(API_URL)
    .then((response) => {
        return response;
    })
    .then((data) => {})
    .catch(err => {});
    return response
}

export const postOutputVideoData = createAsyncThunk(
    'campaign/postOutputVideoData',
    // async (data: CampaignInputState) => {
    async (data: FormData) => {
        const API_URL = API_BASE.VIDEO_UPLOAD
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

export const putOutputVideo = createAsyncThunk(
    'campaign/putOutputVideoData',
    async (props: {videoId: number, videoData: FormData}) => {
        const API_URL = API_BASE.VIDEO_UPLOAD + props.videoId + '/'   ///// 
        const response = await axios.put(API_URL,props.videoData,{
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

export const deleteOutputVideo = createAsyncThunk(
    'campaign/deleteOutputVideoData',
    async (props: {videoId: number}) => {
        const API_URL = API_BASE.VIDEO_UPLOAD + props.videoId + '/'   ///// 
        const response = await axios.delete(API_URL)
        .then((response) => {
            return response.data;
        })
        .catch(err => {});
        return response
    }
);


export const OutputVideoAttributes = createSlice({
    name: 'OutputVideoAttributes',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setOutputVideoData: (state, action: PayloadAction<CampaignVideoState>) => {
            state.video_id = action.payload.video_id
            state.video = action.payload.video
            state.width = action.payload.width
            state.height = action.payload.height
            state.side_rail_width.small = action.payload.side_rail_width.small
            state.side_rail_width.large = action.payload.side_rail_width.large
            state.side_rail_height.small = action.payload.side_rail_height.small
            state.side_rail_height.large = action.payload.side_rail_height.large
            state.thumbnail = action.payload.thumbnail
            state.fps = action.payload.fps
            state.n_frames = action.payload.n_frames
            state.duration = action.payload.duration
        }

    },
    extraReducers: (builder) => {
        builder
          .addCase(postOutputVideoData.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(postOutputVideoData.fulfilled, (state, action) => {
            state.status = 'idle';
            
            state.video_id = action.payload.video_id;
            state.video = action.payload.video;
            state.width = action.payload.width
            state.height = action.payload.height
            state.side_rail_width.small = action.payload.side_rail_width.small
            state.side_rail_width.large = action.payload.side_rail_width.large
            state.side_rail_height.small = action.payload.side_rail_height.small
            state.side_rail_height.large = action.payload.side_rail_height.large
            state.thumbnail = action.payload.thumbnail
            state.fps = action.payload.fps
            state.n_frames = action.payload.n_frames
            state.duration = action.payload.duration
          })
          .addCase(putOutputVideo.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(putOutputVideo.fulfilled, (state, action) => {
            state.status = 'idle';
            state.video_id = action.payload.video_id;
            state.video = action.payload.video;
            state.width = action.payload.width
            state.height = action.payload.height
            state.side_rail_width.small = action.payload.side_rail_width.small
            state.side_rail_width.large = action.payload.side_rail_width.large
            state.side_rail_height.small = action.payload.side_rail_height.small
            state.side_rail_height.large = action.payload.side_rail_height.large
            state.thumbnail = action.payload.thumbnail
            state.fps = action.payload.fps
            state.n_frames = action.payload.n_frames
            state.duration = action.payload.duration
          })
          .addCase(deleteOutputVideo.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(deleteOutputVideo.fulfilled, (state, action) => {
            state.status = 'idle';
            state.video_id = null;
            state.video = null;
            state.width = null
            state.height = null
            state.side_rail_width.small = null
            state.side_rail_width.large = null
            state.side_rail_height.small = null
            state.side_rail_height.large = null
            state.thumbnail =null
            state.fps = null
            state.n_frames = null
            state.duration = null
          })
      },
});

export const { setOutputVideoData } = OutputVideoAttributes.actions;


export const getOutputVideoDetails = (state: RootState) => state.outputVideo;

export default OutputVideoAttributes.reducer;