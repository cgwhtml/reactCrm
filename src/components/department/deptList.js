import React , {Component} from 'react';
import { Collapse , Row, Col , Radio , Form ,Button,Modal} from 'antd';

import BreadcrumbItems from '../layouts/BreadcrumbItems';
import TowableTree from '../layouts/TowableTree';
import {HttpRequest} from '../../utils/js/common';
import domain from '../../domain/domain';
import AreaEdit from './deptEdit'

const Panel = Collapse.Panel;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const confirm = Modal.confirm;

const itemText = {
    item1: '主页',
    item2: '系统管理',
    item3: '组织机构管理'
};



class deptManage extends Component{
    constructor(props){
        super(props);
        this.state={
            id:"",
            clickedId:'',
            childNode:'',
            visible: false,
            deptMsg:{},
            searchDelete:0,
            gdata:{id:'0001'},
            urlTree:domain.deptTreeList,
            urlDrag:domain.dragDept
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
                deptMsg:{},
                id:'',
                clickedId:''
            })
            return;
        }
        this.setState({id:selectedKeys[0],clickedId:selectedKeys[0]},()=>{
            HttpRequest.getRequest(
                {
                    url: domain.deptDetail,
                    params:{id:this.state.id},
                },
                res=>{
                    this.setState({
                        deptMsg:res
                    })
                }
            )
        })
    }
    // 删除或者恢复某节点
    deleteNode=(id,isDelete)=>{
        const _this=this;
        const content=isDelete==0?'是否确定将该机构删除？':'是否确定将该机构恢复？'
        if(!id){
            Modal.error({
                title: '警告',
                content: '请先选择机构',
              }); 
              return;   
        }
        confirm({
            title: '提示',
            content: content,
            onOk() {
                HttpRequest.postRequest({
                    url:domain.deptDelete,
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
                                        url: domain.deptDetail,
                                        params:{id:id},
                                    },
                                    res=>{
                                        _this.setState({
                                            deptMsg:res
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
            HttpRequest.postRequest({
                url:domain.deptEdit,
                data:values
                },
                result=>{
                    Modal.success({
                        title: '确定',
                        content: `保存成功！`,
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
        const {deptMsg,id,gdata,urlTree,urlDrag,clickedId}=this.state;
        let button;
        if(deptMsg.isDelete==="1")
        {
            button=<Button type="danger" style={{ marginLeft: 15 }} onClick={() => this.deleteNode(id,deptMsg.isDelete)}>恢复</Button>
        }else if(deptMsg.isDelete==="0"){
            button=<Button type="danger" style={{ marginLeft: 15 }} onClick={() => this.deleteNode(id,deptMsg.isDelete)}>删除</Button>      
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
                                            <Radio value={3}>是</Radio>
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
                                <Panel showArrow={false} header="组织机构树" key="1" disabled>
                                    <TowableTree handleAreaTreeSelect={this.handleAreaTreeSelect} searchDelete={this.state.searchDelete} onRef={this.onRef} gdata={gdata}
                                    urlTree={urlTree} urlDrag={urlDrag}/>
                                </Panel>
                            </Collapse>
                        </Col>
                        
                        <Col span={13}>
                            <Collapse defaultActiveKey={['1']} style={{width:450}}>
                                <Panel showArrow={false} header="组织机构信息" key="1" disabled>
                                    <p>机构编码：{deptMsg.id?deptMsg.id:''}</p>
                                    <p>机构名称：{deptMsg.name?deptMsg.name:''}</p>                         
                                    <p>机构全称：{deptMsg.fullName?deptMsg.fullName:''}</p>
                                    <p>机构主管：{deptMsg.manager?deptMsg.manager:''}</p>
                                    <p>上级部门ID：{deptMsg.parentId?deptMsg.parentId:''}</p>
                                    <p>上级部门名称：{deptMsg.parentIds?deptMsg.parentIds:''}</p>
                                    <p>全部上级部门ID：{deptMsg.parentIds?deptMsg.parentIds:''}</p>
                                    <p>数据状态：{deptMsg.isDelete==="0"?'未删除':(deptMsg.isDelete==="1"?'已删除':'')}</p>
                                    <p>创建时间：{deptMsg.createdAt?deptMsg.createdAt:''}</p>
                                    <p>创建人：{deptMsg.createdName?deptMsg.createdName:''}</p>
                                    <p>更新时间：{deptMsg.updatedAt?deptMsg.updatedAt:''}</p>
                                    <p>更新人：{deptMsg.updatedName?deptMsg.updatedName:''}</p>
                                </Panel>
                            </Collapse>
                        </Col>
                    </Row>
                    <Row className='row-bottom' style={{ textAlign: 'left',marginTop:"100px"}}>
                        <Col span={24} style={{ textAlign: 'left'}}>
                            {clickedId && <Button type="primary" onClick={() => this.showModalAdd()}>新增</Button>}
                            {clickedId && <Button type="primary" onClick={() => this.showModalAdd(0)} style={{ marginLeft: 15 }}>新增子节点</Button>}
                            {clickedId && deptMsg.isDelete==="0"?  <Button  style={{ marginLeft: 15 }} onClick={() => this.showModal(clickedId)}>修改</Button>:""}
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
const DeptManage = Form.create()(deptManage);
export default DeptManage