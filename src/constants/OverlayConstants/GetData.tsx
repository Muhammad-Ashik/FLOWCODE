import { CampaignInputState } from '../../Redux/Requests/CampaignInterfaces'
import { OverlayOutputState } from '../../Redux/Overlay/overlayAttributes'
import { CTAOutputState } from '../../Redux/Overlay/CallToActionAttributes'
import { FlowcodeState } from '../../Redux/Flowcode/FlowcodeActions'
import { FlowcodeUrlImgState } from '../../Redux/Flowcode/Flowcode'
import { PatternState } from '../../Redux/Flowcode/FlowcodePattern'
import { CampaignImageState } from  '../../Redux/Requests/CampaignInterfaces'
import { ColorState } from '../../Redux/Flowcode/FlowcodeColor'
import { ThemeState } from '../../Redux/Flowcode/FlowcodeTheme'
import { SetFlowcodeApi } from '../UploadConstants/SetFlowCode'


export const getCampaignToUpload = (id: number | null, campaignDetails: CampaignInputState) => {
    return {
        campaignId: id,
        campaignData: {
            name: campaignDetails.name,
            video: campaignDetails.video,
            image: campaignDetails.image,
            flowcode: campaignDetails.flowcode,
            overlay: campaignDetails.overlay,
            cta: campaignDetails.cta,
            output_video: campaignDetails.output_video
          }
    }
}

export const getOverlayToUpload = (overlay: OverlayOutputState) => {
    return {
        overlayId: overlay.overlay_id,
        overlayData: {
          name: overlay.name,
          size: overlay.size,
          start: overlay.start,
          duration: overlay.duration,
          template: overlay.template?overlay.template:1
        }
      }
}

export const getCtaToUpload = (cta: CTAOutputState) => {
    return {
        ctaId: cta.cta_id,
        ctaData: {
          text: cta.text,
          text_color: cta.text_color,
          background_color: cta.background_color
        }
      }
}

export const getFlowcodeToUpload = (flowcode:FlowcodeUrlImgState, flowcodeResponse: FlowcodeState, 
    flowPattern: PatternState, flowcodeCenterImage:CampaignImageState, flowColor: ColorState,
    flowTheme: ThemeState, flowcodeImageUpload: CampaignImageState) => {
        return {
            flowcodeId: flowcodeResponse.flowcode_id,
            flowcodeData: {
                url: SetFlowcodeApi(flowcode, flowcodeResponse, flowPattern, flowcodeCenterImage, flowColor, flowTheme),
                url_or_code: flowcodeResponse.url_or_code,
                pattern: flowPattern.value,
                color: flowColor.name,
                theme: flowTheme.name,
                flowcode_image: flowcodeImageUpload.image_id,
                flowcode_center_image: flowcodeCenterImage.image,
                created_with: flowcodeResponse.created_with
              }
          }
}