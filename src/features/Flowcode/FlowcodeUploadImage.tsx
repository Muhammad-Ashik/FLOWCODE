import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Upload, Button, Image } from 'antd';
import { PaperClipOutlined, UploadOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { setFlowcodeImage } from '../../Redux/Flowcode/FlowcodeActions'
import { postFlowcodeImage, putFlowcodeImage, getFlowcodeUploadImageDetails } from '../../Redux/Flowcode/FlowcodeUploadImage'
import QR from '../../static/qr-code2.png'
import { setFlowcodeUrlOrcode } from '../../Redux/Flowcode/FlowcodeActions'
import { flowcodeRealImageStyle, flowcodeDemoImageStyle, MEDIA_BASE_URL } from './constants'
import { setUrlToNone } from '../../Redux/Flowcode/Flowcode'
import { setConfigToNull } from '../../Redux/Flowcode/FlowcodeStudioConfig'


function FlowcodeUploadImage() {
  const dispatch = useAppDispatch();
  
  const uploadFlowcode = useAppSelector(getFlowcodeUploadImageDetails)
  const [previewUrl, setpreviewUrl] = useState('')


  useEffect(() => {
    if(uploadFlowcode.image_id){
      let data = {
        flowcode_image: uploadFlowcode.image_id
      }
      dispatch(setFlowcodeImage(data))
    } 
    // else{
    //   setpreviewUrl('')
    // }
    if(uploadFlowcode.image) setpreviewUrl(MEDIA_BASE_URL + uploadFlowcode.image)
  }, [uploadFlowcode])


  const createImage = async (data: Blob) => {
    let formImageData = new FormData();
    formImageData.append('image', data);

        
    if(uploadFlowcode.image_id && uploadFlowcode.image_id !== null && uploadFlowcode.status === 'idle') {
        let image = {
            imageId: uploadFlowcode.image_id,
            imageData: formImageData
        }
      dispatch(putFlowcodeImage(image))
      dispatch(setUrlToNone({}));
      dispatch(setConfigToNull({}))
    } else if(uploadFlowcode.status === 'idle'){
      dispatch(setUrlToNone({}));
      dispatch(setConfigToNull({}))
      dispatch(postFlowcodeImage(formImageData))
    }
  }

  const onChange = async (info: UploadChangeParam) => {
    if(info.fileList && info.fileList.length > 0) {
      dispatch(setFlowcodeUrlOrcode({url_or_code: ''}));
      createImage(info.fileList[0].originFileObj as Blob);
    }
    var reader = new FileReader();
      var url = reader.readAsDataURL(info.fileList[info.fileList.length - 1].originFileObj as Blob);

      reader.onloadend = (e) => setpreviewUrl(reader.result?reader.result.toString():'')
      info.file.status = 'done'
  };

  return (
    <div>
      <Row>
        <Col span={18}>
          <Form.Item
            name='flowcodeUploadImage'
            rules={[{ required: false, message: 'Please Input a flowcode image!' }]}
            style={{ width: '100%' }}
          >
            <Upload onChange={onChange}>
              <Input
                placeholder='input an existing flowcode image'
                prefix={<PaperClipOutlined />}
                suffix={<Button icon={<UploadOutlined />}>Upload</Button>}
                style={{ width: '135%' }}
              />
            </Upload>
          </Form.Item>
        </Col>
        <Col span={6}></Col>
      </Row>
      <Row>
        { previewUrl!==''? 
        <Image src={previewUrl} style={flowcodeRealImageStyle} 
          preview={false} />
        :
        <div>
          <Image preview={false} src={QR} width={180} 
          style={flowcodeDemoImageStyle}
          ></Image>
          <br />
          <b>This is a flowcode template.</b>
        </div>
      }
      </Row>
    </div>
  );
}

export default FlowcodeUploadImage;
