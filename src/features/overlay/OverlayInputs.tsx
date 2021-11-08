import React from 'react'
import {simpleInput, SelectInputType, DraggableInputUpload} from '../FormItems/InputTypes'
import { Button } from 'antd';
import * as inputConstants from '../../constants/OverlayConstants/formConstants'
import { InboxOutlined, LinkOutlined } from '@ant-design/icons';


export const campaignNameInput: simpleInput = {
    name: 'campaignName',
    title: 'Name',
    titleSize: 3,
    inputPlaceholder: 'Name Your Video Overlay',
    buttonWithName: <Button type='link' onClick={() => window.location.reload()}>Create New</Button>,
    required: true,
    requiredMessage: 'Please input a campaign name!',
    prefix: null,
    type: inputConstants.SIMPLE_INPUT_WITH_BUTTON,
    onChange: (e: React.FormEvent<HTMLInputElement>) => {
        
    }
}


export const DraggableVideoUpload: DraggableInputUpload = {
    name: 'campaignVideo',
    title: 'Upload Video',
    titleSize: 6,
    required: true,
    requiredMessage: 'Please input a video file!',
    dragIcon: <InboxOutlined style={{color: 'black'}} />,
    uploadText: 'Click or drag Video file to this area to upload',
    uploadHint: 'Support MP$/MPEG4 format with 16:9 aspect ratio',
    type: inputConstants.DRAGGABLE_INPUT,
}

export const OverlaySizeSelect: SelectInputType = {
    name: 'campaignSelectOverlaySize',
    title: 'Choose overlay size', 
    titleSize: 8,
    placeholder: 'Choose overlay size',
    defaultValue: 'Large',
    options: [
        {
            value: 'Large',
            disabled: false
        },
        {
            value: 'Small',
            disabled: false
        }
    ],
    disabled: false,
    type: inputConstants.SELECT_INPUT,
    onChange: (e: string) => {
    
    }
}

export const OverlayTemplateSelect: SelectInputType = {
    name: 'campaignSelectOverlayTemplate',
    title: 'Select Overlay Template', 
    titleSize: 16,
    placeholder: 'Choose overlay Template',
    defaultValue: 'Default Squeezback Template',
    options: [
        {
            value: 'Default Squeezback Template',
            disabled: true
        }
    ],
    disabled: true,
    type: inputConstants.SELECT_INPUT,
    onChange: (e: string) => {
        
    }
}

export const callToActionText: simpleInput = {
    name: 'callToActionText',
    title: 'Enter call to action text',
    titleSize: 10,
    inputPlaceholder: 'Scan the code to order this product now',
    buttonWithName: <></>,
    required: false,
    requiredMessage: 'Please input a call to action text!',
    prefix: <></>,
    type: inputConstants.SIMPLE_INPUT,
    onChange: (e: React.FormEvent<HTMLInputElement>) => {
        
    }
}

export const flowcodeURL: simpleInput = {
    name: 'flowcodeURL',
    title: 'Enter or paste website URL',
    titleSize: 10,
    inputPlaceholder: 'www.mywebsite.com',
    buttonWithName: <></>,
    required: true,
    requiredMessage: 'Please input a valid URL!',
    prefix: <LinkOutlined />,
    type: inputConstants.SIMPLE_INPUT_WITH_BUTTON,
    onChange: (e: React.FormEvent<HTMLInputElement>) => {
        // dispatch(getFlowCodeAsync(e.currentTarget.value))
    }
}






export const OverlayInputs = [
    {
        name: 'campaignName',
        title: 'Name',
        inputPlaceholder: 'Name Your Video Overlay',
        buttonWithName: <Button type='link'>Create New</Button>,
        required: true,
        requiredMessage: 'Please input a campaign name!',
        type: inputConstants.SIMPLE_INPUT_WITH_BUTTON
    },
    {
        title: 'Upload Video',
        name: 'campaignVideo',
        required: true,
        requiredMessage: 'Please input a video file!',
        dragIcon: <InboxOutlined style={{color: 'black'}} />,
        uploadText: 'Click or drag Video file to this area to upload',
        uploadHint: 'Support MP$/MPEG4 format with 16:9 aspect ratio',
        type: inputConstants.DRAGGABLE_INPUT,
    },
    {
        name: 'campaignSelectOverlaySize',
        title: 'Choose overlay size', 
        placeholder: 'Choose overlay size',
        defaultValue: 'Large',
        options: [
            {
                value: 'Large',
                disabled: false
            },
            {
                value: 'Small',
                disabled: false
            }
        ],
        type: inputConstants.SELECT_INPUT,
    }
    
]