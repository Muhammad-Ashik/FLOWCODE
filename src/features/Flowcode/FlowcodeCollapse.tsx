import React, { useEffect, useState } from 'react';
import { Collapse, Space, Radio, Image, Row, Col, RadioChangeEvent, Form, Spin, Button } from 'antd';
import { patterns, colors, MEDIA_BASE_URL } from './constants';
import flow from '../../static/flow 1.png';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setPattern, selectPattern } from '../../Redux/Flowcode/FlowcodePattern';
import { setColor, selectColor } from '../../Redux/Flowcode/FlowcodeColor';
import { setTheme, selectTheme } from '../../Redux/Flowcode/FlowcodeTheme';
import { getFlowcode, setUrl } from '../../Redux/Flowcode/Flowcode';
import ThemeSvg from './themeSvg';
import { getFlowcodeDetails, putFlowcode, setFlowcodePattern, setFlowcodeUrlOrcode } from '../../Redux/Flowcode/FlowcodeActions';
import { FLOWCODE_BASE_URL } from './constants'
import FlowcodeCenterImage from './FlowcodeCenterImage';
import { getFlowcodeCenterImageDetails } from '../../Redux/Flowcode/FlowcodeCenterImage'
import QR from '../../static/qr-code2.png'
import { getSpinner } from '../../Redux/Overlay/Spinner'
import { flowcodeRealImageStyle, flowcodeDemoImageStyle } from './constants'




const { Panel } = Collapse;

