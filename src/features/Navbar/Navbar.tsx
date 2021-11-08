import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import DropdownCampaignList from '../FormItems/DropdownCampaignList'


function Overlay() {
  const { Header } = Layout;

  return (
      <Header
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          background: '#fff',
          alignItems: 'center'
        }}
      >
        <img
          src='https://www.flowcode.com/_next/image?url=%2Flogos%2FflowcodeTM_horizontal_black.svg&w=256&q=75'
          width='20%'
          // height='2px'
        />
        <Menu mode='horizontal' defaultSelectedKeys={['2']}>
          <Menu.Item key='0'>
            <DropdownCampaignList />    {/* Main Component..... Nothing else is important here. */}
          </Menu.Item>
          <Menu.Item key='1'>
            {' '}
            <Dropdown overlay={<></>} trigger={['click']}>
              <a
                className='ant-dropdown-link'
                onClick={e => e.preventDefault()}
              >
                Learn More <DownOutlined />
              </a>
            </Dropdown>
          </Menu.Item>
          <Menu.Item key='2'>
            <Dropdown overlay={<></>} trigger={['click']}>
              <a
                className='ant-dropdown-link'
                onClick={e => e.preventDefault()}
              >
                FAQ <DownOutlined />
              </a>
            </Dropdown>
          </Menu.Item>
          
        </Menu>
      </Header>
  )
}

export default Overlay;
