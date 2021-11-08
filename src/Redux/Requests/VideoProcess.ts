import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import axios from 'axios'
// import { Flowcode, FLOWCODE_PATTERN } from "./FlowcodeActions";
import { API_BASE } from '../../features/Flowcode/constants'
import { ThunkMiddlewareFor } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { useAppDispatch } from '../../app/hooks';


export interface VideoProgressRequest {
    status: 'idle' | 'loading' | 'failed';
    state: string | null;
    complete: boolean | null;
    success: boolean | null;
    progress: {
        pending: boolean;
        current: number | string | null;
        total: number | string | null;
        percent: number | string | null;
    };
    result?: string | null;
}

const initialState: VideoProgressRequest = {
    status: 'idle',
    state: '',
    complete: false,
    success: false,
    progress: {
        pending: true,
        current: 0,
        total: 100,
        percent: 0
    }
}
// const dispatch = useAppDispatch();

export const getVideoProcessData: any = createAsyncThunk(
    'getVideoProcessData',
    async (task: string, thunkApi) => {
        const API_URL = API_BASE.GET_VIDEO_PROGRESS + task
        
        const response = await axios.get(API_URL)
        .then((response) => {
            
            if (!response.data.complete && !response.data?.progess?.pending) {
                thunkApi.dispatch(setVideoProcess(response.data))
                return thunkApi.dispatch(getVideoProcessData(task))
            }
            return response.data;
        })
        .catch(err => {});
        
        return response
    }
);


export const VideoProcessAttributes = createSlice({
    name: 'VideoProcessAttributes',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setVideoProcess: (state, action: PayloadAction<VideoProgressRequest>) => {
            
            state.state = action.payload.state
            state.complete = action.payload.complete
            state.success = action.payload.success
            state.progress.pending = action.payload.progress.pending
            state.progress.current = action.payload.progress.current
            state.progress.total = action.payload.progress.total
            state.progress.percent = action.payload.progress.percent
        }

    },
    extraReducers: (builder) => {
        builder
          .addCase(getVideoProcessData.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getVideoProcessData.fulfilled, (state, action) => {
            state.status = 'idle';
            
            state.state = action.payload.state
            state.complete = action.payload.complete
            state.success = action.payload.success
            if(action.payload.progress){
                state.progress.pending = action.payload.progress.pending
                state.progress.current = action.payload.progress.current
                state.progress.total = action.payload.progress.total
                state.progress.percent = action.payload.progress.percent
            }
            
            if(action.payload.result) state.result = action.payload.result
          })
          
      },
});

export const { setVideoProcess } = VideoProcessAttributes.actions;


export const videoProcess = (state: RootState) => state.videoProcessing;

export default VideoProcessAttributes.reducer;