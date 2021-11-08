import circuit from '../../static/pattern_circuit.png'
import diamonds from '../../static/pattern_diamonds.png'
import dots from '../../static/pattern_Dots.png'
import standard from '../../static/pattern_standard.png'
import July_4_A from '../../static/July_4th_Independence_Day.png'
import July_4_B from '../../static/July_4th.png'
import vaccine_orange from '../../static/vaccine_orange.png'
import Stop_AAPI_hate from '../../static/Stop_AAPI_hate.png'
import Scan_Me from '../../static/Scan_Me.png'
import { LinkOutlined, YoutubeOutlined, GoogleOutlined, FacebookOutlined, LinkedinOutlined
, InstagramOutlined } from '@ant-design/icons'


const patternStyle = {height: '48px', width: '48px', padding: '13%', borderRadius: '50px'}
const colorStyle = {height: '48px', width: '48px', borderRadius: '48px', margin: '5%'}
export const flowcodeRealImageStyle = { width: '200px', marginLeft: '20%' }
export const flowcodeDemoImageStyle = { borderRadius: '100px' }


export const FLOWCODE_CLIENT_ID = '339ea76e-4709-4efd-93e0-cd76ace17a61'
export const FLOWCODE_URL = 'https://generator.flowcode.com/v1/flowcode?shorten=1'
export const FLOWCODE_BASE_URL = 'https://generator.flowcode.com/v1/flowcode?shorten=1&client_id='+FLOWCODE_CLIENT_ID


export const MEDIA_BASE_URL = 'http://flowcode.ixorasolution.com'
// export const MEDIA_BASE_URL = 'http://127.0.0.1:8000'

export const BASE_URL = MEDIA_BASE_URL+'/backend'
// export const BASE_URL = 'http://10.5.255.163:8080/backend'
// export const BASE_URL = 'http://flowcode.ixorasolution.com/backend'


export const API_BASE = {
    CAMPAIGN_UPLOAD: BASE_URL+'/api.ixora/flowcode/campaign-upload/',
    VIDEO_UPLOAD: BASE_URL+'/api.ixora/flowcode/video-upload/',
    GET_INPUT_VIDEO_DETAILS: BASE_URL+ '/api.ixora/flowcode/get-video-details/',


    
    IMAGE_UPLOAD: BASE_URL+'/api.ixora/flowcode/rail-image-upload/',
    CAMPAIGN_GENERATE: BASE_URL+'/api.ixora/flowcode/campaign-generate/',
    FLOWCODE_UPDATE: BASE_URL+'/api.ixora/flowcode/flowcode/',
    OVERLAY_UPLOAD: BASE_URL+'/api.ixora/flowcode/overlay/',
    CTA_UPLOAD: BASE_URL+'/api.ixora/flowcode/call_to_action/',

    GET_OUTPUT_VIDEO: BASE_URL+'/api.ixora/flowcode/get-output-video/',
    GET_VIDEO_PROGRESS: BASE_URL+'/celery-progress/',
}

export const cardHeaderStyle = { background: '#000000', color: 'white', fontSize: '18px', height: '55px' }

export const NameError = {
    content: "Campaign Name Missing",
    style: { }
}

export const CampaignVideoError = {
    content: "Campaign video Missing",
    style: { }
}


