import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCtaTextColor, selectCta } from '../../Redux/Overlay/CallToActionAttributes';
import ColorPicker from './ColorPicker';


function TextPopover() {
  const dispatch = useAppDispatch();
  const [textColor, setTextColor] = useState('#ffffff');

  const cta = useAppSelector(selectCta)

  useEffect(() => {
    setTextColor(cta.text_color?cta.text_color.toString():textColor)
  }, [cta])

  const changeTextColor = (val: string) => {
    let value = {
      text_color: val
    };

    dispatch(setCtaTextColor(value));
  };

  return (
    <ColorPicker defaultColor={textColor} dispatchFunc={changeTextColor} />
  );
}

export default TextPopover;
