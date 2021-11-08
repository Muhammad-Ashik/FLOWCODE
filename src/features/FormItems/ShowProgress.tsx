import React, { useEffect, useState } from 'react'
import { Progress, Space, Typography, Button } from 'antd';
import { getCampaignOtput } from '../../Redux/Requests/GetCampaignRequests';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { BASE_URL, MEDIA_BASE_URL } from '../Flowcode/constants'
import { videoProcess, getVideoProcessData } from '../../Redux/Requests/VideoProcess'
import { videoProgress, getVideoProgressData , setVideoProgressToNull} from '../../Redux/Requests/VideoProgress'
import { selectOverlay } from '../../Redux/Overlay/overlayAttributes'
import { selectCta } from '../../Redux/Overlay/CallToActionAttributes'
import {getFlowcodeDetails} from '../../Redux/Flowcode/FlowcodeActions'
import ReactPlayer from 'react-player';
import fileDownload from 'js-file-download';
import Axios from 'axios';
import { setUrl } from '../../Redux/Flowcode/Flowcode';


const { Title, Text } = Typography;

function ShowProgress(props: {download: boolean}) {
    const dispatch = useAppDispatch();
    const outputVideoDetails = useAppSelector(getCampaignOtput);
    const videoProcessingProgress = useAppSelector(videoProcess);
    const outputVideoProgress = useAppSelector(videoProgress);
    
    
    const overlay = useAppSelector(selectOverlay);
    const cta = useAppSelector(selectCta);
    const flowcodeResponse = useAppSelector(getFlowcodeDetails);

    const [url, seturl] = useState('')
   
    const { download } = props;
    const [percentage, setpercentage] = useState(0)

    const [showVideo, setshowVideo] = useState(false)

    useEffect(() => {
        if(outputVideoDetails.status === 'loading' || overlay.status ==='loading' || cta.status === 'loading'
        || flowcodeResponse.status === 'loading'){
            dispatch(getVideoProgressData(''))
            setpercentage(percentage)
            setshowVideo(false)
            seturl('')
        } 
        // else if(outputVideoDetails.status === 'idle' && outputVideoDetails.output_video.video 
        // && outputVideoProgress.complete){
            
        //     setpercentage(100)
        //     setshowVideo(true)
        //     if(outputVideoProgress.complete) dispatch(setVideoProgressToNull({}))
        //     seturl(MEDIA_BASE_URL + outputVideoDetails.output_video.video)
        // }
    }, [outputVideoDetails.status])


    // const getPercentge = () => {
    //     if(outputVideoDetails.status === 'loading'){
    //         if(percentage < 99) {
    //             setTimeout(() => {
    //                 setpercentage(percentage + 1)
    //             }, 2000);
    //             getPercentge();
    //         }
    //     }
    // }


    // useEffect(() => {
    //     if(outputVideoDetails.progress_task) {
            
    //         dispatch(getVideoProcessData(outputVideoDetails.progress_task))
    //     }
    // }, [outputVideoDetails.task, outputVideoDetails.progress_task])

    useEffect(() => {
        
        if(!outputVideoProgress.complete) {
            if(outputVideoProgress.progress.current){
                let perc = outputVideoProgress.progress.current.toString()
                if(parseInt(perc) < 100) setpercentage(parseInt(perc))
                if(parseInt(perc) < 100 && outputVideoDetails.status==='loading'){
                    
                    dispatch(getVideoProgressData(''))
                    
                    // seturl('')
                }
                else if(parseInt(perc) < 100 && outputVideoDetails.status==='idle' && 
                outputVideoDetails.output_video.video && overlay.status === 'idle' && cta.status === 'idle' 
                && flowcodeResponse.status === 'idle'){
                    setpercentage(100)
                    setshowVideo(true)
                    dispatch(setVideoProgressToNull({}))
                    seturl(MEDIA_BASE_URL + outputVideoDetails.output_video.video)
                }
            }
            
        }
        if(outputVideoDetails.status === 'idle' && outputVideoDetails.output_video.video 
            && outputVideoProgress.complete && overlay.status === 'idle' && cta.status === 'idle' 
            && flowcodeResponse.status === 'idle' ){
                // setpercentage(100)
                setshowVideo(true)
                if(outputVideoProgress.complete) dispatch(setVideoProgressToNull({}))
                seturl(MEDIA_BASE_URL + outputVideoDetails.output_video.video)
            }
    }, [outputVideoProgress.progress.current, outputVideoDetails.status, overlay.status, 
        cta.status, flowcodeResponse.status])

    // useEffect(() => {
    //     if(outputVideoProgress.complete){
    //         setpercentage(100)
    //         setshowVideo(true)
    //     }
    // }, [outputVideoProgress.complete])

    const downloadVideo = async (url: string, filename: string) => {
        console.log(url);
        
        await Axios.get(url, {
        //   headers: {"Access-Control-Allow-Origin": "*"},
          responseType: 'blob',
        }).then(res => {
        console.log(res);
        
          fileDownload(res.data, filename);
        }).catch((err) => {
            console.log('Error: ',err);
            
        });
    
        // window.open(url, '_blank')
      }
      


    return (
        <div>
        <Space direction='vertical' size='large' style={{ width: '100%', textAlign: 'center' }}>
        {(percentage < 100)? <Progress type="circle" percent={percentage} />: 
        (download?<Progress type="circle" percent={percentage} />: null) }
        <div>
        {(percentage === 100)? (download?<Title level={4}>Your Download is Ready</Title>:''): <Title level={4}>Processing {download?'Download':'Preview'}</Title>}
        {/* <br />
        <br /> */}
        {(percentage === 100)? (download?'Please click on the button below to download the video':''): <Text>It may take several minutes to process video</Text>}
        </div>
        
        {(showVideo &&  !download && (percentage === 100) && (url !== ''))?
            <ReactPlayer
                url={url}
                onPlay={() => seturl(outputVideoDetails.output_video.video?outputVideoDetails.output_video.video.toString():url)}
                playing={true}
                controls={true}
                width={900}
            />
            // <video className='video' width={900} controls>
            //     <source src={url} type={'video/'+url.split('.').pop()} ></source>
            // </video>
            
            :null
        }
        {download &&
            <Button type='primary' disabled={(percentage === 100 && url !== '')?false:true} 
            onClick={() => downloadVideo(url, outputVideoDetails.name?outputVideoDetails.name+'.mp4':'Output Video.mp4')}>
                Download
            </Button>
        }
        </Space>
        </div>
    )
}

export default ShowProgress