export const patterns = [
    {
        id: 1,
        name: 'Standard',
        value: 'default',
        style: patternStyle,
        image: standard,
        studio_config_id: '',
        isStyle: true,
        hasColor: true,
        hasPattern: true,
    },
    {
        id: 2,
        name: 'Diamonds',
        value: 'diamond',
        style: patternStyle,
        image: diamonds,
        studio_config_id: '23d5a0de-b9c5-4a18-90e8-dd91636311b7',
        isStyle: true,
        hasColor: true,
        hasPattern: true,
    },
    {
        id: 3,
        name: 'Dots',
        value: 'circle',
        style: patternStyle,
        image: dots,
        studio_config_id: '08dd8fcd-0a38-440c-980c-3817376d0d51',
        isStyle: true,
        hasColor: true,
        hasPattern: true,
    },
    {
        id: 4,
        name: 'Circuit',  
        value: 'square',
        style: patternStyle,
        image: circuit,
        studio_config_id: '9b424b41-63d3-4a2f-84ec-55c2457eac65',
        isStyle: true,
        hasColor: true,
        hasPattern: true,
    },
    {
        id: 5,
        name: 'July 4th Independence Day',  
        value: 'July 4th Independence Day',
        style: patternStyle,
        image: July_4_A,
        studio_config_id: '6fb8ae05-1374-4244-88f4-2b3bec9f0912',
        isStyle: false,
        hasColor: false,
        hasPattern: false,
    },
    {
        id: 6,
        name: 'July 4th',  
        value: 'July 4th',
        style: patternStyle,
        image: July_4_B,
        studio_config_id: 'adb49712-1816-4047-8b3b-3d7f26eef8bd',
        isStyle: false,
        hasColor: false,
        hasPattern: false,
    },
    {
        id: 7,
        name: 'Get Vaccinated',  
        value: 'Get Vaccinated',
        style: patternStyle,
        image: vaccine_orange,
        studio_config_id: 'b623e586-7fc8-445d-b095-9edc8d559da3',
        isStyle: false,
        hasColor: false,
        hasPattern: false,
    },
    {
        id: 8,
        name: 'STOP AAPI HATE',  
        value: 'STOP AAPI HATE',
        style: patternStyle,
        image: Stop_AAPI_hate,
        studio_config_id: '13c1473a-81a8-46f4-be9b-bc7c50b91e24',
        isStyle: false,
        hasColor: false,
        hasPattern: false,
    },
    {
        id: 9,
        name: 'Scan Me!',  
        value: 'Scan Me!',
        style: patternStyle,
        image: Scan_Me,
        studio_config_id: '8060081f-05f4-4296-a813-db49d5e32b92',
        isStyle: false,
        hasColor: false,
        hasPattern: false,
    },
]


// const themeLogos = [
    // {
    //   style: {
    //     circleFill: '#fff',
    //     circleBorder: flowColor.code,
    //     circleColor: flowColor.code
    //   },
    //   value: 1,
    //   name: 'Standard',
    //   show: flowPattern.isStyle
    // },
    // {
    //   style: {
    //     circleFill: flowColor.code,
    //     circleBorder: flowColor.code,
    //     circleColor: '#fff'
    //   },
    //   value: 2,
    //   name: 'Standard inverted'
    // }
//   ];

