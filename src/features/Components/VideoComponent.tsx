import React, { CSSProperties, useEffect } from 'react';
import { AnimateKeyframes } from 'react-simple-animate';
import { animated, Spring, useSpring } from 'react-spring';

import { spring, useCurrentFrame, useVideoConfig, Video } from 'remotion';

import video from '../../static/1.mp4';
import FlowImage from '../../static/flow 1.png';

function VideoComponent(props: {
  playVideo: boolean;
  durationInFrames: number;
}) {
  const frame = useCurrentFrame();

  const { playVideo, durationInFrames } = props;
  const { fps } = useVideoConfig();
  const progress = spring({
    fps,
    frame: frame - 50,
    config: { mass: 0.5, damping: 200 },
    from: 1,
    to: 0.75,
  });

  const progress2 = spring({
    fps,
    frame: frame - 230,
    config: { mass: 0.5, damping: 200 },
    from: 0.75,
    to: 1,
  });

  const videoStyle = {
    zIndex: -1,
    transform: `scale(${
      frame >= 50 && frame <= 230
        ? progress
        : frame >= 0 && frame < 50
        ? 1
        : progress2
    })`,
    transformOrigin: 'top right',
  } as CSSProperties;

  return (
    <>
      <Video
        src={video}
        startFrom={0} // if video is 30fps, then it will start at 2s
        endAt={60 * 10} // if video is 30fps, then it will end at 4s
        style={videoStyle}
        // style={{...style, width: '100%'}}
        disableRemotePlayback
      />
    </>
  );
}

export default VideoComponent;
