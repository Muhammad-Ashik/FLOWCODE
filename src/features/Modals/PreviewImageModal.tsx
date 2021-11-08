import React, { useEffect, useState } from 'react'
import { Image, Modal, Spin } from 'antd';
import { getCampaignOtput, fetchCampaign } from '../../Redux/Requests/GetCampaignRequests';
import { putCampaign, getCampaignDetails, setCtaId, setFlowcodeId, setOverlayId } from '../../Redux/Requests/CampaignRequests';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { LoadingOutlined } from '@ant-design/icons';
import { MEDIA_BASE_URL } from '../Flowcode/constants'



const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function PreviewImageModal(props: {open: boolean}) {
    const { open } = props
    const dispatch = useAppDispatch();
    const [isModalVisible, setIsModalVisible] = useState(open);
    const campaignDetails = useAppSelector(getCampaignDetails);
    const [spinner, setspinner] = useState(true)
    const outputVideoDetails = useAppSelector(getCampaignOtput)
    const [preview_img, setpreview_img] = useState('')

    // useEffect(() => {
    //     getOutputVideo()
    // }, [campaignDetails.campaign_id])

    useEffect(() => {
        if(outputVideoDetails.preview_url!==null && outputVideoDetails.preview_url!== ''){
            setpreview_img(outputVideoDetails.preview_url)
            setspinner(false)
        }
    }, [outputVideoDetails.preview_url])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const getOutputVideo = () => {
        if (campaignDetails.campaign_id) {
          let value={
            campaignId: campaignDetails.campaign_id,
            preview: true
          }
          dispatch(fetchCampaign(value));
          setspinner(true)
        }
      };

    
    return (
        <Modal title="Preview Output " visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                {spinner && <Spin indicator={antIcon} /> }
                {preview_img!=='' && <Image src={MEDIA_BASE_URL + preview_img} />}
        </Modal>
    )
}

export default PreviewImageModal