export const colors = [
    {
        name: 'Black',
        value: 1,
        style: {...colorStyle, backgroundColor: 'black' },
        code: '#000000',
        themes: [
            {
                style: {
                  circleFill: '#fff',
                  circleBorder: '#000000',
                  circleColor: '#000000'
                },
                value: 1,
                name: 'Standard',
              },
              {
                style: {
                  circleFill: '#000000',
                  circleBorder: '#000000',
                  circleColor: '#fff'
                },
                value: 2,
                name: 'Standard inverted'
              }
        ]
    },
    {
        name: 'Green',
        value: 2,
        style: {...colorStyle, backgroundColor: '#599b53'},
        code: '#599b53',
        themes: [
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#599b53',
                    circleColor: '#599b53'
                },
                value: 1,
                name: 'Standard',
            },
            {
                style: {
                    circleFill: '#599b53',
                    circleBorder: '#599b53',
                    circleColor: '#fff'
                },
                value: 2,
                name: 'Standard inverted'
            },
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#215227',
                    circleColor: '#215227'
                },
                value: 3,
                name: 'Dark',
            },
            {
                style: {
                    circleFill: '#215227',
                    circleBorder: '#215227',
                    circleColor: '#fff'
                },
                value: 4,
                name: 'Dark inverted'
            },
        ]
    },
    {
        name: 'Lime green',
        value: 3,
        style: {...colorStyle, backgroundColor: '#8fc743'},
        code: '#8fc743',
        themes: [
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#8fc743',
                    circleColor: '#8fc743'
                },
                value: 1,
                name: 'Standard',
            },
            {
                style: {
                    circleFill: '#8fc743',
                    circleBorder: '#8fc743',
                    circleColor: '#fff'
                },
                value: 2,
                name: 'Standard inverted'
            },
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#74A642',
                    circleColor: '#74A642'
                },
                value: 3,
                name: 'Dark',
            },
            {
                style: {
                    circleFill: '#74A642',
                    circleBorder: '#74A642',
                    circleColor: '#fff'
                },
                value: 4,
                name: 'Dark inverted'
            },
        ],
    },
    {
        name: 'Mint',
        value: 4,
        style: {...colorStyle, backgroundColor: '#8fd1be'},
        code: '#8fd1be',
        themes: [
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#8fd1be',
                    circleColor: '#8fd1be'
                },
                value: 1,
                name: 'Standard',
            },
            {
                style: {
                    circleFill: '#8fd1be',
                    circleBorder: '#8fd1be',
                    circleColor: '#fff'
                },
                value: 2,
                name: 'Standard inverted'
            },
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#589F89',
                    circleColor: '#589F89'
                },
                value: 3,
                name: 'Dark',
            },
            {
                style: {
                    circleFill: '#589F89',
                    circleBorder: '#589F89',
                    circleColor: '#fff'
                },
                value: 4,
                name: 'Dark inverted'
            },
        ],
    },
    {
        name: 'Robins egg',
        value: 5,
        style: {...colorStyle, backgroundColor: '#83d1d5'},
        code: '#83d1d5',
        themes: [
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#83d1d5',
                    circleColor: '#83d1d5'
                },
                value: 1,
                name: 'Standard',
            },
            {
                style: {
                    circleFill: '#83d1d5',
                    circleBorder: '#83d1d5',
                    circleColor: '#fff'
                },
                value: 2,
                name: 'Standard inverted'
            },
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#42A1A3',
                    circleColor: '#42A1A3'
                },
                value: 3,
                name: 'Dark',
            },
            {
                style: {
                    circleFill: '#42A1A3',
                    circleBorder: '#42A1A3',
                    circleColor: '#fff'
                },
                value: 4,
                name: 'Dark inverted'
            },
        ],
    },
    {
        name: 'Blue',
        value: 6,
        style: {...colorStyle, backgroundColor: '#6cb5e1'},
        code: '#6cb5e1',
        themes: [
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#6cb5e1',
                    circleColor: '#6cb5e1'
                },
                value: 1,
                name: 'Standard',
            },
            {
                style: {
                    circleFill: '#6cb5e1',
                    circleBorder: '#6cb5e1',
                    circleColor: '#fff'
                },
                value: 2,
                name: 'Standard inverted'
            },
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#338BB5',
                    circleColor: '#338BB5'
                },
                value: 3,
                name: 'Dark',
            },
            {
                style: {
                    circleFill: '#338BB5',
                    circleBorder: '#338BB5',
                    circleColor: '#fff'
                },
                value: 4,
                name: 'Dark inverted'
            },
        ],
    },
    {
        name: 'Indigo',
        value: 7,
        style: {...colorStyle, backgroundColor: '#415ca0'},
        code: '#415ca0',
        themes: [
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#415ca0',
                    circleColor: '#415ca0'
                },
                value: 1,
                name: 'Standard',
            },
            {
                style: {
                    circleFill: '#415ca0',
                    circleBorder: '#415ca0',
                    circleColor: '#fff'
                },
                value: 2,
                name: 'Standard inverted'
            },
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#1A2A55',
                    circleColor: '#1A2A55'
                },
                value: 3,
                name: 'Dark',
            },
            {
                style: {
                    circleFill: '#1A2A55',
                    circleBorder: '#1A2A55',
                    circleColor: '#fff'
                },
                value: 4,
                name: 'Dark inverted'
            },
        ],
    },
    {
        name: 'Violet',
        value: 8,
        style: {...colorStyle, backgroundColor: '#7e62a1'},
        code: '#7e62a1',
        themes: [
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#7e62a1',
                    circleColor: '#7e62a1'
                },
                value: 1,
                name: 'Standard',
            },
            {
                style: {
                    circleFill: '#7e62a1',
                    circleBorder: '#7e62a1',
                    circleColor: '#fff'
                },
                value: 2,
                name: 'Standard inverted'
            },
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#34255B',
                    circleColor: '#34255B'
                },
                value: 3,
                name: 'Dark',
            },
            {
                style: {
                    circleFill: '#34255B',
                    circleBorder: '#34255B',
                    circleColor: '#fff'
                },
                value: 4,
                name: 'Dark inverted'
            },
        ],
    },
    {
        name: 'Magenta',
        value: 9,
        style: {...colorStyle, backgroundColor: '#c9529e'},
        code: '#c9529e',
        themes: [
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#c9529e',
                    circleColor: '#c9529e'
                },
                value: 1,
                name: 'Standard',
            },
            {
                style: {
                    circleFill: '#c9529e',
                    circleBorder: '#c9529e',
                    circleColor: '#fff'
                },
                value: 2,
                name: 'Standard inverted'
            },
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#992A77',
                    circleColor: '#992A77'
                },
                value: 3,
                name: 'Dark',
            },
            {
                style: {
                    circleFill: '#992A77',
                    circleBorder: '#992A77',
                    circleColor: '#fff'
                },
                value: 4,
                name: 'Dark inverted'
            },
        ],
    },
    {
        name: 'Hot Pink',
        value: 10,
        style: {...colorStyle, backgroundColor: '#f390bc'},
        code: '#f390bc',
        themes: [
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#f390bc',
                    circleColor: '#f390bc'
                },
                value: 1,
                name: 'Standard',
            },
            {
                style: {
                    circleFill: '#f390bc',
                    circleBorder: '#f390bc',
                    circleColor: '#fff'
                },
                value: 2,
                name: 'Standard inverted'
            },
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#D3438C',
                    circleColor: '#D3438C'
                },
                value: 3,
                name: 'Dark',
            },
            {
                style: {
                    circleFill: '#D3438C',
                    circleBorder: '#D3438C',
                    circleColor: '#fff'
                },
                value: 4,
                name: 'Dark inverted'
            },
        ],
    },
    {
        name: 'Red',
        value: 11,
        style: {...colorStyle, backgroundColor: '#bf2026'},
        code: '#bf2026',
        themes: [
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#bf2026',
                    circleColor: '#bf2026'
                },
                value: 1,
                name: 'Standard',
            },
            {
                style: {
                    circleFill: '#bf2026',
                    circleBorder: '#bf2026',
                    circleColor: '#fff'
                },
                value: 2,
                name: 'Standard inverted'
            },
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#A71E26',
                    circleColor: '#A71E26'
                },
                value: 3,
                name: 'Dark',
            },
            {
                style: {
                    circleFill: '#A71E26',
                    circleBorder: '#A71E26',
                    circleColor: '#fff'
                },
                value: 4,
                name: 'Dark inverted'
            },
        ],
    },
    {
        name: 'Orange',
        value: 12,
        style: {...colorStyle, backgroundColor: '#ef6d46'},
        code: '#ef6d46',
        themes: [
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#ef6d46',
                    circleColor: '#ef6d46'
                },
                value: 1,
                name: 'Standard',
            },
            {
                style: {
                    circleFill: '#ef6d46',
                    circleBorder: '#ef6d46',
                    circleColor: '#fff'
                },
                value: 2,
                name: 'Standard inverted'
            },
            {
                style: {
                    circleFill: '#fff',
                    circleBorder: '#9F2022',
                    circleColor: '#9F2022'
                },
                value: 3,
                name: 'Dark',
            },
            {
                style: {
                    circleFill: '#9F2022',
                    circleBorder: '#9F2022',
                    circleColor: '#fff'
                },
                value: 4,
                name: 'Dark inverted'
            },
        ],
    },
]


export const UrlTypes = [
    {
        id: 1,
        icon: <LinkOutlined />,
        title: 'Enter or paste website URL',
        placeholder: 'www.mywebsite.com'
    },
    {
        id: 2,
        icon: <YoutubeOutlined />,
        title: 'Enter or paste youtube URL',
        placeholder: 'www.youtube.com/c/WillSmith'
    },
    {
        id: 3,
        icon: <GoogleOutlined />,
        title: 'Enter or paste document URL',
        placeholder: 'https://docs.google.com/document'
    },
    {
        id: 4,
        icon: <FacebookOutlined />,
        title: 'Enter the link to your Facebook profile or post',
        placeholder: 'facebook.com/GetFlowcode'
    },
    {
        id: 5,
        icon: <InstagramOutlined />,
        title: 'Enter your Instagram handle',
        placeholder: '@ handle'
    },
    {
        id: 6,
        icon: <LinkedinOutlined />,
        title: 'Enter the link to your LinkedIn profile or post',
        placeholder: 'www.linkedin.com/in/erik-hanson/'
    },
]