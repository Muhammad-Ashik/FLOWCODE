import React, { useState } from 'react';
import { Row, Card, Space, Tabs, Radio } from 'antd';
import FlowcodeCollapse from '../Flowcode/FlowcodeCollapse';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import FlowcodeUploadImage from '../Flowcode/FlowcodeUploadImage';
import FlowcodeStudioId from '../Flowcode/FlowcodeStudioId'
import { cardHeaderStyle } from '../Flowcode/constants'
import { setFlowcodeCreatedWith, getFlowcodeDetails } from '../../Redux/Flowcode/FlowcodeActions'
import FlowcodeUrlInput from './FlowcodeUrlInput'


const { TabPane } = Tabs;

function FlowcodeDesignCard() {
  const dispatch = useAppDispatch();
  const [value, setvalue] = useState('I')

  const flowcode = useAppSelector(getFlowcodeDetails)

  return (
    <Row>
        <Card
            title='Step 2: Enter your Website and design your code.'
            headStyle={cardHeaderStyle}
            style={{ width: '100%', fontSize: '14px' }}
        >
            <Tabs activeKey={flowcode.created_with==='G'?'G':'I'} 
            onChange={(e) => { dispatch(setFlowcodeCreatedWith({created_with: e})) } } 
            >
                <TabPane tab="Generate Flowcode" key="G">
                <Space direction='vertical' size='large'>
                <div>
                    <FlowcodeUrlInput />
                    <FlowcodeCollapse />
                </div>
                
                </Space>
            </TabPane>
            
            <TabPane tab="Use Existing Flowcode" key="I">
                
                <Radio.Group 
                onChange={(e) => {
                setvalue(e.target.value)
                dispatch(setFlowcodeCreatedWith({created_with: e.target.value}))
                }} 
                value={flowcode.created_with?flowcode.created_with:value}>
                <Radio value={'I'}>Upload Flowcode</Radio>
                <Radio value={'S'}>Use Flowcode Id</Radio>
                </Radio.Group>
                <br />
                <br />
                {flowcode.created_with === 'I'? <FlowcodeUploadImage />:<FlowcodeStudioId />}
                
            </TabPane>
            
            </Tabs>
            
        </Card>
    </Row>
  );
}

export default FlowcodeDesignCard;
