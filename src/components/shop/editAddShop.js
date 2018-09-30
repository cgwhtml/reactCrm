import React , {Component}  from 'react';
import WrappedRegistrationForm  from './basicMsg'
import UploadPhotos from './upload'
import {Tabs,Button,Modal} from 'antd';
import moment from 'moment'
import {HttpRequest} from '../../utils/js/common';
import domain from '../../domain/domain';
require('../../utils/style/editAddShop.css')

const TabPane = Tabs.TabPane;


class TabBox extends Component{
    constructor(){
        super();
        this.state={
            key:1,
            basicMsg:{},
            uploadImg:{}
        };   
      }
    callback=(key)=> {
        this.setState({key})
    }
    
    handleCreate = (e) => {
        let submitObj={};
        let that=this;
        if(this.state.key==1){
            this.formRefs.handleSubmit(e)
            const propsBasicMsg=this.formRefs.getItemsValue();
            propsBasicMsg.joinDate=propsBasicMsg.joinDate?moment(propsBasicMsg.joinDate)._i:'';
            propsBasicMsg.openDate=propsBasicMsg.openDate?moment(propsBasicMsg.openDate)._i:'';
            propsBasicMsg.joinRegions=JSON.stringify(propsBasicMsg.joinRegions)
            // this.setState({
            //     basicMsg:propsBasicMsg
            // })
            this.setState({basicMsg: propsBasicMsg }, () => {
                console.log(that.state.basicMsg)
                console.log(that.state.uploadImg)
                HttpRequest.postRequest({
                    url:domain.addShop,
                    data:Object.assign(that.state.basicMsg,that.state.uploadImg)
                    },
                    result=>{
                        console.log(result)
                    })
            })
        }else if(this.state.key==2){
            this.formRef.handleSubmit2(e);
            const uploadImg=this.formRef.getItemsValue2();
            this.setState({uploadImg: uploadImg }, () => {
                console.log(that.state.uploadImg)
                HttpRequest.postRequest({
                    url:domain.addShop,
                    data:Object.assign(that.state.basicMsg,that.state.uploadImg)
                    },
                    result=>{
                        console.log(result)
                    })
            })
        }
    }
    render(){
        return(
            <div>
                <div style={{ padding: 24, background: '#fff',minHeight: 380}}>
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="基本信息" key="1">
                            <WrappedRegistrationForm  wrappedComponentRef={(form) => this.formRefs = form}/>
                        </TabPane>
                        <TabPane tab="证件及照片" key="2">
                            <UploadPhotos wrappedComponentRef={(form) => this.formRef = form}/>
                         </TabPane>
                        <TabPane tab="收车地址" key="3">Content of Tab Pane 3</TabPane>
                        <TabPane tab="汇款账户" key="4">Content of Tab Pane 3</TabPane>
                        <TabPane tab="开票账户" key="5">Content of Tab Pane 3</TabPane>
                    </Tabs>
                    <div style={{textAlign:"right"}}>
                        <Button type="primary">取消</Button>
                        <Button type="primary" htmlType="submit" style={{marginLeft:'30px'}} onClick={this.handleCreate}>确定</Button>
                    </div>
                </div>
            </div>
        )
    }   
}
export default TabBox;
