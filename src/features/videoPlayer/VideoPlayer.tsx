import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// import video from '../../remotion/videosbTj7kP/out.mp4';
import { Player, PlayerRef } from '@remotion/player';
import { Input, message, Progress, Upload } from 'antd';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { interpolate, Sequence, useCurrentFrame } from 'remotion';

import BasicBtn from '../../basic/basicBtn';
import UploadBtn from '../../basic/uploadBtn';
import animationData from '../lotties/doctorLab.json';
import MyComposition from '../MyComposition/MyComposition';

import './videoPlayer.css';

const Title: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return <div style={{ opacity }}>{title}</div>;
};

export const MyVideo: React.FC<{ titleText: string; titleColor: string }> = ({
  titleColor,
  titleText,
}) => {
  console.log(titleText);
  console.log('here');
  return (
    <div
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <Sequence from={0} durationInFrames={40}>
        <Title title="Hello" />
      </Sequence>
      <Sequence from={40}>
        <Title title={titleText} />
      </Sequence>
    </div>
  );
};

const VideoPlayer: React.FC = () => {
  const playerRef = useRef<PlayerRef>(null);
  const [play, setPlay] = useState(false);
  const [title, setTitle] = useState('');
  const [valueObj, setValueObj] = useState({
    title: '',
    fontSize: 55,
    fontColor: [],
  });
  const [img, setImg] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const [uploadProps, setUploadProps] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
  });
  const [animeObj, setAnimeObj] = useState<any>(animationData);
  const svg = document.getElementsByClassName('CTA_Placeholder');
  console.log(svg);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.addEventListener('play', () => {
        setPlay(true);
      });

      playerRef.current.addEventListener('pause', () => {
        setPlay(false);
      });

      playerRef.current.addEventListener('seeked', (e) => {
        console.log('seeked to ' + e.detail.frame);
        console.log(e.detail.frame);
      });
      playerRef.current.addEventListener('timeupdate', (e) => {
        console.log('time has updated to ' + e.detail.frame);
      });
    }
  }, []);
  useEffect(() => {}, [title]);

  useEffect(() => {}, [uploadProps.previewImage]);
  const handleClick = async () => {
    const response = await axios.get(
      'http://localhost:8000?titleText=HelloWorld'
    );
    console.log(response);
  };

  const downloadVideo = () => {
    let link = 'http://localhost:8000?titleText=HelloWorld';
    axios({
      url: link, //your url
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      var blob = new Blob([response.data], {
        type: 'text/plain;charset=utf-8',
      });
      saveAs(blob, 'hello world.mp4');
    });
  };

  // useEffect(() => {
  //   setAnimeObj(JSON.stringify(animationData));
  //   console.log(animeObj, 'JSON');
  // }, []);
  function getBase64(
    img: Blob,
    callback: (arg0: string | ArrayBuffer | null) => any
  ) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      setUploadPercentage(info.file.percent);
      return;
    } else {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        const newAnimeObj = { ...animeObj };
        newAnimeObj.assets[0].p = imageUrl;
        newAnimeObj.assets[1].p = imageUrl;
        title &&
          (newAnimeObj.assets[3].layers[0].t.d.k[0].s.t = valueObj.title);
        setImg(imageUrl);
        setLoading(false);
      });
    }
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.seekTo(150);
    }
  };
  const submitTextChange = () => {
    const newAnimeObj = { ...animeObj };
    newAnimeObj.assets[3].layers[0].t.d.k[0].s.t = valueObj.title
      ? valueObj.title
      : 'Demo Text';
    setAnimeObj(newAnimeObj);
  };

  const submitFontChange = () => {
    const newAnimeObj = { ...animeObj };
    newAnimeObj.assets[3].layers[0].t.d.k[0].s.s = valueObj.fontSize
      ? valueObj.fontSize
      : 55;
    setAnimeObj(newAnimeObj);
  };

  useEffect(() => {
    submitTextChange();
  }, [valueObj.title]);
  useEffect(() => {
    submitFontChange();
  }, [valueObj.fontSize]);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="imageUploadButton" style={{ marginTop: 8 }}>
        {loading ? 'Uploading Image' : 'Upload Image'}
      </div>
    </div>
  );
  function handleInputChange(
    event: ChangeEvent<HTMLInputElement>,
    type: string
  ) {
    const { name, value } = event.target;
    setValueObj((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.seekTo(150);
    }
  }

  return (
    <div className="container">
      <div className="leftSideContainer">
        <div className="titleContainer">
          <Input
            name="title"
            placeholder="Title"
            onChange={(event) => handleInputChange(event, 'title')}
          />
        </div>
        <div className="titleContainer">
          <Input
            name="fontSize"
            placeholder="font size"
            onChange={(event) => handleInputChange(event, 'font')}
          />
        </div>
        <Upload
          name="avatar"
          listType="picture-card"
          showUploadList={false}
          onChange={handleChange}
        >
          {img ? (
            <img src={img} alt="avatar" style={{ width: '100%' }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </div>
      <div className="rightSideContainer">
        <Player
          ref={playerRef}
          durationInFrames={30 * 10}
          compositionWidth={800}
          compositionHeight={450}
          fps={60}
          loop={true}
          component={() => MyComposition({ play, animeObj, img })}
          controls={true}
          showVolumeControls={true}
          allowFullscreen={true}
          clickToPlay={true}
          spaceKeyToPlayOrPause={true}
          inputProps={{ titleText: title, titleColor: 'black' }}
          style={{ backgroundColor: '#00d1b2' }}
          // Many other optional props are available.
        />

        <BasicBtn
          className="videoButton"
          text="Save"
          handleClick={handleClick}
        />
        <BasicBtn
          className="videoButton"
          text="Download"
          handleClick={downloadVideo}
        />
      </div>
    </div>
  );
};
export default VideoPlayer;
