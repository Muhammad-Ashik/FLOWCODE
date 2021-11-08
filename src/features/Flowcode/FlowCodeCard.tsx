import React, { useEffect, useState } from 'react';
import { Card, Space, Typography, Row, Col, Button, Modal, Spin,
  notification, Image } from 'antd';
import { putOverlay, selectOverlay } from '../../Redux/Overlay/overlayAttributes';
import { putCTA, selectCta } from '../../Redux/Overlay/CallToActionAttributes';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import SetAppearance from '../FormItems/SetAppearance';
import { selectPattern } from '../../Redux/Flowcode/FlowcodePattern';
import { selectColor } from '../../Redux/Flowcode/FlowcodeColor';
import { selectTheme } from '../../Redux/Flowcode/FlowcodeTheme';
import { getFlowcode } from '../../Redux/Flowcode/Flowcode';
import { getFlowcodeDetails, putFlowcode } from '../../Redux/Flowcode/FlowcodeActions';
import { putCampaign, getCampaignDetails, setCtaId, setFlowcodeId, setOverlayId } from '../../Redux/Requests/CampaignRequests';
import { getCampaignOtputVideo, fetchCampaign, getCampaignOtput } from '../../Redux/Requests/GetCampaignRequests';
import { MEDIA_BASE_URL, cardHeaderStyle } from './constants';
import fileDownload from 'js-file-download';
import Axios from 'axios';
import { getFlowcodeCenterImageDetails } from '../../Redux/Flowcode/FlowcodeCenterImage'
import { getFlowcodeUploadImageDetails } from '../../Redux/Flowcode/FlowcodeUploadImage'
import { LoadingOutlined } from '@ant-design/icons';
import ShowProgress from '../FormItems/ShowProgress';
import { getMessage } from '../../Redux/Overlay/messages'
import { returnError } from '../../constants/validations/SubmissionValidation'
import { getCampaignToUpload, getOverlayToUpload, getCtaToUpload, getFlowcodeToUpload } from '../../constants/OverlayConstants/GetData'


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Text } = Typography;
function FlowCodeCard() {
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const outputVideo = useAppSelector(getCampaignOtputVideo);
  const errorMessage = useAppSelector(getMessage)

  const [previewImageOpen, setpreviewImageOpen] = useState(false)
  const [previewSpinner, setpreviewSpinner] = useState(true)
  const [preview_img, setpreview_img] = useState('')
  const outputVideoDetails = useAppSelector(getCampaignOtput)
  const [previewClicked, setpreviewClicked] = useState(false)

  useEffect(() => {
    if(outputVideoDetails.preview_url!==null && outputVideoDetails.preview_url!== '' && outputVideoDetails.status === 'idle'){
        setpreview_img(outputVideoDetails.preview_url)
    }
  }, [outputVideoDetails.preview_url, outputVideoDetails.status])

  const basicValidation = () => {
    let error = returnError(campaignDetails, flowcodeResponse)
    if(!error){
      return true;
    } else{
      notification['error'](error);
      return false
    }
  }

    const showPreviewModal = () => {
      let valid = basicValidation()
      if(valid === true) {
        if(outputVideoDetails.status === 'idle'){
          uploadAll();
          setpreviewClicked(true);
        }
        setpreviewImageOpen(true)
        setpreviewSpinner(true);
      }
    }

    const [previewVideoOpen, setpreviewVideoOpen] = useState(false)
    const [previewVideoSpinner, setpreviewVideoSpinner] = useState(true)

    const showPreviewVideoModal = () => {
      let valid = basicValidation()
      if(valid === true) {
        if(outputVideoDetails.status === 'idle'){
          uploadAll();
          setpreviewClicked(true);
        }
        setpreviewVideoOpen(true)
        setpreviewVideoSpinner(true);
        setpreviewImageOpen(false)
      }
      
    }


    const showDownloadModal = () => {
      let valid = basicValidation()
      if(valid === true){
        if(outputVideoDetails.status === 'idle'){
          uploadAll();
          setpreviewClicked(true);
        }
        setIsModalVisible(true);
        setpreviewVideoSpinner(true);
      }
    }

  const handleCancel = () => {
    setIsModalVisible(false);
    setdownloadClicked(false);
    setpreviewClicked(false);
    setpreviewVideoSpinner(false);
  };

  const [state, setstate] = useState({ cta: false, flow: false, over: false });
  const [downloadClicked, setdownloadClicked] = useState(false)

  const campaignDetails = useAppSelector(getCampaignDetails);

  const overlay = useAppSelector(selectOverlay);
  const cta = useAppSelector(selectCta);
  const flowPattern = useAppSelector(selectPattern);
  const flowColor = useAppSelector(selectColor);
  const flowTheme = useAppSelector(selectTheme);
  const flowcode = useAppSelector(getFlowcode);
  const flowcodeCenterImage = useAppSelector(getFlowcodeCenterImageDetails);
  const flowcodeImageUpload = useAppSelector(getFlowcodeUploadImageDetails);
  const [file_name_download, setfile_name_download] = useState('Output Video');

  const flowcodeResponse = useAppSelector(getFlowcodeDetails);

  useEffect(() => {
    if (outputVideo.video) {
      if(downloadClicked) download(MEDIA_BASE_URL + outputVideo.video, file_name_download)
    }
  }, [outputVideo]);

  useEffect(() => {
    if (flowcodeResponse.flowcode_id) {
      dispatch(setFlowcodeId({flowcode: flowcodeResponse.flowcode_id}));
      setstate({ ...state, flow: true });
    }
    if (cta.cta_id) {
      dispatch(setCtaId({cta: cta.cta_id}));
      setstate({ ...state, cta: true });
    }
    if (overlay.overlay_id) {
      dispatch(setOverlayId({overlay: overlay.overlay_id}));
      setstate({ ...state, over: true });
    }
  }, [flowcodeResponse, cta, overlay]);

  useEffect(() => {
    if (campaignDetails.campaign_id===null) createCampaign();
    if (campaignDetails.campaign_id && overlay.status === 'idle' && 
    cta.status ==='idle' && flowcodeResponse.status === 'idle' && previewClicked 
    && outputVideoDetails.status === 'idle') {
      if(previewImageOpen){
        getOutputVideo(true);
        setpreviewSpinner(true)
        setpreview_img('')
      } 
      else if(previewVideoOpen || previewVideoSpinner){
        getOutputVideo(false);
      }
      
      if(campaignDetails.name) setfile_name_download(campaignDetails.name+'.mp4')
      setpreviewClicked(false)
    } else if(campaignDetails.campaign_id && overlay.status === 'idle' && 
    cta.status ==='idle' && flowcodeResponse.status === 'idle' && !previewClicked 
    && outputVideoDetails.status === 'idle'){
      if(outputVideoDetails.preview_url) setpreview_img(outputVideoDetails.preview_url)
      setpreviewSpinner(false)
    }
  }, [campaignDetails, overlay.status, cta.status, flowcodeResponse.status, outputVideoDetails.status]);

  const createCampaign = () => {
    if (
      campaignDetails.flowcode &&
      campaignDetails.overlay &&
      campaignDetails.cta
    ) {
      let processedCampaign = getCampaignToUpload(campaignDetails.campaign_id,campaignDetails)
      dispatch(putCampaign(processedCampaign));
    }
  };

  const uploadOverlay = () => {
    let dataInput = getOverlayToUpload(overlay)
    dispatch(putOverlay(dataInput));
  };

  const uploadCta = () => {
    let dataInput = getCtaToUpload(cta)
    dispatch(putCTA(dataInput));
  };

  const uploadFlowcode = () => {
    let data = getFlowcodeToUpload(flowcode, flowcodeResponse, flowPattern, 
      flowcodeCenterImage, flowColor, flowTheme, flowcodeImageUpload)
    dispatch(putFlowcode(data));
  };

  const uploadAll = () => {
    uploadOverlay();
    uploadCta();
    uploadFlowcode();
  };

  const getOutputVideo = (preview: boolean) => {
    if (campaignDetails.campaign_id && overlay.status === 'idle' && 
    cta.status ==='idle' && flowcodeResponse.status === 'idle' && previewClicked) {
      let value={
        campaignId: campaignDetails.campaign_id,
        preview: preview
      }
      dispatch(fetchCampaign(value));
    }
  };

  const download = async (url: string, filename: string) => {
      await Axios.get(url, {
      responseType: 'blob',
    }).then(res => {
      fileDownload(res.data, filename);
    });
  }

  return (
    <div>
      <Card
        title='Step 3: Download your video.'
        headStyle={cardHeaderStyle}
        style={{ width: '100%', fontSize: '14px' }}
      >
        <Space direction='vertical'>
          <SetAppearance />

          <Text type='secondary'> Clicking download will start video rendering and after that you can
            download it.
          </Text>

          <Row>
            <Col span={11}>
              <Button onClick={showPreviewModal} style={{ width: '100%' }}>
                Show Preview 
              </Button>
            </Col>
            <Col span={1}></Col>
            <Col span={11}>
              <Button onClick={showDownloadModal} type='primary' style={{ width: '100%' }}>
                Download Video
              </Button>
            </Col>
          </Row>
        </Space>
      </Card>

      <Modal title="Preview Output " visible={previewImageOpen || previewVideoOpen}  okText={null}
      onCancel={() => { setpreviewImageOpen(false); setpreviewVideoOpen(false); setpreviewClicked(false); 
        setpreviewSpinner(false); }}
        footer={[
          <Button onClick={() => {setpreviewImageOpen(false); setpreviewVideoOpen(false); setpreviewClicked(false); 
            setpreviewSpinner(false); }}>Close</Button>
        ]}
      destroyOnClose={true} width={948} >
        {
          !previewVideoOpen? 
          <>
          <Space direction='vertical' size='large' style={{ width: '100%', textAlign: 'center' }}>
            {errorMessage.message!=='' && <Text type='danger'>{errorMessage.message}</Text>}     
            {(preview_img!=='' && previewImageOpen && !previewSpinner)? 
            <Space direction='vertical'>
              <Button type='primary' onClick={showPreviewVideoModal}>Show Video Preview</Button>
              <Image src={MEDIA_BASE_URL + preview_img} />
            </Space>:
            <> Generating Preview Image <Spin indicator={antIcon} /></>}
          </Space>
          </>
          :
          <>
            <Space direction='vertical' size='large' style={{ width: '100%', textAlign: 'center' }}>
              <Button type='primary' 
              onClick={() => {
                setpreviewImageOpen(true); setpreviewVideoOpen(false); }}>Show Image Preview</Button>
              <ShowProgress download={false} />
            </Space>
          </>
        }
      </Modal>

      <Modal title="Download Video " visible={isModalVisible}  okText={null} onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel}>Close</Button>
        ]} >
        <ShowProgress download={true} />
      </Modal>
    </div>
  );
}

export default FlowCodeCard;