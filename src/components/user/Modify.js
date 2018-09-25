//wq 用户修改
import React , {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Input, Button, Select, Tabs, Icon, Tree,Table } from 'antd';


import BreadcrumbItems from '../layouts/BreadcrumbItems';
import TooltipModal from '../layouts/TooltipModal';
import {ModalBox , MasterBrand, NotMainBrand} from './ModalBox'


const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const TreeNode = Tree.TreeNode;

const formColLayout12 = {
    xxl: { span:12 },
};
const formColLayout6 = {
    xxl: { span:6 },
};

const itemText={
    item1:'主页',
    item2:'系统管理',
    item3:'添加/修改门店信息'
};

const treeBrandData = [
    {
        title: '全国',
        key: '0-0',
        children: [
            {
                title: '浙江省',
                key: '0-0-0',
                children: [
                    { title: '杭州市', key: '0-0-0-0' },
                    { title: '金华市', key: '0-0-0-1' },
                    { title: '宁波市', key: '0-0-0-2' },
                ],
            },
            {
                title: '江苏省',
                key: '0-0-1',
                children: [
                    { title: '常州市', key: '0-0-1-0' },
                    { title: '无锡市', key: '0-0-1-1' },
                    { title: '盐城市', key: '0-0-1-2' },
                ],
            },
            {
                title: '上海市',
                key: '0-0-2',
            }
        ],
    }
];
const treeAreData = [
    {
        title: '全国',
        key: '0-0',
        children: [
            {
                title: '浙江省',
                key: '0-0-0',
                children: [
                    { title: '杭州市', key: '0-0-0-0' },
                    { title: '金华市', key: '0-0-0-1' },
                    { title: '宁波市', key: '0-0-0-2' },
                ],
            },
            {
                title: '江苏省',
                key: '0-0-1',
                children: [
                    { title: '常州市', key: '0-0-1-0' },
                    { title: '无锡市', key: '0-0-1-1' },
                    { title: '盐城市', key: '0-0-1-2' },
                ],
            },
            {
                title: '北京市',
                key: '0-0-2',
            }
        ],
    }
];
//table
const renderContent = (value, row, index) => {
    const obj = {
        children: value,
        props: {},
    };
    return obj;
};

const columns = [
    {
        title: '负责人',
        dataIndex: 'name',
        render: (text, row, index) => {
            const obj = {
                children: text,
                props: {},
            };
            if (index === 0 || index === 2) {
                obj.props.rowSpan = 2;
            }
            if (index === 3 || index === 1) {
                obj.props.rowSpan = 0;
            }

            return obj;

        },
    },
    {
        title: '大区',
        dataIndex: 'region',
        render: renderContent,
    },
    {
        title: '省份',
        dataIndex: 'province',
        render: renderContent
    }];

const dataLists = [
    {
        key: '1',
        name: '杨总',
        region: '西南',
        province: '四川省/贵州省/云南省/西藏/重庆市',

    },
    {
        key: '2',
        name: '杨总',
        region: '华南',
        province: '广东省/广西省/海南省',
    },
    {
        key: '3',
        name: '周总',
        region: '华北',
        province: '蒙西',
    },
    {
        key: '4',
        name: '周总',
        region: '华南',
        province: '广东省/广西省/海南省',
    },
    {
        key: '5',
        name: '杨总',
        region: '华南',
        province: '广东省/广西省/海南省',
    }];

