import React from 'react';
import { Row, Col, Card, Space } from 'antd';
import Navbar from '../Navbar/Navbar'
import OverlayForm from './OverlayForm';
import FlowCodeCard from '../Flowcode/FlowCodeCard';
import FlowcodeDesignCard from '../Flowcode/FlowcodeDesignCard'
import { cardHeaderStyle } from '../Flowcode/constants'


function Overlay() {

  return (
    <div style={{ textAlign: 'start' }}>
      <Navbar />
      <br />
      <h1 style={{ position: 'relative', paddingLeft: '8%', fontFamily: 'Roboto', fontStyle: 'normal',
          fontWeight: 500, fontSize: '20px', lineHeight: '32px' }}
      >
        Create a new Flowcode video overlay
      </h1>
      
      <Row>
      
        <Col span={2} />
        <Col span={8}>
          <Card
            bodyStyle={{ alignContent: 'start' }}
            title='Step 1: Upload video and setup the overlay'
            headStyle={cardHeaderStyle}
            style={{ width: '100%', fontSize: '14px', marginTop: '3.3%' }}
          >
            <OverlayForm />
          </Card>
        </Col>
        <Col span={1}></Col>
        <Col span={10}>
          <Space direction={'vertical'} size='small'>
          <FlowcodeDesignCard />
          <Row>
            <FlowCodeCard />
          </Row>
          </Space>
        </Col>
        <Col span={3} />
      </Row>
    </div>
  );
}

export default Overlay;
