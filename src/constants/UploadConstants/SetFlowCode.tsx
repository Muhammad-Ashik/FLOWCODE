import { FLOWCODE_BASE_URL, MEDIA_BASE_URL } from "../../features/Flowcode/constants";
import { FlowcodeState } from '../../Redux/Flowcode/FlowcodeActions'
import { FlowcodeUrlImgState } from '../../Redux/Flowcode/Flowcode'
import { PatternState } from '../../Redux/Flowcode/FlowcodePattern'
import { CampaignImageState } from  '../../Redux/Requests/CampaignInterfaces'
import { ColorState } from '../../Redux/Flowcode/FlowcodeColor'
import { ThemeState } from '../../Redux/Flowcode/FlowcodeTheme'


export const SetFlowcodeApi = (flowcode:FlowcodeUrlImgState, flowcodeResponse: FlowcodeState, 
    flowPattern: PatternState, flowcodeCenterImage:CampaignImageState, flowColor: ColorState,
    flowTheme: ThemeState) => {
    const API_BASE = FLOWCODE_BASE_URL + '&data=';
    let API_URL = API_BASE
    if(flowcode.url && flowcodeResponse.created_with === 'S'){
        API_URL = API_URL + flowcode.url + '&style=inset';
      }
      else if(flowcode.url && (flowcode.url).toString().length > 5 && flowcodeResponse.created_with === 'G'){
        API_URL = API_URL + encodeURIComponent('https://' + flowcode.url)
      } else{
        API_URL = API_URL + encodeURIComponent('https://www.ixorasolution.com')
      }
      
      if (flowPattern) {
        
        API_URL = API_URL + '&studio_config_id=' + flowPattern.value;
        if(flowPattern.isStyle === true){
          API_URL = API_URL + '&style=inset';
        }
      }
      if (flowPattern.hasColor && flowColor) {
        if (flowTheme && flowTheme.value % 2 === 0) {
          API_URL = API_URL + '&fgColor=white&bgColor=' + encodeURIComponent(flowTheme.code);
        } else {
          API_URL = API_URL + '&fgColor=' + encodeURIComponent(flowTheme.code);
        }
      }
      if(flowcodeCenterImage) {
        if(flowcodeCenterImage.image_id){
          API_URL = API_URL + '&logoImageUrl=' + MEDIA_BASE_URL + flowcodeCenterImage.image + '&logoWidth=20&logoHeight=20';
        }
      }
      
      return API_URL;
}