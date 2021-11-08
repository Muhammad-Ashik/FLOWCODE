import React, { useState } from 'react';
import { Space, Tabs, Radio } from 'antd';
import SimpleInput from '../FormItems/SimpleInput';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setUrl } from '../../Redux/Flowcode/Flowcode';
import { simpleInput } from '../FormItems/InputTypes';
import { LinkOutlined } from '@ant-design/icons';
import * as inputConstants from '../../constants/OverlayConstants/formConstants';
import { UrlTypes } from '../Flowcode/constants'
import { setFlowcodeUrlOrcode } from '../../Redux/Flowcode/FlowcodeActions'
import { getFlowcode } from '../../Redux/Flowcode/Flowcode'
import { setConfigToNull } from '../../Redux/Flowcode/FlowcodeStudioConfig'
import { setFlowcodeUploadImageToNull } from '../../Redux/Flowcode/FlowcodeUploadImage'


const { TabPane } = Tabs;

function FlowcodeUrlInput() {
  const dispatch = useAppDispatch();

  const flowcodeWebUrl = useAppSelector(getFlowcode)  

  const [urlState, seturlState] = useState(UrlTypes[0])

  const flowcodeURL: simpleInput = {
    name: 'flowcodeURL',
    title: urlState.title,
    titleSize: 16,
    inputPlaceholder: urlState.placeholder,
    buttonWithName: <></>,
    required: true,
    requiredMessage: 'Please input a valid URL!',
    prefix: <LinkOutlined />,
    type: inputConstants.SIMPLE_INPUT_WITH_BUTTON,
    onChange: (e: React.FormEvent<HTMLInputElement>) => {
      const URL = {
        url: e.currentTarget.value,
        status: 'loading'
      };
      const url_or_code = {
        url_or_code: e.currentTarget.value,
      }
      dispatch(setUrl(URL));
      dispatch(setFlowcodeUrlOrcode(url_or_code))
      dispatch(setConfigToNull({}))
      dispatch(setFlowcodeUploadImageToNull({}))
    },
    defaultValue: flowcodeWebUrl.url?flowcodeWebUrl.url:''
  };


  return (
    <div>             
        <Radio.Group defaultValue={UrlTypes[0]} buttonStyle="solid" 
        onChange={(e) => seturlState(e.target.value)}>
        <Space>
            {UrlTypes.map(pattern => {
            return (
                <Radio.Button
                value={pattern}
                key={pattern.id}
                >
                {pattern.icon}
                </Radio.Button>
            );
            })}
        </Space>
        </Radio.Group>
        <br />
        <br />
        <SimpleInput {...flowcodeURL} />
    </div>
  );
}

export default FlowcodeUrlInput;
