import React, { useEffect, useState } from 'react'
import { Input, Row, Col, Space, Divider, Radio, message } from 'antd'
import { setOverlayDuration, setOverlayStart, selectOverlay } from '../../Redux/Overlay/overlayAttributes'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { OverlaySizeSelect } from '../overlay/OverlayInputs'
import { getInputVideoDetails } from '../../Redux/Requests/VideoRequests'

function SetAppearance() {
    const dispatch = useAppDispatch()
    const overlayDetails = useAppSelector(selectOverlay)
    const inputVideo = useAppSelector(getInputVideoDetails)
    const [start, setstart] = useState(1)
    const [duration, setduration] = useState(0)

    const [maxstart, setMaxstart] = useState(1)
    const [maxduration, setMAxduration] = useState(1)

    useEffect(() => {
        setstart(overlayDetails.start? overlayDetails.start:1)
        setduration(overlayDetails.duration?overlayDetails.duration:1)
    }, [inputVideo])

    const onStartChange = (e: React.FormEvent<HTMLInputElement>) => {
        let { value, min, max } = e.currentTarget
        if(inputVideo.duration) {
            if(parseFloat(value) > parseFloat(max)){
                message.error('Video start out of bound.');
                let val = parseFloat(min)
                let data = {
                    start: val
                }
                setstart(val)
                dispatch(setOverlayStart(data))
            } else{
                let data = {
                    start: parseFloat(value)
                }
                setstart(parseFloat(value))
                dispatch(setOverlayStart(data))
            }
        }
        
    }

    const onDurationChange= (e: React.FormEvent<HTMLInputElement>) => {
        let { value, min, max } = e.currentTarget
        if(inputVideo.duration) {
            if(parseFloat(value) > parseFloat(max)){
                message.error('Video length out of bound.');
                let val = Math.max(Number(min), Math.min(Number(max), Number(value)))
                let data = {
                    duration: val
                }
                setduration(val)
                dispatch(setOverlayDuration(data))
            } else{
                let data = {
                    duration: parseFloat(value)
                }
                setduration(parseFloat(value))
                dispatch(setOverlayDuration(data))
            }
        }
    }
    
    
    return (
        <div>
            <Row>
                <Col span={16}>Set the apperance and duration of the overlay</Col>
                <Col span={8}></Col>
            </Row>
            
            <Space size='small'>
                <div className="field has-addons">
                    <p className="control">
                        <a className="button is-static" style={{ color: 'black'}}>
                            Appear at
                        </a>
                    </p>
                    <p className="control is-expanded">
                        <input className="input" type="number" 
                        placeholder="5"
                        name="appearAt"
                        onChange={(e) => onStartChange(e)}
                        max={inputVideo.duration?(inputVideo.duration - duration):1}
                        min={1}
                        value={start}
                        defaultValue={overlayDetails.start?overlayDetails.start:''} />
                    </p>
                    <p className="control">
                        <a className="button is-static" style={{ color: 'black'}}>
                            sec
                        </a>
                    </p>
                </div>
                <div className="field has-addons">
                    <p className="control">
                        <a className="button is-static" style={{ color: 'black'}}>
                            Show for
                        </a>
                    </p>
                    <p className="control is-expanded">
                        <input className="input" type="number" 
                        placeholder="15"
                        name="showfor"
                        onChange={(e) => onDurationChange(e)}
                        max={inputVideo.duration?(inputVideo.duration-start):1}
                        min={1}
                        value={duration}
                        defaultValue={overlayDetails.duration?overlayDetails.duration:''} />
                    </p>
                    <p className="control">
                        <a className="button is-static" style={{ color: 'black'}}>
                            sec
                        </a>
                    </p>
                </div>
                {/* <Input type={'number'} 
                    addonBefore="Appear at" 
                    name="appearAt" suffix="sec" 
                    placeholder='5' 
                    onChange={(e) => onStartChange(e)} /> */}
                {/* <Input type={'number'} 
                    addonBefore="Show for" 
                    name="showfor" suffix="sec" 
                    placeholder='15' 
                    onChange={(e) => onDurationChange(e)} /> */}
            </Space>
            {/* <Divider /> */}

            {/* <Row>
                <Col span={10}>Choose format/file output type</Col>
                <Col span={14}></Col>
            </Row>
            <Row>
                <Col span={11}>
                    <Radio.Group name="formatOutputType" defaultValue='CTV'>
                        <Radio value='CTV'>CTV</Radio>
                        <Radio value='Youtube'>Youtube</Radio>
                        <Radio value='TV'>TV</Radio>
                    </Radio.Group>
                </Col>
            </Row> 
            <br /> */}

        </div>
    )
}

export default SetAppearance
