import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCtaBackground, selectCta } from '../../Redux/Overlay/CallToActionAttributes';
import ColorPicker from './ColorPicker';


// const { Text, Link } = Typography;
function BackgroundPopover() {
  const dispatch = useAppDispatch();
  const [backgroundColor, setBackgroundColor] = useState('#000000');

  const cta = useAppSelector(selectCta)


  useEffect(() => {
    setBackgroundColor(cta.background_color?cta.background_color.toString():backgroundColor)
  }, [cta])

  const changeBackgroundColor = (color: string) => {
    let value = {
      background_color: color
    };
    dispatch(setCtaBackground(value));
  };

  return (
    <ColorPicker defaultColor={backgroundColor} dispatchFunc={changeBackgroundColor} />
  );
}

export default BackgroundPopover;
