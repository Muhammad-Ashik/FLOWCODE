import { CampaignState } from '../../Redux/Requests/CampaignInterfaces'
import { FlowcodeState } from '../../Redux/Flowcode/FlowcodeActions'


export const urlValidation = (value: string) => {
    let expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    let regex = new RegExp(expression);
    return regex.test(value)

  }

export const returnError = (campaignDetails: CampaignState, flowcodeResponse: FlowcodeState) => {
    if(campaignDetails.name ===''){
        return {
            message: 'Invalid Campaign Name',
            description:
              `Please input a valid campaign name.`,
            style: {marginLeft: '-100%', border: '1px solid red'},
            duration: 0
          }
      } else if(campaignDetails.video === null){
        return {
            message: 'Video Missing',
            description:
              `No video has been uploaded.`,
            style: {marginLeft: '-100%', border: '1px solid red'},
            duration: 0
          }
      } else if(campaignDetails.image === null){
        return {
            message: 'Side rail image missing',
            description:
              `No rail image has been uploaded.`,
            style: {marginLeft: '-100%', border: '1px solid red'},
            duration: 0
          }
      } else if(flowcodeResponse.created_with === 'G' && flowcodeResponse.url_or_code === ''){
        return {
            message: 'Flowcode missing',
            description:
              `No flowcode has been added.`,
            style: {marginLeft: '-100%', border: '1px solid red'},
            duration: 0
          }
      } else if(flowcodeResponse.created_with === 'S' && flowcodeResponse.url_or_code === ''){
        return {
            message: 'Flowcode missing',
            description:
              `No flowcode has been added.`,
            style: {marginLeft: '-100%', border: '1px solid red'},
            duration: 0
          }
      } else if(flowcodeResponse.created_with === 'I' && (flowcodeResponse.flowcode_image === null || flowcodeResponse.flowcode_image === '')){
        return {
            message: 'Flowcode missing',
            description:
              `No flowcode has been added.`,
            style: {marginLeft: '-100%', border: '1px solid red'},
            duration: 0
          }
      } else if(flowcodeResponse.created_with === 'G' && flowcodeResponse.url_or_code && !urlValidation(flowcodeResponse.url_or_code)){
        return {
            message: 'Flowcode url error',
            description:
              `Not a valid website url. Please use 'www.' at the beginning and check the rest.`,
            style: {marginLeft: '-100%', border: '1px solid red'},
            duration: 0
        }
      }
    return false
}