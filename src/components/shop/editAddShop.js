import React , {Component}  from 'react';
import WrappedRegistrationForm  from './basicMsg'
import Avatar from './upload'
import {Tabs} from 'antd';
require('../../utils/style/editAddShop.css')

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}
class TabBox extends Component{
    render(){
        return(
            <div>
                <div style={{ padding: 24, background: '#fff',minHeight: 380}}>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="基本信息" key="1">
                            <WrappedRegistrationForm/>
                        </TabPane>
                        <TabPane tab="证件及照片" key="2">
                            <Avatar/>
                         </TabPane>
                        <TabPane tab="收车地址" key="3">Content of Tab Pane 3</TabPane>
                        <TabPane tab="汇款账户" key="4">Content of Tab Pane 3</TabPane>
                        <TabPane tab="开票账户" key="5">Content of Tab Pane 3</TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }   
}
export default TabBox;
