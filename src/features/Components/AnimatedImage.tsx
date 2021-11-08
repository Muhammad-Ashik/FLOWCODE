import { useSpring, animated } from 'react-spring'
import React from 'react';
import video from "../../static/1.mp4";
import {Video} from "remotion";
import { AnimateKeyframes } from 'react-simple-animate'


function AnimatedImage(props :{playVideo: boolean}) {
    const { playVideo } = props
    const styles = useSpring({
        loop: playVideo,
        from: { rotateY: 0 },
        to: { rotateY: 180 },
    })

    return (
        <AnimateKeyframes
            play={playVideo}
            pause={!playVideo}
            iterationCount="infinite"
            // direction="alternate-reverse
            direction="alternate"
            duration={30*5}
            keyframes={[]}
        >
            <animated.div
                style={{
                    width: 80,
                    height: 80,
                    backgroundColor: '#46e891',
                    borderRadius: 16,
                    ...styles,
                }}
            />
        </AnimateKeyframes>
    );
}

export default AnimatedImage;