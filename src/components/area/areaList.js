import React , {Component} from 'react';
import { Collapse , Row, Col , Radio , Form ,Button,Modal} from 'antd';

import BreadcrumbItems from '../layouts/BreadcrumbItems';
import TowableTree from '../layouts/TowableTree';
import {HttpRequest} from '../../utils/js/common';
import domain from '../../domain/domain';
import AreaEdit from './areaEdit'

const Panel = Collapse.Panel;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const confirm = Modal.confirm;

const itemText = {
    item1: '主页',
    item2: '系统管理',
    item3: '区域管理'
};



class areaManage extends Component{
    constructor(props){
        super(props);
        this.state={
            id:"",
            clickedId:'',
            childNode:'',
            visible: false,
            areaMsg:{},
            searchDelete:0,
            gdata:{id:1000},
            urlTree:domain.tree,
            urlDrag:domain.dragArea,
            areaRegionList:''
        }
    }
    onRef = (ref) => {
        this.child = ref
    }
    // 查询
    handleSubmit = () => {
        const _this=this;
        this.props.form.validateFields((err, values) => {
        if (!err) {
            _this.child.getTree(values);
        }
        });
    }
    // 选择树节点回调
    handleAreaTreeSelect=(selectedKeys)=>{
        if(selectedKeys.length===0){
            this.setState({
                areaMsg:{},
                id:"",
                clickedId:''
            })
            return;
        }
        this.setState({id:selectedKeys[0],clickedId:selectedKeys[0]},()=>{
            HttpRequest.getRequest(
                {
                    url: domain.areaDetail,
                    params:{id:this.state.id},
                },
                res=>{
                    this.setState({
                        areaMsg:res
                    })
                }
            )
            HttpRequest.getRequest(
                {
                    url: domain.areaRegionList,
                    params:{areaId:this.state.id},
                },
                res=>{
                    let str='';
                    res.map((item)=>{
                        str+=item.name+' ';
                        return str;
                    })
                    this.setState({
                        areaRegionList:str
                    })
                }
            )
        })
    }
    // 删除或者恢复某节点
    deleteNode=(id,isDelete)=>{
        const _this=this;
        const content=isDelete==="0"?'是否确定将该区域删除？':'是否确定将该区域恢复？'
        if(!id){
            Modal.error({
                title: '警告',
                content: '请先选择区域节点',
              }); 
              return;   
        }
        confirm({
            title: '提示',
            content: content,
            onOk() {
                HttpRequest.postRequest({
                    url:domain.areaDelete,
                    data:{id:id,deleteCode:isDelete==0?1:0}
                    },
                    result=>{
                        Modal.success({
                            title: '确定',
                            content: `操作成功！`,
                            onOk:()=>{
                                _this.handleSubmit();
                                _this.handleAreaTreeSelect([id]);
                                HttpRequest.getRequest(
                                    {
                                        url: domain.areaDetail,
                                        params:{id:id},
                                    },
                                    res=>{
                                        _this.setState({
                                            areaMsg:res
                                        })
                                    }
                                )
                            }
                        });
                })
            },
            onCancel() {},
        });
    }
    showModal = (id) => {
        this.setState({ visible: true,id:id});
    }
    showModalAdd= (childNode) => {
        if(childNode===0){
            this.setState({ childNode:0});
        }
        this.setState({ visible: true,id:''});
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleCreate = () => {
        const form = this.formRef.props.form;
        const _this=this;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.addLocation=this.state.childNode===0?0:1;
            values.clickedId=this.state.clickedId;
            values.level=this.state.childNode===0?2:1;
            HttpRequest.postRequest({
                url:domain.areaEdit,
                data:values,
                },
                result=>{
                    Modal.success({
                        title: '确定',
                        content: `操作成功！`,
                        onOk:()=>{
                            _this.setState({ visible: false });
                            if(this.state.id){
                                _this.handleAreaTreeSelect([this.state.id])
                            }
                            _this.handleSubmit();
                        }
                    });
                })
        });
    }

    render(){
        const _this=this;
        const { getFieldDecorator } = _this.props.form;
        const {areaMsg,id,gdata,urlTree,urlDrag,clickedId,areaRegionList}=this.state;
        let button;
        if(areaMsg.isDelete==="1")
        {
            button=<Button type="danger" style={{ marginLeft: 15 }} onClick={() => this.deleteNode(id,areaMsg.isDelete)}>恢复</Button>
        }else if(areaMsg.isDelete==="0"){
            button=<Button type="danger" style={{ marginLeft: 15 }} onClick={() => this.deleteNode(id,areaMsg.isDelete)}>删除</Button>      
        }
        return(
            <div>
                <BreadcrumbItems itemText={itemText}></BreadcrumbItems>
                <div className='main-content'>
                    <Row gutter={24}>
                        <Col xxl={24}>
                            <Form onSubmit={_this.handleSubmit}>
                                <FormItem
                                    label="包含已删除"
                                    labelCol={{span:2}} wrapperCol={{span:3}}
                                    className='searchDelete'
                                    >
                                    {getFieldDecorator('searchDelete',{
                                        rules: [{
                                            required: false,
                                            message: '请选择是否包含已删除',
                                        }],initialValue:0
                                    })(
                                        <RadioGroup>
                                            <Radio value={1}>是</Radio>
                                            <Radio value={0}>否</Radio>
                                        </RadioGroup>
                                    )}
                                    <Button type="primary" htmlType="submit">
                                        查询
                                    </Button>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={7}>
                            <Collapse defaultActiveKey={['1']} style={{width:450}}>
                                <Panel showArrow={false} header="区域树" key="1" disabled>
                                    <TowableTree handleAreaTreeSelect={this.handleAreaTreeSelect} searchDelete={this.state.searchDelete} onRef={this.onRef} gdata={gdata}
                                    urlTree={urlTree} urlDrag={urlDrag}/>
                                </Panel>
                            </Collapse>
                        </Col>
                        
                        <Col span={13}>
                            <Collapse defaultActiveKey={['1']} style={{width:450}}>
                                <Panel showArrow={false} header="区域信息" key="1" disabled>
                                    <p>区域编码：{areaMsg.id?areaMsg.id:''}</p>
                                    <p>区域名称：{areaMsg.name?areaMsg.name:''}</p>
                                    <p>区域全称：{areaMsg.fullname?areaMsg.fullname:''}</p>
                                    <p>区域级别：{areaMsg.level==="1"?'大区':'区域'}</p>
                                    <p>全部上级区域ID：{areaMsg.parentIds?areaMsg.parentIds:''}</p>
                                    <p>数据状态：{areaMsg.isDelete==="0"?'未删除':(areaMsg.isDelete==="1"?'已删除':'')}</p>
                                    <p>创建时间：{areaMsg.createdAt?areaMsg.createdAt:''}</p>
                                    <p>创建人：{areaMsg.createdName?areaMsg.createdName:''}</p>
                                    <p>更新时间：{areaMsg.updatedAt?areaMsg.updatedAt:''}</p>
                                    <p>更新人：{areaMsg.updatedName?areaMsg.updatedName:''}</p>
                                </Panel>
                            </Collapse>
                            <Collapse defaultActiveKey={['1']} style={{width:450,marginTop:20}}>
                                <Panel showArrow={false} header="包含行政区划" key="1" disabled>
                                    <p>{areaRegionList}</p>
                                </Panel>
                            </Collapse>
                        </Col>
                    </Row>
                    <Row className='row-bottom' style={{ textAlign: 'left',marginTop:"100px"}}>
                        <Col span={24} style={{ textAlign: 'left'}}>
                            {clickedId &&<Button type="primary" onClick={() => this.showModalAdd()}>新增</Button>}
                            {clickedId && <Button type="primary" onClick={() => this.showModalAdd(0)} style={{ marginLeft: 15 }}>新增子节点</Button>}
                            {clickedId && areaMsg.isDelete==="0"? <Button  style={{ marginLeft: 15 }} onClick={() => this.showModal(clickedId)}>修改</Button>:""}
                            {clickedId && button}
                        </Col>
                    </Row>
                    {this.state.visible? <AreaEdit  wrappedComponentRef={(formRef) => this.formRef = formRef}
                        id={id}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}/>:''}
                </div>
                
            </div>
        )
    }
}
const AreaManage = Form.create()(areaManage);
export default AreaManage