import { Layout } from 'antd';
import React, { Component } from 'react';
import LeftNav from './left-nav/index';
import withCheckLogin from '../../containers/with-check-login';
import HeaderMain from './header-main'
import './home.less';

const { Header, Content, Footer } = Layout;

@withCheckLogin
class BasicLayout extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { pathname} = this.props.location
        
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <LeftNav pathname={pathname} />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <HeaderMain />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout