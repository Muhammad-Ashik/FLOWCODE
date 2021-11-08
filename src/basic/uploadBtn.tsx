import React from 'react'
import { Upload, Button,Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadBtn = (props:any):JSX.Element => {
    function getBase64(file:any) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

     const handleCancel = () => props.setState({ previewVisible: false });
    const btnprops = {
    
        onChange ({ file, fileList }:{file:any, fileList:any}) {
          if (file.status !== 'uploading') {
            console.log(file, fileList);
          }
        },
        onPreview : async (file:any) => {
            console.log(file)
            if (!file.url && !file.preview) {
              file.preview = await getBase64(file.originFileObj);
            }
        
            props.setState({
              previewImage: file.url || file.preview,
              previewVisible: true,
              previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
            });
          }
    }
    return (
        <>
        <Upload {...btnprops} >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
      <Modal
      visible={props.previewVisible}
      title={props.previewTitle}
      footer={null}
      onCancel={handleCancel}
    >
      <img alt="example" style={{ width: '100%' }} src={props.previewImage} />
    </Modal>
    </>
    )
}

export default UploadBtn