class Modify extends Component{
    static propTypes={
        itemText: PropTypes.object,
    }
    constructor(props){
        super(props);
        this.state={
            data:{
                shopId:123
            },
            roleData:[],
            masterData:[],
            notMainData:[],
            //主品牌
            defaultMasterExpandedKeys:['0-0-2'],//默认展开指定的树节点
            defaultMasterSelectedKeys:[],//默认选中的树节点
            defaultMasterCheckedKeys:[],//默认选中复选框的树节点
            treeMasterCheckedKeys:[],//选中复选框的树节点
            //非主品牌
            defaultNotMainExpandedKeys:['0-0-1'],//默认展开指定的树节点
            defaultNotMainSelectedKeys:[],//默认选中的树节点
            defaultNotMainCheckedKeys:[],//默认选中复选框的树节点
            treeNotMainCheckedKeys:[],//选中复选框的树节点
            //区域
            defaultAreaExpandedKeys:['0-0-2'],//默认展开指定的树节点
            defaultAreaSelectedKeys:[],//默认选中的树节点
            defaultAreaCheckedKeys:[],//默认选中复选框的树节点
            treeAreaCheckedKeys:[],//选中复选框的树节点
            content:''
        };

    }
    //角色
    handleRoleModalBox=()=>{
        this.refs.getModalButton.showModal();
    }
    //获取选中角色数据
    gainRoleData=(list)=>{
        console.log("roleData",list);
        this.setState({
            roleData:list,
        })
    }
    //主品牌
    handleMasterBox=()=>{
        console.log(this.refs);
        this.refs.getMasterButton.showModal();
    }
    //获取选中主营品牌数据
    gainMasterData=(list)=>{
        console.log("masterData",list);
        this.setState({
            masterData:list
        })
    }
    //tree
    handleMasterTreeSelect = (selectedKeys, info)=>{
        console.log('selected', selectedKeys, info);
    }
    handleMasterTreeCheck = (checkedKeys, info)=>{
        console.log('onCheck', checkedKeys, info);
    }
    //非主品牌
    handleNotMainBox=()=>{
        console.log(this.refs);
        this.refs.getNotMainButton.showModal();
    }
    gainNotMainData=(list)=>{
        console.log("notMainData",list);
        this.setState({
            notMainData:list
        })
    }
    //tree
    handleNotMainTreeSelect = (selectedKeys, info)=>{
        console.log('selected', selectedKeys, info);
    }
    handleNotMainTreeCheck = (checkedKeys, info)=>{
        console.log('onCheck', checkedKeys, info);
    }
    //tree 区域
    handleAreaTreeSelect = (selectedKeys, info)=>{
        console.log('selected', selectedKeys, info);
    }
    handleAreaTreeCheck = (checkedKeys, info)=>{
        console.log('onCheck', checkedKeys, info);
    }
    renderTreeNodes = (data)=>{
        return data.map((item)=>{
            if(item.children){
                return(
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                )
            }
            return <TreeNode {...item} />
        })
    }

