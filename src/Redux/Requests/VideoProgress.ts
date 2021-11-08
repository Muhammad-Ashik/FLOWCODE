import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios'
// import { Flowcode, FLOWCODE_PATTERN } from "./FlowcodeActions";
import { API_BASE } from '../../features/Flowcode/constants'


export interface VideoProgressRequest {
    status: string | 'idle' | 'loading' | 'failed';
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

export const getVideoProgressData: any = createAsyncThunk(
    'getVideoProgressData',
    async (task: string, thunkApi) => {
        let stData: any = thunkApi.getState()

        if(stData && stData.campaignOutput && stData.campaignOutput.status === 'loading'){  // && stData.videoProgress.status==='loading'
            let current = parseInt(stData.videoProgress.progress.current)
            
            if(current < 99){
                let data = {
                    status: 'loading',
                    state: "PENDING",
                    complete: false,
                    success: false,
                    progress: {
                        pending: true,
                        current: current + 1,
                        total: 100,
                        percent: current + 1
                    }
                }
                setTimeout(() => {
                    thunkApi.dispatch(setVideoProgress(data))
                }, 1000);
                return thunkApi.dispatch(getVideoProgressData(''))
            } else{
                return stData.videoProgress
            }
        }

        else{
            let data = {
                status: 'idle',
                state: "SUCCESS",
                complete: true,
                success: true,
                progress: {
                    pending: false,
                    current: parseInt(stData.videoProgress.progress.current),
                    total: 100,
                    percent: parseInt(stData.videoProgress.progress.current)
                }
            }
            
            return thunkApi.dispatch(setVideoProgress(data))
        }

        
        
        // const response = await axios.get(API_URL)
        // .then((response) => {
        //     if (!response.data.complete && !response.data?.progess?.pending) {
        //         thunkApi.dispatch(setVideoProgress(response.data))
        //         return thunkApi.dispatch(getVideoProgressData(task))
        //     }
        //     return response.data;
        // })
        // .catch(err => {});
        // return response
    }
);


export const VideoProgressAttributes = createSlice({
    name: 'VideoProgressAttributes',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setVideoProgress: (state, action: PayloadAction<VideoProgressRequest>) => {
            state.state = action.payload.state
            state.complete = action.payload.complete
            state.success = action.payload.success
            state.progress.pending = action.payload.progress.pending
            state.progress.current = action.payload.progress.current
            state.progress.total = action.payload.progress.total
            state.progress.percent = action.payload.progress.percent
        },
        setVideoProgressToNull: (state, action) => {
            state.status = 'idle'
            state.state = ''
            state.complete = false
            state.success = false
            state.progress.pending = false
            state.progress.current = 0
            state.progress.total = 100
            state.progress.percent = 0
        }

    },
    extraReducers: (builder) => {
        builder
          .addCase(getVideoProgressData.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(getVideoProgressData.fulfilled, (state, action) => {
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

export const { setVideoProgress, setVideoProgressToNull } = VideoProgressAttributes.actions;


export const videoProgress = (state: RootState) => state.videoProgress;

export default VideoProgressAttributes.reducer;