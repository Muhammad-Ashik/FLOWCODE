import React, { Fragment } from 'react';

import { Sequence } from 'remotion';

import AnimatedImage from '../Components/AnimatedImage';
import BottomBox from '../Components/BottomBox';
import LottieAnimation from '../Components/LottieAnimation';
import SideRail from '../Components/sideRail';
import { Transition } from '../Components/Transition';
import VideoComponent from '../Components/VideoComponent';

const MyComposition = (props: { play: boolean; animeObj: any; img: any }) => {
  return (
    <Fragment>
      <Sequence from={0} durationInFrames={300}>
        <VideoComponent playVideo={props.play} durationInFrames={300} />
      </Sequence>
      <Sequence from={50} durationInFrames={165}>
        <Transition type="in">
          <Transition type="out">
            <LottieAnimation animeObj={props.animeObj} play={props.play} />
          </Transition>
        </Transition>
      </Sequence>
      {/* <Sequence from={40} durationInFrames={180}>
        <Transition type="in">
          <Transition type="out">
            <BottomBox />
          </Transition>
        </Transition>
      </Sequence> */}
      <Sequence from={60} durationInFrames={150}>
        <Transition type="in">
          <Transition type="out">
            <SideRail image={props.img} />
          </Transition>
        </Transition>
      </Sequence>
      {/* <AnimatedImage playVideo={props.play} /> */}
    </Fragment>
  );
};

export default MyComposition;
