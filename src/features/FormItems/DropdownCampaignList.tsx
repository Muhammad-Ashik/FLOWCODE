import React, { useEffect, useState } from 'react'
import { Menu, Dropdown, Typography, Image, Space, Button, Layout, Row, Col } from 'antd';
import { DownOutlined, DeleteOutlined } from '@ant-design/icons';
import { setAllCampaign, getAllCampaigns, fetchAllCampaigns } from '../../Redux/Requests/AllCampaigns';
import { StandardCampaign } from '../../Redux/Requests/CampaignInterfaces';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import axios from 'axios'
import { API_BASE, MEDIA_BASE_URL, patterns, colors } from '../Flowcode/constants'
import { setName, setVideoId, setId,setFlowcodeId,setOverlayId, setCtaId,
    setOutputVideoId, setImageId } from '../../Redux/Requests/CampaignRequests';
import { setInputVideoData } from '../../Redux/Requests/VideoRequests'
import { setOutputVideoData } from '../../Redux/Requests/OutputVideoRequests'
import { setInputImageData } from '../../Redux/Requests/ImageRequests'
import { setOverlay } from '../../Redux/Overlay/overlayAttributes'
import { setCtaDetails } from '../../Redux/Overlay/CallToActionAttributes'
import { setFlowcodeData, setFlowcodeUrlOrcode } from '../../Redux/Flowcode/FlowcodeActions'
import { setPattern } from '../../Redux/Flowcode/FlowcodePattern'
import { setColor } from '../../Redux/Flowcode/FlowcodeColor'
import { setTheme } from '../../Redux/Flowcode/FlowcodeTheme'
import { setFlowcodeCenterImageData } from '../../Redux/Flowcode/FlowcodeCenterImage'
import { setFlowcodeUploadImageData } from '../../Redux/Flowcode/FlowcodeUploadImage'
import { setUrl } from '../../Redux/Flowcode/Flowcode'
import { setSpin } from '../../Redux/Overlay/Spinner'
import { setConfigId } from '../../Redux/Flowcode/FlowcodeStudioConfig'


const { Text } = Typography;
const { Header, Footer, Sider, Content } = Layout;

