import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col } from 'antd';
import { simpleInput } from './InputTypes';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCampaignDetails } from '../../Redux/Requests/CampaignRequests'



function SimpleInput(props: simpleInput) {
  const {
    title,
    titleSize,
    name,
    buttonWithName,
    inputPlaceholder,
    required,
    requiredMessage,
    prefix,
    defaultValue,
    onChange
  } = props;

  const [defaultName, setDefaultName] = useState(defaultValue?defaultValue:'')
  const campaign = useAppSelector(getCampaignDetails)

  const [value, setvalue] = useState(defaultValue?defaultValue:'')

  useEffect(() => {
    setvalue(defaultValue?defaultValue:'')
  }, [defaultValue])

  // useEffect(() => {
  //   setvalue(campaign.name?campaign.name:'')
  // }, [campaign.name])

  // const getDefaultName = () => {
  //   if(name === 'campaignName'){
  //     setdefaultValue(campaign.name?campaign.name:'')
  //   }
  //   return defaultValue
  // }

  const onChangeLocal = (e: React.FormEvent<HTMLInputElement>) => {
    onChange(e)
    setvalue(e.currentTarget.value)
  }



  return (
    <div>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Col span={titleSize}>{title}</Col>
        <Col span={24 - titleSize ? titleSize : 0}></Col>
        {buttonWithName ? (
          <Col span={6}>{buttonWithName}</Col>
        ) : (
          <Col span={6}></Col>
        )}
      </Row>
          <div className="field">
            <p className="control is-expanded has-icons-left">
            <input className="input" type="text" placeholder={inputPlaceholder} defaultValue={defaultValue}
                  value={defaultValue?defaultValue:value}
                  onChange={e => onChangeLocal(e)}></input>
              {prefix && <span className="icon is-small is-left">
                {prefix}
              </span>}
            </p>
          </div>
            {/* <Input
              placeholder={inputPlaceholder}
              prefix={prefix}
              onChange={e => onChangeLocal(e)}
              value={value}
            /> */}
         
    </div>
  );
}

export default SimpleInput;