    //tabs
    handleTabsClick = (key) => {
        console.log(key);
    }
    //form
    handleSearch = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            // this.props.history.push("/");
        });

    }
    componentDidMount=()=>{

    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const  data  =this.state.data;
        return(
            <div>
                <TooltipModal ref='getToolModal' content={this.state.content} ></TooltipModal>
                <BreadcrumbItems itemText={itemText}></BreadcrumbItems>
                <div className='main-content'>
                    <Form className="ant-advanced-search-form"
                          onSubmit={this.handleSearch}
                    >
                        <Row gutter={24}>
                            <Col {...formColLayout12}>
                                <FormItem label='内部唯一识别号' labelCol={{span:4}} >
                                    {data.shopId}
                                </FormItem>
                            </Col>
                            <Col {...formColLayout12}>
                                <FormItem label='角色' labelCol={{span:3}} wrapperCol={{span:21}}>
                                    {getFieldDecorator('role',{rules:[{
                                            required:true,
                                            message: '请选择角色!',
                                        }],initialValue:'角色'})(
                                        <TextArea placeholder="请选择角色" style={{ width: 300,marginRight:15 }} autosize disabled />
                                    )}
                                    <Button onClick={this.handleRoleModalBox}>角色分配</Button>
                                    <ModalBox ref="getModalButton"  filterModalData={this.gainRoleData.bind(this)} ></ModalBox>
                                </FormItem>
                            </Col>
                            <Col {...formColLayout12}>
                                <FormItem label='登陆账号' labelCol={{span:3}}  wrapperCol={{span:21}}>
                                    {getFieldDecorator('loginAccount',{rules:[{
                                            required:true,
                                            message: '请输入登陆账号!',
                                        }],initialValue:'登陆账号'})(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} style={{maxWidth:200}}   placeholder="请输入登陆账号" />
                                    )}
                                    <span style={{paddingLeft:'20px'}}>(有效：是  锁定：否)</span>
                                </FormItem>
                            </Col>
                            <Col {...formColLayout12}>
                                <FormItem label='登陆密码' labelCol={{span:3}}  wrapperCol={{span:21}}>
                                    {getFieldDecorator('loginPassword',{rules:[{
                                            required:true,
                                            message: '请输入登陆密码!',
                                        }],initialValue:'登陆密码'})(
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" style={{maxWidth:300,marginRight:15}}   placeholder="请输入登陆密码" />
                                    )}
                                    <Button type="primary">复位密码</Button>
                                </FormItem>
                            </Col>

                            <Col {...formColLayout6}>
                                <FormItem label='姓名' labelCol={{span:6}} wrapperCol={{span:18}} >
                                    王小二
                                </FormItem>
                            </Col>

                            <Col {...formColLayout6}>
                                <FormItem label='性别' labelCol={{span:6}} wrapperCol={{span:18}}>
                                    {getFieldDecorator('gender',{rules:[{
                                            required:true,
                                            message: '请选择性别!',
                                        }]})(
                                        <Select  placeholder='请选择性别' allowClear style={{ width: 120 }}>
                                            <Option value="0">男</Option>
                                            <Option value="1">女</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>

                            <Col {...formColLayout6}>
                                <FormItem label='手机号码' labelCol={{span:6}} wrapperCol={{span:18}}>
                                    {getFieldDecorator('mobileNo',{rules:[{
                                            required:true,
                                            message: '手机号码!',
                                        },{
                                            pattern:/^1\d{10}$/,
                                            message:'请输入正确的电话号码'
                                        }]})(
                                        <Input   style={{maxWidth:200,marginRight:15}}   placeholder="请输入手机号码" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...formColLayout6}>
                                <FormItem label='电子邮箱' labelCol={{span:6}} wrapperCol={{span:18}}>
                                    {getFieldDecorator('email',{rules:[{
                                            required:false,
                                            message: '电子邮箱!',
                                        },{
                                            type:'email',
                                            message:'请输入正确的邮箱地址'
                                        }]})(
                                        <Input   style={{maxWidth:200,marginRight:15}}   placeholder="请输入手机号码" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...formColLayout6}>
                                <FormItem label='所属部门' labelCol={{span:6}} wrapperCol={{span:18}}>
                                    {getFieldDecorator('department',{rules:[{
                                            required:true,
                                            message: '所属部门!',
                                        }]})(
                                        <Select  placeholder='请选择所属部门' allowClear style={{ width: 200 }}>
                                            <Option value="0">采销一部</Option>
                                            <Option value="1">采销二部</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...formColLayout6}>
                                <FormItem label='工作岗位' labelCol={{span:6}} wrapperCol={{span:18}}>
                                    {getFieldDecorator('operatingPost',{rules:[{
                                            required:false,
                                            message: '工作岗位!',
                                        }]})(
                                        <Input   style={{maxWidth:200,marginRight:15}}   placeholder="请属入工作岗位" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Tabs defaultActiveKey="1" type='card' tabBarGutter={-1} onChange={this.handleTabsClick}>
                            <TabPane tab="门店属性" key="1">
                                <Row gutter={24}>
                                    <Col {...formColLayout6}>
                                        <FormItem label='所属门店' labelCol={{span:6}} wrapperCol={{span:18}}>
                                            {getFieldDecorator('stores',{rules:[{
                                                    required:true,
                                                    message: '所属门店!',
                                                }]})(
                                                <Select  placeholder='请选择所属门店' allowClear style={{ width: 120 }}>
                                                    <Option value="0">杭州余杭店</Option>
                                                    <Option value="1">杭州西湖店</Option>
                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col {...formColLayout6}>
                                        <FormItem label='是否老板' labelCol={{span:6}} wrapperCol={{span:18}}>
                                            是
                                        </FormItem>
                                    </Col>
                                    <Col {...formColLayout6}>
                                        <FormItem label='是否店长' labelCol={{span:6}} wrapperCol={{span:18}}>
                                            是
                                        </FormItem>
                                    </Col>
                                </Row>
                            </TabPane>

                            <TabPane tab="采销属性" key="2">
                                <Row gutter={24}>
                                    <Col xxl={{span:24}}>
                                        <FormItem label='首要工作方向' labelCol={{span:2}} wrapperCol={{span:21}}>
                                            {getFieldDecorator('workDirection',{rules:[{
                                                    required:true,
                                                    message: '首要工作方向!',
                                                }]})(
                                                <Select  placeholder='请选择首要工作方向' allowClear style={{ width: 200 }}>
                                                    <Option value="0">单配</Option>
                                                    <Option value="1">集采</Option>
                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col xxl={{span:24}}>
                                        <FormItem label='主品牌' labelCol={{span:2}} wrapperCol={{span:21}}>
                                            {getFieldDecorator('masterBrand',{rules:[{
                                                    required:true,
                                                    message: '请选择品牌!',
                                                }],})(
                                                    <TextArea placeholder="请选择品牌" style={{ width: 300,marginRight:15 }} autosize disabled />
                                            )}
                                            <Button onClick={this.handleMasterBox}>品牌分配</Button>
                                            <MasterBrand ref="getMasterButton"  filterModalData={this.gainMasterData.bind(this)}></MasterBrand>
                                        </FormItem>
                                    </Col>
                                    <Col xxl={{span:24}}>
                                        <FormItem label='主品牌和区域' labelCol={{span:2}} wrapperCol={{span:21}}>
                                            <Tree
                                                checkable
                                                defaultExpandedKeys={this.state.defaultMasterExpandedKeys}
                                                defaultSelectedKeys={this.state.defaultMasterSelectedKeys}
                                                defaultCheckedKeys={this.state.defaultMasterCheckedKeys}
                                                onSelect={this.handleMasterTreeSelect}
                                                onCheck={this.handleMasterTreeCheck}
                                            >
                                                {this.renderTreeNodes(treeBrandData)}
                                            </Tree>
                                        </FormItem>
                                    </Col>
                                    <Col xxl={{span:24}}>
                                        <FormItem label='非主品牌' labelCol={{span:2}} wrapperCol={{span:21}}>
                                            {getFieldDecorator('notMainBrand',{rules:[{
                                                    required:false,
                                                    message: '请选择非主品牌!',
                                                }],})(
                                                <TextArea placeholder="请选择非主品牌" style={{ width: 300,marginRight:15 }} autosize disabled />
                                            )}
                                            <Button onClick={this.handleNotMainBox}>品牌分配</Button>
                                            <NotMainBrand ref="getNotMainButton"  filterModalData={this.gainNotMainData.bind(this)}></NotMainBrand>
                                        </FormItem>
                                    </Col>
                                    <Col xxl={{span:24}}>
                                        <FormItem label='非主品牌和区域' labelCol={{span:2}} wrapperCol={{span:21}}>
                                            <Tree
                                                checkable
                                                defaultExpandedKeys={this.state.defaultNotMainExpandedKeys}
                                                defaultSelectedKeys={this.state.defaultNotMainSelectedKeys}
                                                defaultCheckedKeys={this.state.defaultNotMainCheckedKeys}
                                                onSelect={this.handleNotMainTreeSelect}
                                                onCheck={this.handleNotMainTreeCheck}
                                            >
                                                {this.renderTreeNodes(treeBrandData)}
                                            </Tree>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="区域属性" key="3">
                                <Row gutter={24}>
                                    <Col xxl={{span:24}}>
                                        <FormItem label='负责区域' labelCol={{span:2}} wrapperCol={{span:21}}>
                                            <Tree
                                                checkable
                                                defaultExpandedKeys={this.state.defaultAreaExpandedKeys}
                                                defaultSelectedKeys={this.state.defaultAreaSelectedKeys}
                                                defaultCheckedKeys={this.state.defaultAreaCheckedKeys}
                                                onSelect={this.handleAreaTreeSelect}
                                                onCheck={this.handleAreaTreeCheck}
                                            >
                                                {this.renderTreeNodes(treeAreData)}
                                            </Tree>
                                        </FormItem>
                                    </Col>
                                    <Col xxl={{span:24}}>
                                        <FormItem label='区域划分参考' labelCol={{span:2}} wrapperCol={{span:21}}>
                                            <Table
                                                columns={columns}
                                                dataSource={dataLists}
                                                bordered
                                                pagination={false}
                                            />
                                        </FormItem>
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>





                        <Row className='row-bottom'>
                            <Col span={24} style={{ textAlign: 'center' }}>
                                <Button htmlType="submit">保存</Button>
                                <Button type="danger" style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                    取消
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                </div>
            </div>
        )
    }
}
const WrappedModify= Form.create()(Modify);

export default WrappedModify;