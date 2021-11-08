import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import patternReducer from '../Redux/Flowcode/FlowcodePattern';
import colorReducer from '../Redux/Flowcode/FlowcodeColor';
import themeReducer from '../Redux/Flowcode/FlowcodeTheme';
import flowCode from '../Redux/Flowcode/Flowcode';
import overlayAttributes from '../Redux/Overlay/overlayAttributes';
import CampaignAttributes from '../Redux/Requests/CampaignRequests';
import VideoAttributes from '../Redux/Requests/VideoRequests'
import ImageAttributes from '../Redux/Requests/ImageRequests'
import CtaAttributes from '../Redux/Overlay/CallToActionAttributes';
import FlowcodeAttributes from '../Redux/Flowcode/FlowcodeActions';
import OutputVideoAttributes from '../Redux/Requests/OutputVideoRequests'
import CampaignOutputVideoAttributes from '../Redux/Requests/GetCampaignRequests'
import FlowcodeCenterImageAttributes from '../Redux/Flowcode/FlowcodeCenterImage'
import FlowcodeUploadImageAttributes from '../Redux/Flowcode/FlowcodeUploadImage'
import VideoProgressAttributes from '../Redux/Requests/VideoProgress'
import VideoProcessAttributes from '../Redux/Requests/VideoProcess'
import FlowcodeStudioConfig from '../Redux/Flowcode/FlowcodeStudioConfig'
import AllCampaignAttributes from '../Redux/Requests/AllCampaigns'
import Messages from '../Redux/Overlay/messages'
import Spinner from '../Redux/Overlay/Spinner'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    flowcodePattern: patternReducer,
    flowcodeColor: colorReducer,
    flowcodeTheme: themeReducer,
    flowCode: flowCode,
    overlayAttributes: overlayAttributes,
    campaign: CampaignAttributes,
    inputVideo: VideoAttributes,
    railImage: ImageAttributes,
    cta: CtaAttributes,
    flowcodeResponse: FlowcodeAttributes,
    outputVideo: OutputVideoAttributes,
    campaignOutput: CampaignOutputVideoAttributes,
    flowcodeCenterImage: FlowcodeCenterImageAttributes,
    flowcodeUploadImage: FlowcodeUploadImageAttributes,
    videoProgress: VideoProgressAttributes,
    videoProcessing: VideoProcessAttributes,
    FlowcodeStudioConfig: FlowcodeStudioConfig,
    AllCampaignAttributes: AllCampaignAttributes,
    Messages: Messages,
    Spinner: Spinner
  },
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
