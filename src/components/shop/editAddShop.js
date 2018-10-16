import React , {Component}  from 'react';
import WrappedRegistrationForm  from './basicMsg'
import UploadPhotos from './upload'
import AddressList from './addressList'
import InvoiceInfoList from './invoiceInfoList'
import RemittanceAccountList from './remittanceAccountList'
import {Tabs,Button,Modal} from 'antd';
import {HttpRequest} from '../../utils/js/common';
import domain from '../../domain/domain';
require('../../utils/style/editAddShop.css')

const TabPane = Tabs.TabPane;


class TabBox extends Component{
    constructor(props){
        super(props);
        this.state={
            key:1,
            basicMsg:{},
            uploadImg:{},
            content:'',
            id:props.location.state?props.location.state.id:''
        };   
      }
    callback=(key)=> {
        this.setState({key})
    }
    countDown(message) {
        let secondsToGo = 2;
        const modal = Modal.error({
            title: '提示',
            content: message,
        });
        setInterval(() => {
            secondsToGo -= 1;
        }, 1000);
        setTimeout(() => modal.destroy(), secondsToGo * 1000);
    }
    handleCreate = (e) => {
        let that=this;
        const id=this.props.location.state?this.props.location.state.id:'';
        if(!this.formRefs.handleSubmit(e)){
            this.countDown('请完善基本信息');
            return;
        }
        if(!this.formRef.handleSubmit2(e)){
            this.countDown('请完善证件以及照片');
            return;
        }
        const propsBasicMsg=this.formRefs.getItemsValue();
        const uploadImg=this.formRef.getItemsValue2();
        if(propsBasicMsg.joinDate){
            let joinDate=new Date(propsBasicMsg.joinDate._d)
            let datetime=joinDate.getFullYear() + '-' + (joinDate.getMonth() + 1) + '-' + joinDate.getDate(); 
            propsBasicMsg.joinDate=datetime;
        }
        if(propsBasicMsg.openDate){
            let openDate=new Date(propsBasicMsg.openDate._d)
            let openDates=openDate.getFullYear() + '-' + (openDate.getMonth() + 1) + '-' + openDate.getDate(); 
            propsBasicMsg.openDate=openDates;
        }
        propsBasicMsg.joinRegions=JSON.stringify(propsBasicMsg.joinRegions)
        if(id){
            propsBasicMsg.id=id;
        }
        this.setState({basicMsg: propsBasicMsg,uploadImg: uploadImg }, () => {
            HttpRequest.postRequest({
                url:domain.addShop,
                data:Object.assign(that.state.basicMsg,that.state.uploadImg)
                },
                result=>{
                    Modal.success({
                        title: '确定',
                        content: `提交成功`,
                        onOk:()=>{
                            window.location.href='/system/'
                        }
                    });
                })
        })
    }
    render(){
        return(
            <div>
                <div style={{ padding: 24, background: '#fff',minHeight: 380}}>
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="基本信息" key="1" forceRender={true}>
                            <WrappedRegistrationForm  wrappedComponentRef={(form) => this.formRefs = form} id={this.state.id}/>
                        </TabPane>
                        <TabPane tab="证件及照片" key="2" forceRender={true}>
                            <UploadPhotos wrappedComponentRef={(form) => this.formRef = form} id={this.state.id}/>
                         </TabPane>
                        <TabPane tab="收车地址" key="3">
                            <AddressList id={this.state.id}/>
                        </TabPane>
                        <TabPane tab="汇款账户" key="4">
                            <RemittanceAccountList id={this.state.id}/>
                        </TabPane>
                        <TabPane tab="开票账户" key="5">
                            <InvoiceInfoList id={this.state.id}/>
                        </TabPane>
                    </Tabs>
                    {this.state.key==1 || this.state.key==2?(<div  style={{textAlign:"center"}}>
                        <Button type="primary">取消</Button>
                        <Button type="primary" htmlType="submit" style={{marginLeft:'30px'}} onClick={this.handleCreate}>确定</Button>
                    </div>):''}
                </div>
            </div>
        )
    }   
}
export default TabBox;
