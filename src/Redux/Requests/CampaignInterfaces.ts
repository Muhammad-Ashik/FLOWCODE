
export interface CampaignInputState {
    name: string | null;
    video: number | null;
    image: number | null;
    flowcode: number | null;
    overlay: number | null;
    cta: number | null;
    output_video: number | null;
  }

export interface CampaignNameState {
    name: string;
  }

export interface CampaignIdState {
    campaign_id: number;
  }

export interface CampaignFlowcodeIdState {
    flowcode: number | null;
  }


export interface CampaignOverlayIdState {
    overlay: number | null;
  }

export interface CampaignVideoIdState {
    video: number | null;
  }


export interface CampaignImageIdState {
    image: number | null;
  }


export interface CampaignCtaIdState {
    cta: number | null;
  }


export interface CampaignVideoState {
    status: 'idle' | 'loading' | 'failed';
    video_id: number | null;
    video: string | null;
    width: number | null;
    height: number | null;
    side_rail_width: {
      small: number | null;
      large: number | null;
    };
    side_rail_height: {
      small: number | null;
      large: number | null;
    };
    thumbnail: string | null;
    fps: number | null;
    duration: number | null;
    n_frames: number | null;
}

export interface CampaignImageState {
  status: 'idle' | 'loading' | 'failed';
    image_id: number | null;
    image: string | null;
    width: number | null;
    height: number | null;
}

export interface CampaignFlowcodeState {
    flowcode_id: number | null;
    url: string | null;
    pattern: string | null;
    color: string | null;
    theme: string | null;
    flowcode_image: string | null;
    flowcode_center_image: string | null;
}

export interface CampaignOverlayState {
    overlay_id: number | null;
    name: string | null;
    size: string | null;
    start: string | null;
    duration: string | null;
    template: string | null;
}

export interface CampaignState {
    campaign_id: number | null;
    name: string | null;
    video: number | null;
    image: number | null;
    flowcode: number | null;
    overlay: number | null;
    cta: number | null;
    output_video: number | null;
    task: string | null;
  }

export interface StandardCampaign {
    campaign_id: number | null;
    name: string | null;
    video: {
        video_id: number | null;
        video: string | null;
    };
    image: {
        image_id: number | null;
        image: string | null;
    };
    flowcode:  {
        flowcode_id: number | null;
        url: string | null;
        pattern: string | null;
        color: string | null;
        theme: string | null;
        flowcode_image: string | null;
        flowcode_center_image: string | null;
    };
    overlay:  {
        overlay_id: number | null;
        name: string | null;
        size: string | null;
        start: number | null;
        duration: number | null;
        template: number | null;
    };
    cta: {
        cta_id: number | null;
        text: string | null;
        text_color: string | null;
        background_color: string | null;
    };
    output_video: {
        video_id: number | null;
        video: string | null;
    };
}