function FlowcodeCollapse() {
  // const [flowCodeResponse, setFlowcodeResponse] = useState({});
  const dispatch = useAppDispatch();
  const flowPattern = useAppSelector(selectPattern);
  const flowColor = useAppSelector(selectColor);
  const flowTheme = useAppSelector(selectTheme);
  const flowcode = useAppSelector(getFlowcode);
  const flowcodeCenterImage = useAppSelector(getFlowcodeCenterImageDetails);

  const flowcodeResponse = useAppSelector(getFlowcodeDetails);
  const editSpinner = useAppSelector(getSpinner)

  const [flowcodeImageUrl, setflowcodeImageUrl] = useState("")

  useEffect(() => {
    getFlowcodeAsync()
    
  }, [flowcode.url, flowPattern.value, flowColor.value, flowTheme.value, flowcodeCenterImage.image_id]);

  useEffect(() => {
    if(flowcodeResponse.created_with === 'G'){
      const url_or_code = {
        url_or_code: flowcode.url,
      }
      dispatch(setFlowcodeUrlOrcode(url_or_code));
    }
    getFlowcodeAsync()
  }, [flowcodeResponse.created_with])

  useEffect(() => {
    setAfterSpin()
  }, [editSpinner.spin])

  const setAfterSpin = async () => {
    if(flowcodeResponse.url){
      const API_URL = flowcodeResponse.url
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
          // setFlowcodeResponse(URL.createObjectURL(blob));
          setflowcodeImageUrl(URL.createObjectURL(blob))
          // uploadFlowcode(blob)
        })
        .catch(err => {});
      return response;
    }
    
  };



  const selectFlowcodePattern = (e: RadioChangeEvent) => {
    let pat = patterns.filter(
      val => e.target.value.toString() === val.studio_config_id.toString()
    );
    let act = {
      name: pat[0].name,
      value: pat[0].studio_config_id,
      isStyle: pat[0].isStyle?pat[0].isStyle:false,
      hasColor: pat[0].hasColor,
      hasPattern: pat[0].hasPattern
    };
    dispatch(setPattern(act));
    dispatch(setFlowcodePattern({pattern: pat[0].studio_config_id}))
  };

  const selectFlowcodeTheme = (e: RadioChangeEvent) => {
    let pat = flowColor.themes.filter(
      val => e.target.value.toString() === val.value.toString()
    );
    let act = {
      name: pat[0].name,
      value: pat[0].value,
      code: pat[0].style.circleBorder
    };
    dispatch(setTheme(act));
  };

  const setFlowcodeColor = (e: RadioChangeEvent) => {
    let color = colors.filter(
      val => e.target.value.toString() === val.value.toString()
    );
    let act = {
      name: color[0].name,
      value: color[0].value,
      code: color[0].code,
      themes: color[0].themes
    };
    dispatch(setColor(act));
    let pat = {
      name: color[0].themes[flowTheme.value - 1].name,
      value: color[0].themes[flowTheme.value - 1].value,
      code: color[0].themes[flowTheme.value - 1].style.circleBorder
    };
    dispatch(setTheme(pat));
  };

  const setApiURL = () => {
    const API_BASE = FLOWCODE_BASE_URL + '&data=';

    let API_URL = API_BASE

    if(flowcode.url && (flowcode.url).toString().length > 5){
      API_URL = API_URL + encodeURIComponent('https://' + flowcode.url)
      if (flowPattern) {
        
        if(flowPattern.value !== '') API_URL = API_URL + '&studio_config_id=' + flowPattern.value;
  
        if(flowPattern.isStyle === true){
          API_URL = API_URL + '&style=inset';
        }
  
        if (flowPattern.hasColor && flowColor) {
          if (flowTheme && flowTheme.value % 2 === 0) {
            API_URL = API_URL + '&fgColor=white&bgColor=' + encodeURIComponent(flowTheme.code);
          } else {
            API_URL = API_URL + '&fgColor=' + encodeURIComponent(flowTheme.code);
          }
        }
      }
  
      
      if(flowcodeCenterImage) {
        if(flowcodeCenterImage.image_id){
          API_URL = API_URL + '&logoImageUrl=' + MEDIA_BASE_URL + flowcodeCenterImage.image + '&logoWidth=20&logoHeight=20';
          // API_URL = API_URL + '&logoImageUrl=http://flowcode.ixorasolution.com/media/images/ixora-logo.png' + '&logoWidth=20&logoHeight=20';
        }
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
        // setFlowcodeResponse(URL.createObjectURL(blob));
        setflowcodeImageUrl(URL.createObjectURL(blob))
        // uploadFlowcode(blob)
      })
      .catch(err => {});
    return response;
  };

  const uploadFlowcode = async () => {
    let data = {
      url: setApiURL(),
      url_or_code: flowcodeResponse.url_or_code,
      pattern: flowPattern.value,
      color: flowColor.name,
      theme: flowTheme.name,
      flowcode_image: null,
      flowcode_center_image: null,
      created_with: 'G'
    };

    let payload = {
      flowcodeId: flowcodeResponse.flowcode_id,
      flowcodeData: data
    };
    dispatch(putFlowcode(payload));
  };

  const themeLogos = [
    {
      style: {
        circleFill: '#fff',
        circleBorder: flowColor.code,
        circleColor: flowColor.code
      },
      value: 1,
      name: 'Standard',
      show: flowPattern.isStyle
    },
    {
      style: {
        circleFill: flowColor.code,
        circleBorder: flowColor.code,
        circleColor: '#fff'
      },
      value: 2,
      name: 'Standard inverted'
    }
  ];
  

  return (
    <div>
      <Row>
        <Col span={14}>
          <Collapse defaultActiveKey={['1']} accordion>
            <Panel header={'Pattern: ' + flowPattern.name} key='1'>
              <Space>
                <Radio.Group
                  name='flowcodePattern'
                  defaultValue='1'
                  optionType='button'
                  onChange={e => selectFlowcodePattern(e)}
                >
                  <Space align='start' wrap>
                    {patterns.map((pattern, index) => {
                      return (
                        <Col>
                          <Radio.Button
                            value={pattern.studio_config_id}
                            key={pattern.studio_config_id}
                            style={pattern.style}
                          >
                            <Image src={pattern.image} preview={false} />
                          </Radio.Button>
                        </Col>
                      );
                    })}
                  </Space>
                </Radio.Group>
              </Space>
            </Panel>
            {flowPattern.hasColor && <Panel header={'Color: ' + flowColor.name} key='2'>
              <Form.Item>
                <Radio.Group
                  name='flowcodeColor'
                  defaultValue='1'
                  optionType='button'
                  buttonStyle='outline'
                  onChange={e => setFlowcodeColor(e)}
                >
                  <Space wrap>
                    {colors.map(color => {
                      return (
                        <Radio.Button
                          value={color.value}
                          key={color.value}
                          style={color.style}
                        ></Radio.Button>
                      );
                    })}
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Panel>}
            {flowPattern.hasPattern && <Panel header={'Theme: ' + flowTheme.name} key='3'>
              <Row>
                <Radio.Group
                  name='flowcodeTheme'
                  defaultValue='1'
                  optionType='button'
                  buttonStyle='outline'
                  onChange={e => selectFlowcodeTheme(e)}
                >
                  <Space wrap>
                    {flowColor.themes.map(logo => {
                      return (
                        <Radio.Button
                          value={logo.value}
                          key={logo.value}
                          style={{ border: 'none', height: '48px', width: '48px', borderRadius: '48px', margin: '5%' }}
                        >
                          <ThemeSvg {...logo.style} />
                        </Radio.Button>
                      );
                    })}
                  </Space>
                </Radio.Group>
              </Row>
            </Panel>}
            <Panel header='Center Image (Optional)' key='4'>
              <FlowcodeCenterImage />
            </Panel>
          </Collapse>
        </Col>

        <Col span={10}>
          <div
            style={{
              paddingLeft: '10%',
              textAlign: 'center',
              fontSize: '10px',
              color: 'rgba(0, 0, 0, 0.45)'
            }}
          >
              {(flowcodeResponse.url_or_code && flowcodeResponse.url_or_code!=='' && 
              flowcodeResponse.url_or_code?.length > 5)? 
              <div>
              <Image
                src={flowcodeImageUrl.toString()}
                preview={false}
                alt={'Flowcode'}
              />
              <b>This is a preview of your flowcode</b>
              </div>
              : 
              <div>
                <Image preview={false} src={QR} width={180} 
                style={flowcodeDemoImageStyle}></Image>
                <b>This is a flowcode template.</b>
              </div>
              }
            {/* {flowCodeResponse ? (
              <Image
                src={flowcodeImageUrl.toString()}
                preview={false}
                alt={'Flowcode'}
              />
            ) : (
              <Spin />
            )} */}
            
          </div>
        </Col>

        {/* <Button onClick={() => uploadFlowcode()}>Upload</Button> */}
      </Row>
    </div>
  );
}

export default FlowcodeCollapse;