function DropdownCampaignList() {
    const dispatch = useAppDispatch();
    const allCampaigns = useAppSelector(getAllCampaigns)
    const [campaigns, setcampaigns] = useState([])

    const [selectedCampaign, setselectedCampaign] = useState({})

    const [openMenu, setopenMenu] = useState(false)
    const [password, setpassword] = useState('')


    useEffect(() => {
        fetchCampaign()
      }, [])

    const selectFlowcodePattern = (value: string) => {
    let pat = patterns.filter(
        val => value === val.studio_config_id.toString()
    );
    let act = {
        name: pat[0].name,
        value: pat[0].studio_config_id,
        isStyle: pat[0].isStyle?pat[0].isStyle:false,
        hasColor: pat[0].hasColor,
        hasPattern: pat[0].hasPattern
    };
    dispatch(setPattern(act));
    };


    const fetchVideo = async (videoId: number | null, input: boolean) => {
        let API_URL = API_BASE.VIDEO_UPLOAD
        if(videoId) {
            
            API_URL = API_URL + videoId + '/'
            const response = await axios.get(API_URL)
            .then((response) => {
                if(input) dispatch(setInputVideoData(response.data))
                else dispatch(setOutputVideoData(response.data))

                dispatch(setSpin({spin: false, status: 'idle'}))
                return response;
            })
            .then((data) => {})
            .catch(err => {});
            return response
        }
        return null
    }


    const fetchImage = async (imageId: number|null) => {
        let API_URL = API_BASE.IMAGE_UPLOAD 
        if(imageId) {
            API_URL = API_URL + imageId + '/'
            const response = await axios.get(API_URL)
            .then((response) => {
                console.log(response.data);
                dispatch(setInputImageData(response.data))
                return response;
            })
            .then((data) => {})
            .catch(err => {});
            return response
        }
    }


    const fetchFlowcodeImage = async (imageId: number|null, center: boolean) => {
        let API_URL = API_BASE.IMAGE_UPLOAD 
        if(imageId) {
            API_URL = API_URL + imageId + '/'
            const response = await axios.get(API_URL)
            .then((response) => {
                if(center) dispatch(setFlowcodeCenterImageData(response.data))
                else dispatch(setFlowcodeUploadImageData(response.data))
                return response;
            })
            .then((data) => {})
            .catch(err => {});
            return response
        }
    }

    const setFlowcode = (flowcode: any) => {
        const URL = {
            url: flowcode.url_or_code,
            status: 'loading'
          };
        const url_or_code = {
            url_or_code: flowcode.url_or_code,
          }
        dispatch(setUrl(URL));
        dispatch(setFlowcodeUrlOrcode(url_or_code))

        if(flowcode.created_with === 'G'){
            // dispatch(setUrl(URL));
            // dispatch(setFlowcodeUrlOrcode(url_or_code))
            
            if(flowcode.pattern){
                selectFlowcodePattern(flowcode.pattern)
                let gotPattern = patterns.find((pat) => pat.studio_config_id === flowcode.pattern)
                // if(gotPattern) dispatch(setPattern(gotPattern))
                if(gotPattern?.hasColor){
                    let gotColor = colors.find((col) => col.name === flowcode.color)
                    if(gotColor) dispatch(setColor(gotColor))
                    let gotTheme = gotColor?.themes.find((th) => th.name === flowcode.theme)
                    if(gotTheme){
                        let data = {
                            value: gotTheme?.value,
                            name: gotTheme?.name,
                            code: gotTheme?.style.circleColor,
                        }
                        if(data) dispatch(setTheme(data))
                    }
                }
            }
            if(flowcode.flowcode_center_image){
                fetchFlowcodeImage(flowcode.flowcode_center_image, true)
            }
        } else if(flowcode.created_with === 'I'){
            fetchFlowcodeImage(flowcode.flowcode_image, false)
        } else{
            dispatch(setConfigId({studio_config_id: flowcode.pattern?flowcode.pattern:''}));
        }

    }

    const fetchFlowcode = async (Id: number|null) => {
        let API_URL = API_BASE.FLOWCODE_UPDATE 
        if(Id) {
            API_URL = API_URL + Id + '/'
            const response = await axios.get(API_URL)
            .then((response) => {
                dispatch(setFlowcodeData(response.data))
                setFlowcode(response.data)

                return response;
            })
            .then((data) => {})
            .catch(err => {});
            return response
        }
        
    }
    
    
    const fetchCampaign = async () => {
        const API_URL = API_BASE.GET_OUTPUT_VIDEO

        const response = await axios.get(API_URL)
            .then((response) => {
                setcampaigns(response.data)
                dispatch(setAllCampaign(response.data))
                return response.data;
            })
            .catch(err => {});
        return response
    }

    const deleteCampaign = async (id: number | string | null) => {
        if(id){
            const API_URL = API_BASE.CAMPAIGN_UPLOAD + id

            const response = await axios.delete(API_URL)
                .then((response) => {
                    setAllCampaign([])
                    fetchCampaign()
                    // dispatch(fetchAllCampaigns())
                    return response.data;
                })
                .catch(err => {});
            return response
        }
        
    }

    const setAll = (campaign: StandardCampaign) => {
        dispatch(setSpin({spin: true, status: 'idle'}))
        setselectedCampaign(campaign)
        let nameValue = {
            name: campaign.name? campaign.name.toString(): ''
        }
        
        fetchVideo(campaign.video.video_id, true)
        fetchVideo(campaign.output_video.video_id, false)
        fetchImage(campaign.image.image_id)
        fetchFlowcode(campaign.flowcode.flowcode_id)




        dispatch(setId({campaign_id: campaign.campaign_id?campaign.campaign_id:0}))
        dispatch(setName(nameValue))
        dispatch(setVideoId({video: campaign.video.video_id}))
        dispatch(setFlowcodeId({flowcode: campaign.flowcode.flowcode_id}))
        dispatch(setOverlayId({overlay: campaign.overlay.overlay_id}))
        dispatch(setCtaId({cta: campaign.cta.cta_id}))
        dispatch(setOutputVideoId({video: campaign.output_video.video_id}))
        dispatch(setImageId({image: campaign.image.image_id}))
        dispatch(setOverlay({...campaign.overlay}))
        dispatch(setCtaDetails({...campaign.cta}))
    }


    const menu = (
        <Menu>
            {!openMenu? 
            <div>
                <input type="password" onChange={(e) => setpassword(e.currentTarget.value)}></input>
                <Button onClick={() => {
                    if(password === '12345'){
                        setopenMenu(true)
                    }
                    console.log(password)
                }}>OK</Button>
            </div>
            :(campaigns.length && openMenu)? campaigns.map((campaign: StandardCampaign) => {
                return (
                <Menu.Item key={campaign.campaign_id}>
                        <div className="columns is-mobile level" style={{textAlign: 'center'}}>
                            <div className="column">
                            <Image onClick={() => setAll(campaign)}
                            src={MEDIA_BASE_URL + campaign.video.video?.slice(0, -3)+'jpg'}
                            width={100} preview={false}
                            ></Image>
                            </div>
                            <div className="column is-two-fifths has-text-centered">
                            <Text onClick={() => setAll(campaign)}>{campaign.name}</Text>
                            </div>
                            <div className="column">
                                {/* <DeleteOutlined onClick={(e) => {e.preventDefault(); deleteCampaign(campaign.campaign_id)}}
                                    style={{color: 'red'}} /> */}
                                    <Button icon={<DeleteOutlined />} onClick={(e) => {e.preventDefault(); deleteCampaign(campaign.campaign_id)}}
                                    style={{color: 'red'}} ></Button>
                            {/* <Button type='primary' 
                                    onClick={(e) => {e.preventDefault(); deleteCampaign(campaign.campaign_id)}}
                                    style={{backgroundColor: 'red'}}>Delete</Button> */}
                            </div>
                        </div>
                        
                </Menu.Item>
                
                )
                })
                :
                <Space>
                    {campaigns.length === 0 && <Text>No Design Found</Text>}
                </Space>
            }
        </Menu>
      )


    
    

    return (
        <Dropdown overlay={menu} trigger={['click']}
        overlayStyle={{maxHeight: '350px', overflow: 'auto'}}
        >
            <a
            className='ant-dropdown-link'
            onClick={e => e.preventDefault()}
            >
            Existing Designs <DownOutlined />
            </a>
        </Dropdown>
    )
}

export default DropdownCampaignList
