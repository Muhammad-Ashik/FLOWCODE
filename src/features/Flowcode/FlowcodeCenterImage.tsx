import React from 'react';
import { Row, Col, Form, Input, Upload, Button } from 'antd';
import { PaperClipOutlined, UploadOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import  { postFlowcodeCenterImage, putFlowcodeCenterImage, getFlowcodeCenterImageDetails } from '../../Redux/Flowcode/FlowcodeCenterImage'



function FlowcodeCenterImage() {
  const dispatch = useAppDispatch();
  const flowcodeCenterIcon = useAppSelector(getFlowcodeCenterImageDetails);

  const createImage = async (data: Blob) => {
    let formImageData = new FormData();
    formImageData.append('image', data);

        
        if(flowcodeCenterIcon.image_id && flowcodeCenterIcon.image_id !== null && flowcodeCenterIcon.status === 'idle') {
            let image = {
                imageId: flowcodeCenterIcon.image_id,
                imageData: formImageData
            }
            dispatch(putFlowcodeCenterImage(image))
        } else if(flowcodeCenterIcon.status === 'idle'){
            dispatch(postFlowcodeCenterImage(formImageData))
        }
    }

  const onChange = async (info: UploadChangeParam) => {
    if(info.fileList && info.fileList.length > 0) {
      createImage(info.fileList[0].originFileObj as Blob);
      info.file.status = 'done'
    }
  };
  return (
    <div>
      <Row>
        <Col span={18}>
          <Form.Item
            name='flowcodeCenterImage'
            rules={[{ required: false, message: 'Please Input an icon!' }]}
            style={{ width: '100%' }}
          >
            <Upload onChange={onChange} maxCount={1}>
              <Input
                placeholder='input an icon'
                prefix={<PaperClipOutlined />}
                suffix={<Button icon={<UploadOutlined />}>Upload</Button>}
                style={{ width: '135%' }}
              />
            </Upload>
          </Form.Item>
        </Col>
        <Col span={6}></Col>
      </Row>
    </div>
  );
}

export default FlowcodeCenterImage;
