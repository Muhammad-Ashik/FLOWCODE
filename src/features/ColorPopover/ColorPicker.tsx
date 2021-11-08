import React, { useState } from 'react';
import { Popover, Input  } from 'antd';

import { SketchPicker } from 'react-color';


// const { Text, Link } = Typography;
function ColorPicker(props: {dispatchFunc: (color: string) => void, defaultColor: string }) {

  const { dispatchFunc, defaultColor } = props;

  const [colorView, setColorView] = useState(false);
  const [color, setColor] = useState(defaultColor);

  const changeTextColor = (color: any) => {
    let num: number[] = [];
    num.push(parseInt(color.rgb.r));
    num.push(parseInt(color.rgb.g));
    num.push(parseInt(color.rgb.b));

    dispatchFunc(color.hex.toString());

    setColor(color.hex);
  };


  return (
    <Popover
        content={
        <SketchPicker
            color={color}
            onChangeComplete={(color: any) => changeTextColor(color)}
        />
        }
        title='Text Color'
        trigger='click'
        visible={colorView}
        onVisibleChange={() => setColorView(!colorView)}
    >
        Set Text Color: 
        <Input.Group compact>
        
        <Input style={{ width: '10%', backgroundColor: color, cursor: 'pointer' }} disabled onClick={() => setColorView(!colorView)} />
        <Input style={{ width: '60%' }} value={color} onClick={() => setColorView(!colorView)}  />
        </Input.Group>
    </Popover>
  );
}

export default ColorPicker;
