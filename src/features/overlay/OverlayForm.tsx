import React, { useEffect, useState } from 'react';
import { Space, Checkbox  } from 'antd';
import SimpleInput from '../FormItems/SimpleInput';
import { DraggableVideoUpload, campaignNameInput, OverlaySizeSelect, OverlayTemplateSelect, callToActionText } from './OverlayInputs';
import DraggableInput from '../FormItems/DraggableInput';
import SelectInput from '../FormItems/SelectInput';
import SideRailImage from '../FormItems/SideRailImage';
import { selectOverlay, setOverlaySize, setOverlayTemplate } from '../../Redux/Overlay/overlayAttributes';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setName } from '../../Redux/Requests/CampaignRequests';
import { setCTAText } from '../../Redux/Overlay/CallToActionAttributes';
import { selectCta } from '../../Redux/Overlay/CallToActionAttributes';
import { getCampaignName } from '../../Redux/Requests/CampaignRequests'
import BackgroundPopover from '../ColorPopover/BackgroundPopover';
import TextPopover from '../ColorPopover/TextPopover';


// const { Text, Link } = Typography;
function OverlayForm() {
  const dispatch = useAppDispatch();
  const [checked, setchecked] = useState(false)

  const cta = useAppSelector(selectCta)
  const campaignName = useAppSelector(getCampaignName)
  const overlay = useAppSelector(selectOverlay)

  useEffect(() => {
    if(overlay.template === 2) setchecked(true)
  }, [overlay])

  const [NameInput, setNameInput] = useState({
    ...campaignNameInput,
    defaultValue: campaignName?campaignName:'',
    onChange: (e: React.FormEvent<HTMLInputElement>) => {
      let data = {
        name: e.currentTarget.value
      };
      dispatch(setName(data));
    }
  })

  useEffect(() => {
    setNameInput({
      ...NameInput,
      defaultValue: campaignName?campaignName:'',
      onChange: (e: React.FormEvent<HTMLInputElement>) => {
        let data = {
          name: e.currentTarget.value
        };
        dispatch(setName(data));
      }
    })
    
  }, [campaignName])

  const CtaInput = {
    ...callToActionText,
    onChange: (e: React.FormEvent<HTMLInputElement>) => {
      let data = {
        text: e.currentTarget.value
      };
      dispatch(setCTAText(data));
    }
  };

  const SizeInput = {
    ...OverlaySizeSelect,
    onChange: (e: string) => {
      let data = {
        size: e
      };
      dispatch(setOverlaySize(data));
    }
  };

  const onCheck = () => {
    setchecked(!checked)
    if(checked) dispatch(setOverlayTemplate({template: 1}))
    else dispatch(setOverlayTemplate({template: 2}))
  }

  return (
    <div>

      {/* Campaign Name Input */}
      <SimpleInput {...NameInput} defaultValue={campaignName?campaignName:''} />

      {/* Video Upload */}
      <DraggableInput {...DraggableVideoUpload} />

      {/* Select Overlay */}
      <Space>
        <SelectInput {...OverlayTemplateSelect} />
        <Checkbox checked={checked} onChange={onCheck}>Mirror Animation</Checkbox> 
      </Space>

      {/* Overlay Size Input */}
      <SelectInput {...SizeInput} />

      {/* Side Rail Image upload */}
      <SideRailImage />

      {/* Call to action iput */}
      <SimpleInput {...CtaInput} defaultValue={cta.text?cta.text:''} />

      <Space>
        {/* Text Color  */}
        <TextPopover />
        
        {/* Background Color */}
        {!(cta.background_color === '#00000000' ) && <BackgroundPopover />}
      </Space>
    </div>
  );
}

export default OverlayForm;
