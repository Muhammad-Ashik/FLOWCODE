import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Upload, Button, Typography, notification, Image, message, Radio, RadioChangeEvent } from 'antd';
import { PaperClipOutlined, UploadOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { getRailmageDetails, deleteImageData, putImage, postImageData } from '../../Redux/Requests/ImageRequests';
import { setImageId } from '../../Redux/Requests/CampaignRequests';
import { getInputVideoDetails } from '../../Redux/Requests/VideoRequests'
import { selectOverlay } from '../../Redux/Overlay/overlayAttributes'
import { setCtaBackground, selectCta } from '../../Redux/Overlay/CallToActionAttributes';
import { MEDIA_BASE_URL } from '../Flowcode/constants';
import { setMessage } from '../../Redux/Overlay/messages';


const { Text } = Typography;

function SideRailImage() {
  const dispatch = useAppDispatch();
  const railImage = useAppSelector(getRailmageDetails);
  const inputVideo = useAppSelector(getInputVideoDetails);
  const overlay = useAppSelector(selectOverlay);
  const [width, setwidth] = useState(474)
  const [height, setheight] = useState(817)
  const [notificationOpen, setnotificationOpen] = useState(false)
  const [previewUrl, setpreviewUrl] = useState('')
  const [filename, setFilename] = useState('')
  const [transparentChecked, settransparentChecked] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const cta = useAppSelector(selectCta)
  const [value, setvalue] = useState(1)

  useEffect(() => {
    if(railImage.image) setpreviewUrl(MEDIA_BASE_URL+railImage.image)
  }, [railImage.image])

  useEffect(() => {
    if(cta.background_color === '#00000000'){
      setvalue(2)
    } else{
      setvalue(1)
    }
  }, [cta])


  useEffect(() => {
    if(overlay.size === 'Large'){
      setwidth(inputVideo.side_rail_width.large?inputVideo.side_rail_width.large:474)
      setheight(inputVideo.side_rail_height.large? inputVideo.side_rail_height.large:817)
      if(!transparentChecked) setErrorMessage()
      else setFullBackgroundErrorMessage()
      
    } else{
      setwidth(inputVideo.side_rail_width.small?inputVideo.side_rail_width.small:474)
      setheight(inputVideo.side_rail_height.small? inputVideo.side_rail_height.small:817)
      if(!transparentChecked) setErrorMessage()
      else setFullBackgroundErrorMessage()
      
    }
    
  }, [inputVideo, overlay.size])


    useEffect(() => {
        if(railImage.image_id && railImage.image_id !== null && railImage.status === 'idle'){
            let data = {
                image: railImage.image_id
            }
            dispatch(setImageId(data))
            if(!transparentChecked) setErrorMessage()
            else setFullBackgroundErrorMessage()
            
        }
        
    }, [railImage])

    const setErrorMessage = () => {
      if(overlay.size === 'Large'){
        let sWidth = inputVideo.side_rail_width.large
        let sHeight = inputVideo.side_rail_height.large
          setwidth(sWidth?sWidth:474)
          setheight(sHeight? sHeight:817)
          let msgLarge = `The size of side rail image is expected to 
          be ${sWidth} X ${sHeight} px. 
          But uploaded image size is ${railImage.width} X ${railImage.height} px. 
          Final video will be affected with the size mismatch.`
          if(inputVideo.video_id && railImage.image_id!==null && (railImage.height !== sHeight || railImage.width!==sWidth)){
              setnotificationOpen(true)
              openNotificationWithIcon(msgLarge)
              dispatch(setMessage({status: 'idle', message: msgLarge}))
          } else{
              dispatch(setMessage({status: 'idle', message: ''}))
          }
      } else{
        let sWidth = inputVideo.side_rail_width.small
        let sHeight = inputVideo.side_rail_height.small
          setwidth(sWidth?sWidth:474)
          setheight(sHeight? sHeight:817)
          let msgsmall = `The size of side rail image is expected to 
          be ${sWidth} X ${sHeight} px. 
          But uploaded image size is ${railImage.width} X ${railImage.height} px. 
          Final video will be affected with the size mismatch.`
          if(inputVideo.video_id && railImage.image_id!==null && (railImage.height !== sHeight || railImage.width!==sWidth)){
              setnotificationOpen(true)
              openNotificationWithIcon(msgsmall)
              dispatch(setMessage({status: 'idle', message: msgsmall}))
          } else{
              dispatch(setMessage({status: 'idle', message: ''}))
          }
      }
    }

    const setFullBackgroundErrorMessage = () => {
      if(overlay.size === 'Large'){
          setwidth(inputVideo.width?inputVideo.width:474)
          setheight(inputVideo.height? inputVideo.height:817)
          let msgLarge = `The size of side rail image is expected to 
          be ${inputVideo.width} X ${inputVideo.height} px. 
          But uploaded image size is ${railImage.width} X ${railImage.height} px. 
          Final video will be affected with the size mismatch.`
          if(inputVideo.video_id && railImage.image_id!==null && (railImage.height !== inputVideo.height || railImage.width!==inputVideo.width)){
              setnotificationOpen(true)
              openNotificationWithIcon(msgLarge)
              dispatch(setMessage({status: 'idle', message: msgLarge}))
          } else{
              dispatch(setMessage({status: 'idle', message: ''}))
          }
      } else{
          setwidth(inputVideo.width?inputVideo.width:474)
          setheight(inputVideo.height? inputVideo.height:817)
          let msgsmall = `The size of side rail image is expected to 
          be ${inputVideo.width} X ${inputVideo.height} px. 
          But uploaded image size is ${railImage.width} X ${railImage.height} px. 
          Final video will be affected with the size mismatch.`
          if(inputVideo.video_id && railImage.image_id!==null && (railImage.height !== inputVideo.height || railImage.width!==inputVideo.width)){
              setnotificationOpen(true)
              openNotificationWithIcon(msgsmall)
              dispatch(setMessage({status: 'idle', message: msgsmall}))
          } else{
              dispatch(setMessage({status: 'idle', message: ''}))
          }
      }
    }


  const createImage = async (data: Blob) => {
    let formImageData = new FormData();
    formImageData.append('image', data);
        if(railImage.image_id && railImage.image_id !== null && railImage.status === 'idle') {
            let image = {
                imageId: railImage.image_id,
                imageData: formImageData
            }
            dispatch(putImage(image))
        } else if(railImage.status === 'idle'){
            dispatch(postImageData(formImageData))
        }
    }

  

  const openNotificationWithIcon = (msg: string) => {
    if(notificationOpen){
      notification['error']({
        message: 'Image Size Mismatch',
        description: msg,
        style: {marginLeft: '-100%', border: '1px solid red'},
        duration: 0
      });
      
      // setnotificationOpen(false)
    }
  };

  const validateUpload = (file: File) => {
    if(file.type.slice(0,5) !== 'image'){
        message.error({
            content: `${file.name} is not a valid image file. Please upload a valid image file`,
            duration: 4
        });
        return Upload.LIST_IGNORE
    }
    return true
}


  const onChange = async (info: UploadChangeParam) => {
    
    if(info.fileList && info.fileList.length > 0) {
      createImage(info.fileList[info.fileList.length - 1].originFileObj as Blob);
      var reader = new FileReader();
      var url = reader.readAsDataURL(info.fileList[info.fileList.length - 1].originFileObj as Blob);

      reader.onloadend = (e) => setpreviewUrl(reader.result?reader.result.toString():'')
      setFilename(info.file? info.file.name: '')
      info.file.status = 'done'
    }
  };

  const onTransparentCheck = (e: RadioChangeEvent) => {
    setvalue(e.target.value)
    settransparentChecked(!transparentChecked)
    if(!transparentChecked){
      let value = {
        background_color: '#00000000'
      };
  
      dispatch(setCtaBackground(value));
      setFullBackgroundErrorMessage();
    } else{
      let value = {
        background_color: cta.background_color === '#00000000'?'#000000':cta.background_color
      };
  
      dispatch(setCtaBackground(value));
      setErrorMessage();
    }
  }

  const onSideRailCheck = () => {
    settransparentChecked(false)
    let value = {
      background_color: cta.background_color === '#00000000'?'#000000':cta.background_color
    };

    dispatch(setCtaBackground(value));
  }

  const fileRemoveHandler = () => {
    setpreviewUrl('')
    setFilename('')
    if(railImage.image_id) dispatch(deleteImageData(railImage.image_id))
    let data = {
      image: null
    }
    dispatch(setImageId(data))
  }

  
  return (
    <div>
      <Row>
        <Radio.Group onChange={(e) => onTransparentCheck(e)} value={value}>
          <Radio value={1}>Side Rail Image</Radio>
          <Radio value={2}>Full Background Overlay </Radio>
        </Radio.Group>
        {/* <Col span={8}><Checkbox onChange={onSideRailCheck}>Side Rail Image </Checkbox></Col>
        <Col span={4}></Col>
        <Col span={12}><Checkbox onChange={onTransparentCheck}>Full Background Overlay </Checkbox> </Col> */}
        
      </Row>
      <Row>
        {/* ////////////////////         TODO: Refactor  Style ////////////////////// */}
        <Col span={18}>
          <Form.Item
            name='campaignSideRailImage'
            rules={[{ required: false, message: 'Please Input an image!' }]}
            style={{ width: '100%' }}
          >
            
            <Upload onChange={onChange} beforeUpload={validateUpload} maxCount={1} showUploadList={false}
            // onRemove={fileRemoveHandler}
            >
              <Input
                value={filename!==''? filename : ''}
                placeholder='input an image'
                prefix={previewUrl!==''? <Image src={previewUrl} width={20} preview={false} /> : <PaperClipOutlined />}
                suffix={<Button icon={<UploadOutlined />}>Upload</Button>}
                style={{ width: '135%' }}
              />
            </Upload>
            <Text type='secondary'>
              Please upload an image with {width} X {height} px.{' '}
            </Text>
          </Form.Item>
        </Col>
        <Col span={6}></Col>
      </Row>
      {/* <Row>
                <Col span={21}>
                    <Text type="secondary">Please upload an image with 474 X 817px and max 5MB</Text>
                </Col>
                <Col span={3}></Col>
            </Row> */}
    </div>
  );
}

export default SideRailImage;
