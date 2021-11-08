import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios'
import { API_BASE } from '../../features/Flowcode/constants'
import { StandardCampaign } from './CampaignInterfaces'


const initialState: StandardCampaign[] = []


export const fetchAllCampaigns = createAsyncThunk(
    'fetchAllCampaignResp',
    async () => {
        const API_URL = API_BASE.GET_OUTPUT_VIDEO

        const response = await axios.get(API_URL)
            .then((response) => {
                return response.data;
            })
            .catch(err => {});
            return response
    }
);


export const AllCampaignAttributes = createSlice({
    name: 'AllCampaignAttributes',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setAllCampaign: (state, action: PayloadAction<StandardCampaign[]>) => {
            state = [...state, ...action.payload]
        },
        setAllCampaignToNull: (state) => {
            state = []
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchAllCampaigns.pending, (state) => {
          })
          .addCase(fetchAllCampaigns.fulfilled, (state, action) => {            
            if(action.payload){
                state = [...state, ...action.payload]
            }
            
          })
          
      },
});

export const { setAllCampaign } = AllCampaignAttributes.actions;


export const getAllCampaigns = (state: RootState) => state.AllCampaignAttributes;

export default AllCampaignAttributes.reducer;