import React, { Component } from 'react';
import { NavLink,BrowserRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import axios from 'axios';


import MainRoutes from '../../routes/MainRoutes';
import TooltipModal from '../layouts/TooltipModal';

import logo from '../../logo.svg';
import '../../utils/style/layout.css'
import '../../utils/style/common.less'

const { Header, Sider, Content ,Footer} = Layout;
const SubMenu = Menu.SubMenu;


class SiderDemo extends Component {
    static propTypes = {
        // resp: PropTypes.bool
    }
    state = {
        collapsed: false,
        content:'',
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    handleClick = (e) => {
        console.log('click ', e);
        console.log( e.key);
    }
    blocker=()=>{
        var _this=this;
        function showTips(data){
            _this.setState({
                content:data
            })
            _this.refs.getToolModal.showModal();
        }
        // 添加响应拦截器
        axios.interceptors.response.use(function (response) {
            if(response.data.error!=0){
                showTips(response.data.message);
            }
            // 对响应数据做点什么
            return response;
        }, function (error) {
            // 对响应错误做点什么
            showTips('服务器请求失败！');
            return Promise.reject(error);
        });
    }
    componentDidMount=()=>{
        this.blocker();
    }
    componentWillReceiveProps=(nextProps)=>{
        console.log(nextProps);
    }
    render() {
        return (
        <BrowserRouter
            // basename="/system"
            basename="/"
            forceRefresh={false}
            keyLength={12}
        >
            <Layout>
       
                <TooltipModal ref='getToolModal' content={this.state.content} ></TooltipModal>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <img src={require('../../utils/image/logo-system.png')} width={120}   alt="logo" className="logo" />
                    <Menu
                        onClick={this.handleClick}
                        theme="dark"
                        // defaultSelectedKeys={['1']}
                        // defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>主页</span></span>}>
                            <Menu.Item key="1">
                                <NavLink exact to='/'>门店管理</NavLink>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <NavLink exact to='/userControl'>用户管理</NavLink>
                            </Menu.Item>
                            {/*<SubMenu key="g1" title="系统管理">*/}
                                {/*<Menu.Item key="3">*/}
                                    {/*<NavLink exact to='/'>门店管理</NavLink>*/}
                                {/*</Menu.Item>*/}
                                {/*<Menu.Item key="4">*/}
                                    {/*<NavLink exact to='/userControl'>用户管理</NavLink>*/}
                                {/*</Menu.Item>*/}
                            {/*</SubMenu>*/}
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content style={{ margin: '0 16px'}}>
                        <MainRoutes></MainRoutes>
                    </Content>
                    {/*<Footer style={{ textAlign: 'center' }}>*/}
                        {/*/!*Ant Design ©2018 Created by Ant UED*!/*/}
                    {/*</Footer>*/}
                </Layout>
                
            </Layout>
            </BrowserRouter>
        );
    }
}

export default SiderDemo;
