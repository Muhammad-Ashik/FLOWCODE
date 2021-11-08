import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { simpleInput } from '../FormItems/InputTypes';
import { LinkOutlined } from '@ant-design/icons';
import { setUrl, setUrlToNone } from '../../Redux/Flowcode/Flowcode';
import * as inputConstants from '../../constants/OverlayConstants/formConstants';
import SimpleInput from '../FormItems/SimpleInput';
import { FLOWCODE_URL } from './constants'
import { getFlowcode } from '../../Redux/Flowcode/Flowcode';
import { setConfigId, getConfigId, setRedirectCode } from '../../Redux/Flowcode/FlowcodeStudioConfig'
import { Row, Col, Image } from 'antd'
import { setFlowcodeUrlOrcode, getFlowcodeDetails, setFlowcodePattern } from '../../Redux/Flowcode/FlowcodeActions'
import QR from '../../static/qr-code2.png'
import { setPattern } from '../../Redux/Flowcode/FlowcodePattern'
import { flowcodeRealImageStyle, flowcodeDemoImageStyle } from './constants'
import { setFlowcodeUploadImageToNull } from '../../Redux/Flowcode/FlowcodeUploadImage'


function FlowcodeStudioId() {
    const dispatch = useAppDispatch();
    const flowcode = useAppSelector(getFlowcode);
    const [flowcodeImageUrl, setflowcodeImageUrl] = useState("")
    const flowcodeConfig = useAppSelector(getConfigId);
    const flowcodeResponse = useAppSelector(getFlowcodeDetails)


    const flowcodeURL: simpleInput = {
        name: 'flowcodeURL',
        title: 'Enter a Flowcode Id',
        titleSize: 10,
        inputPlaceholder: 'Id',
        buttonWithName: <></>,
        required: true,
        requiredMessage: 'Please input a valid Id!',
        prefix: <LinkOutlined />,
        type: inputConstants.SIMPLE_INPUT_WITH_BUTTON,
        onChange: (e: React.FormEvent<HTMLInputElement>) => {
            const URL = {
                url: '',
                status: 'loading'
            };
            const url_or_code = {
              url_or_code: e.currentTarget.value,
            }
            dispatch(setUrlToNone({}));
            dispatch(setFlowcodeUploadImageToNull({}))
            dispatch(setRedirectCode({redirect_code: e.currentTarget.value }))
            dispatch(setFlowcodeUrlOrcode(url_or_code));
            
        },
        defaultValue: flowcodeConfig.redirect_code?flowcodeConfig.redirect_code:''
    };


    const flowcodeStudioConfig: simpleInput = {
        name: 'flowcodeStudioConfig',
        title: 'Enter Flowcode Studio Config Id',
        titleSize: 10,
        inputPlaceholder: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        buttonWithName: <></>,
        required: true,
        requiredMessage: 'Please input a valid Studio Config Id!',
        prefix: <LinkOutlined />,
        type: inputConstants.SIMPLE_INPUT_WITH_BUTTON,
        onChange: (e: React.FormEvent<HTMLInputElement>) => {
            const URL = {
                studio_config_id: e.currentTarget.value,
            };
            dispatch(setFlowcodePattern({pattern: e.currentTarget.value}))

            dispatch(setConfigId(URL));
            dispatch(setPattern({
              name: '',
              value: e.currentTarget.value,
              isStyle: false,
              hasColor: false,
              hasPattern: false
            }))
            dispatch(setUrlToNone({}));
            dispatch(setFlowcodeUploadImageToNull({}))
        },
        defaultValue: flowcodeConfig.studio_config_id?flowcodeConfig.studio_config_id:''
    };


    useEffect(() => {
        if(flowcodeResponse.created_with === 'S'){
          const url_or_code = {
            url_or_code: flowcodeConfig.redirect_code,
          }
          
          dispatch(setFlowcodeUrlOrcode(url_or_code));
        }
        getFlowcodeAsync();
        
      }, [flowcode.url, flowcodeConfig.studio_config_id, flowcodeConfig.redirect_code]);
    

    const setApiURL = () => {
        const API_BASE = FLOWCODE_URL + '&data=';
    
        let API_URL = API_BASE

        if(flowcodeConfig.redirect_code && flowcodeConfig.redirect_code!==''){
          API_URL = API_URL + 'https://flowcode.com/p/' + flowcodeConfig.redirect_code
        } 
        // else{
        //   API_URL = API_URL + encodeURIComponent('https://www.ixorasolution.com')
        // }
        
        if(flowcodeConfig){
            if(flowcodeConfig.studio_config_id!==''){
                API_URL = API_URL + '&studio_config_id='+flowcodeConfig.studio_config_id // + '&style=inset'
            } else{
              API_URL = API_URL + '&style=inset'
            }
        }
        
        return API_URL;
      };
    
      const getFlowcodeAsync = async () => {
        const API_URL = setApiURL();
        
        
        const response = await fetch(API_URL, {
          // +'&studio_config_id=ffe79361-41c5-4bfe-9f9f-f9343be53262'
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {        
            return response.blob();
          })
          .then(blob => {
            setflowcodeImageUrl(URL.createObjectURL(blob))
          })
          .catch(err => {});
        return response;
      };
    return (
        <div>
            <SimpleInput {...flowcodeURL} />
            <SimpleInput {...flowcodeStudioConfig} />

            <Row>
                <Col span={16}>
                    <div
                        style={{
                        paddingLeft: '10%',
                        textAlign: 'center',
                        fontSize: '10px',
                        color: 'rgba(0, 0, 0, 0.45)',
                        width: '100%'
                        }}
                    >
                        {flowcodeConfig.redirect_code && flowcodeConfig.redirect_code!==''? 
                        <div>
                          <Image
                              src={flowcodeImageUrl.toString()}
                              preview={false}
                              alt={'Flowcode'}
                              width={'75%'}
                          />
                          <br />
                          <b>This is a preview of your flowcode</b>
                        </div>
                        :
                        <div>
                          <Image preview={false} src={QR} width={180} 
                          style={flowcodeDemoImageStyle}></Image>
                          <br />
                          <b>This is a flowcode template.</b>
                        </div>
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default FlowcodeStudioId
