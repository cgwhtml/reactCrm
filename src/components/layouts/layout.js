import React, { Component } from 'react';
import { NavLink,HashRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import axios from 'axios';
import {HttpRequest} from '../../utils/js/common'
import domain from '../../domain/domain';



import MainRoutes from '../../routes/MainRoutes';
import TooltipModal from '../layouts/TooltipModal';


import '../../utils/style/layout.css'
import '../../utils/style/common.less'

const { Header, Sider, Content ,Footer} = Layout;
const SubMenu = Menu.SubMenu;

class AppLayout extends Component {
    static propTypes = {}
    state = {
        collapsed: false,
        content:'',
        openKeys:['sub1'],
        menuItems:[],
        userName:''
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    handleClick = (e) => {
   
    }

    handleSelect = ({ item, key, selectedKeys }) =>{
       
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
            console.log(response)
            if(response.data.error!==0){
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
        HttpRequest.getRequest(
            {
                url:domain.routeApi,
            },
            res=>{
                const menu=[{id:'sub1',title:'主页', url:'/',children:[]}]
                menu[0].children=res.menu
                this.setState({
                    menuItems:menu,
                    userName:res.userInfo.fullname
                },()=>{
                    this.renderMenusNodes(this.state.menuItems)
                })
            }
        )
    }
    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
          return;
        };
    }
    renderMenusNodes=(data)=>{
        return data.map((item)=>{
            if(item.children && item.children.length!==0){
                return(
                    <SubMenu key={item.id} title={<span><Icon type="home" /><span>{item.title}</span></span>} >
                        {this.renderMenusNodes(item.children)}
                    </SubMenu>
                )
            }
            return (<Menu.Item key={item.id} >
                        <NavLink exact to={item.url}>{item.title}</NavLink>
                    </Menu.Item>
            )
        })
    }
    render() {
        const _this=this;
        const {userName}=_this.state;
        return (
        <HashRouter
            basename="/"
            //forceRefresh={false}
            //keyLength={12}
        >
            <Layout>
                <TooltipModal ref='getToolModal' content={this.state.content} ></TooltipModal>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={_this.state.collapsed}
                >
                    <img src={ this.state.collapsed ? 'https://s7.weacar.com/images/icon/head-pictu-icon.png' :require('../../utils/image/logo-system.png')}    alt="logo" className="logo" />
                    <Menu
                        onClick={_this.handleClick}
                        theme="dark"
                        onSelect={_this.handleSelect}
                        defaultOpenKeys={_this.state.openKeys}
                        // defaultSelectedKeys={['1']}
                        // defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                       {_this.renderMenusNodes(_this.state.menuItems)} 
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0,paddingLeft:15,height:40,lineHeight:"40px"}}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <ul style={{float:"right",marginRight:20,listStyle:"none"}}>
                            <li>
                            <a href="/system/logout">{`您好，${userName}!`} | 登出  <Icon type="export" /></a>
                                
                            </li>
                        </ul>
                    </Header>
                    <Content style={{ margin: '0 16px'}}>
                        <MainRoutes></MainRoutes>
                    </Content>
                    {/*<Footer style={{ textAlign: 'center' }}>*/}
                        {/*/!*Ant Design ©2018 Created by Ant UED*!/*/}
                    {/*</Footer>*/}
                </Layout>
            </Layout>
            </HashRouter>
        );
    }
}

export default AppLayout;
