import { Composition } from 'remotion';

import MyComposition from '../features/MyComposition/MyComposition';
import { MyVideo } from '../features/videoPlayer/VideoPlayer';

const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={MyComposition}
        durationInFrames={30 * 10}
        fps={60}
        width={800}
        height={450}
      />

      <Composition
        id="HelloWorld2"
        component={MyVideo}
        durationInFrames={100}
        fps={30}
        width={600}
        height={300}
        defaultProps={{
          titleText: 'sjdskd',
          titleColor: 'black',
        }}
      />

      <Composition
        id="HelloWorld3"
        component={MyVideo}
        durationInFrames={100}
        fps={30}
        width={600}
        height={300}
        defaultProps={{
          titleText: 'sjdskd',
          titleColor: 'black',
        }}
      />
    </>
  );
};

export default RemotionVideo;
