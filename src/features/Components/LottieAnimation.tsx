import React, { useEffect } from 'react';
import Lottie from 'react-lottie-player';
import { animated, useTransition } from 'react-spring';

import { useCurrentFrame, useVideoConfig } from 'remotion';

import animationData from '../lotties/doctorLab.json';
import RemotionLottie from './RemotionLottie';

export default function App(Props: { play: boolean; animeObj: any }) {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();
  useEffect(() => {
    console.log('====================================');
    console.log('ANIME OBJ', Props.animeObj);
    console.log('====================================');
  }, [Props.animeObj]);
  return (
    <animated.div>
      <Lottie
        animationData={Props.animeObj}
        // play={frame > 70 && frame < 180}
        goTo={frame / 4}
        style={{
          width: 300,
          height: 300,
          position: 'absolute',
          bottom: -20,
          left: 20,
          fontSize: '20px !important',
        }}
      />

      {/* <RemotionLottie
        animationData={animationData}
        style={{
          width: 300,
          height: 300,
          position: 'absolute',
          bottom: -20,
          left: 20,
        }}
      /> */}
    </animated.div>
  );
}
