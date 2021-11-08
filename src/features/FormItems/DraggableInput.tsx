import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Upload, Image, message, notification, Spin, Typography } from 'antd';
import { DraggableInputUpload } from './InputTypes';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { setVideoId, setOutputVideoId } from '../../Redux/Requests/CampaignRequests'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { putVideo, postVideoData, getInputVideoDetails, deleteVideo } from '../../Redux/Requests/VideoRequests'
import { postOutputVideoData, putOutputVideo, getOutputVideoDetails, deleteOutputVideo } from '../../Redux/Requests/OutputVideoRequests'
import { render } from '@testing-library/react';
import ReactPlayer from 'react-player';
import { MEDIA_BASE_URL } from '../Flowcode/constants'
import { setMessage } from '../../Redux/Overlay/messages'
import { getRailmageDetails } from '../../Redux/Requests/ImageRequests'
import { selectOverlay } from '../../Redux/Overlay/overlayAttributes'


const { Dragger } = Upload;


function DraggableInput(props: DraggableInputUpload) {
    const dispatch = useAppDispatch()
    
    
    const videoId = useAppSelector(getInputVideoDetails)
    const outputVideo = useAppSelector(getOutputVideoDetails)
    const [preview, setpreview] = useState('')
    const [spinner, setspinner] = useState(false)
    const railImage = useAppSelector(getRailmageDetails);
    const overlay = useAppSelector(selectOverlay);

    const [filename, setfilename] = useState('')

    useEffect(() => {
        if(videoId.video_id && videoId.video_id!==null && videoId.status === 'idle'){
            let data = {
                video: videoId.video_id
            }
            dispatch(setVideoId(data))
            setspinner(false)
            if(videoId.video) setfilename(videoId.video.slice(14))
            
        }
        
    }, [videoId])

    useEffect(() => {
        if(outputVideo.video_id  && outputVideo.video_id!==null && outputVideo.status === 'idle'){
            let data = {
                video: outputVideo.video_id
            }
            dispatch(setOutputVideoId(data))
        }
        
    }, [outputVideo])


    const createVideo = (data: Blob) => {
        // createCampaign();
        
        let formVideoData = new FormData();
        formVideoData.append("video",  data)
        setspinner(true)
        if(videoId.video_id  && videoId.video_id!==null && videoId.status === 'idle') {            
            let videoData = {
                videoId: videoId.video_id,
                videoData: formVideoData
            }
            dispatch(putVideo(videoData))
        } else if(videoId.status === 'idle'){
            dispatch(postVideoData(formVideoData))
        }

        if(outputVideo.video_id && outputVideo.video_id!==null && outputVideo.status === 'idle') {            
            let videoData = {
                videoId: outputVideo.video_id,
                videoData: formVideoData
            }
            dispatch(putOutputVideo(videoData))
        } else if( outputVideo.status === 'idle'){
            dispatch(postOutputVideoData(formVideoData))
        }
    }

    const getBase64 = (file: Blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setpreview(reader.result?reader.result.toString():'')
                resolve(reader.result);
            }
            reader.onerror = error => reject(error);
          });
    }

    const handlePreview = async (file: Blob) => {
        await getBase64(file);
    }

    const errorMessage = () => {
        notification['error']({
            message: 'Wrong File Type',
            description:
              'Please Upload a valid video file',
          });
      };

    const validateUpload = (file: File) => {
        console.log(file);
        
        let ext = file.name?file.name.split('.').pop():'';
        let allowedExts = ['flv', 'FLV', 'f4v', 'F4V']
        
        if(file.type.slice(0,5) !== 'video' && !allowedExts.includes(ext?ext.toString():'')){
            message.error({
                content: `${file.name} is not a video file. Please upload a valid video file`,
                duration: 4
            });
            return Upload.LIST_IGNORE
        }
        return true
    }

    
    const onChange = async (info: UploadChangeParam) => {
        let ext = info.file.name?info.file.name.split('.').pop():'';
        let allowedExts = ['flv', 'FLV', 'f4v', 'F4V']      
        if(info.file && (info.file.type?.slice(0,5) === 'video' || allowedExts.includes(ext?ext.toString():''))){
            let pos = info.fileList.length
            if(pos > 0){
                
                createVideo(info.fileList[pos - 1].originFileObj as Blob)
                info.file.status = 'done'
            }
        }
        if(info.file.status === 'error' || info.file.error) info.file.status = 'done'
    }

    const fileRemoveHandler = () => {
        if(videoId.video_id){
            let data = {
                videoId: videoId.video_id
            }
            dispatch(deleteVideo(data))
        }
        if(outputVideo.video_id){
            let data = {
                videoId: outputVideo.video_id
            }
            dispatch(deleteOutputVideo(data))
        }
        dispatch(setVideoId({video: null}))
        dispatch(setOutputVideoId({video: null}))
        
    }


    const {title, titleSize, name, required, requiredMessage, dragIcon, uploadText, uploadHint} = props
    return (
        <div>
            <Row>
                <Col span={titleSize}>{title} </Col>
                <Col span={24-titleSize}></Col>
            </Row>
            
            <Form.Item name={name} rules={[{ required: required, message: requiredMessage }]}>
                 <Dragger multiple={false} onChange={onChange} beforeUpload={validateUpload}
                 maxCount={1} showUploadList={false}
                 onRemove={() => false}
                 > 
                    
                    {(videoId.video && videoId.thumbnail && !spinner)?
                    <div>
                        <Image
                        src={MEDIA_BASE_URL + videoId.thumbnail} preview={false}
                        />
                        <Typography.Text style={{maxWidth: '25vh'}} ellipsis={true}>
                            {filename !== ''? filename:null}
                        </Typography.Text>
                    </div>
                    :
                    ((spinner)? <Spin></Spin>:
                    <>
                        {dragIcon && <p className="ant-upload-drag-icon"> {dragIcon} </p>}
                        <p className="ant-upload-text">{uploadText}</p>
                        {uploadHint && <p className="ant-upload-hint">{uploadHint}</p>}
                    </>)
                    }
                </Dragger>
                {/* <Button onClick={createVideo}> Upload </Button> */}
            </Form.Item>
        </div>
    )
}

export default DraggableInput
