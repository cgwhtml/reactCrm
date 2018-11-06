import React, { Component } from 'react';
import BreadcrumbItems from '../layouts/BreadcrumbItems';
import WrappedSearchForm from './SearchForm'
import PropTypes from 'prop-types';
import { Table,Button,Popconfirm,Modal,Row, Col} from 'antd';
import {HttpRequest} from '../../utils/js/common';
import domain from '../../domain/domain';
import OrgEdit from './OrgEdit'
//用户管理
const itemText = {
    item1: '主页',
    item2: '系统管理',
    item3: '法人机构管理'
};

class CorOrgList extends Component {
    static propTypes = {
        itemText: PropTypes.object
    }
    constructor(props){
        super(props);
        this.state={
            value:'',
            son:'',
            rows:{},
            searchValues:{},
            pageSize: 10,
            pageCur: 1,
            visible: false,
            id:''
        };
        this.columns=[
            { title: '序号', dataIndex: 'key', key: 'key',fixed: 'left', width: 70 },
            { title: '法人机构名称', dataIndex: 'orgName', key: 'orgName', width: 350 },
            { title: '法人机构地址', dataIndex: 'orgAddress', key: 'orgAddress', width: 300},
            { title: '法定代表人', dataIndex: 'orgPrincipalName', key: 'orgPrincipalName', width: 150},
            { title: '成立日期', dataIndex: 'registerDate', key: 'registerDate', width: 150 },
            { title: '法人证号类型', dataIndex: 'orgCodeType', key: 'orgCodeType', width: 200 },
            { title: '法人机构代码', dataIndex: 'orgCode', key: 'orgCode', width: 240 },
            { title: '法人状态', dataIndex: 'orgStatus', key: 'orgStatus', width: 100 },
            { title: '更新日期', dataIndex: 'updatedAt', key: 'updatedAt', width: 200 },
            { title: '更新人', dataIndex: 'updatedName', key: 'updatedName', width: 150 },
            {
                title: '操作',
                key: 'operation',
                fixed: 'right',
                width: 250,
                render: (text, record,index) =>(<div>
                    <Button style={{marginLeft:'10px'}} onClick={() => this.showModal(record.id)}>修改</Button>
                    {record.isDelete==0?
                        (
                            <Button type="danger" style={{display:'inline-block',marginLeft:'10px'}}>
                                <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDeleteClick(record)}>
                                    <a href="javascript:void(0)" >删除</a>
                                </Popconfirm>
                            </Button>
                        ):''
                    }
                </div>) ,
            },
        ];
    }

    // 初始化列表数据函数
    initData=(current,pageSize,searchValues)=>{
        let obj=Object.assign(
            {
                pageCur:current?current:this.state.pageCur,
                pageSize:pageSize?pageSize:this.state.pageSize
            } , searchValues)
        HttpRequest.getRequest(
            {
                url:domain.orgList,
                params:obj
            },
            res=>{
                this.handleData(res)
            }
        )
    }
    // 删除以及恢复
    handleDeleteClick=(record)=>{
        console.log(record.id)
        HttpRequest.postRequest(
            {
                url:domain.deleteCorOrg,
                data:{
                    id:record.id,   
                }
            },
                result=>{
                    this.initData()
            }
        )
    }
    // 搜索
    handleFilter=()=>{
        let values=this.formRefs.getItemsValue();
        this.setState({
            searchValues:values
        },()=>{
            this.initData(this.state.pageCur,this.state.pageSize,this.state.searchValues)
        })  
    }
    handleReset = () => {
        this.formRefs.handleReset();
    }
    //分页
    handleOnChange(current) {
        this.initData(current,'',this.state.searchValues)
    }
    onShowSizeChange(current, pageSize) {
        this.setState({
            pageSize:pageSize
        })
        this.initData(current,pageSize,this.state.searchValues);
    }
    componentDidMount=()=>{
        // this.initData();
        this.handleFilter();
    }
    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
          return;
        };
    }
    handleData=(res)=>{
        if(res){
            this.setState({
                rows: res
            })
        }
    }
    //弹出层
    showModal = (id) => {
        this.setState({ visible: true,id:id});
    }
    
    handleCancel = () => {
        this.setState({ visible: false });
    }
    
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if(values.registerDate){
                let registerDate=new Date(values.registerDate._d)
                values.registerDate=registerDate.getFullYear() + '-' + (registerDate.getMonth() + 1) + '-' + registerDate.getDate();
            }
            if (err) {
                return;
            }
            HttpRequest.postRequest({
                url:domain.addOrg,
                data:values
                },
                result=>{
                    Modal.success({
                        title: '确定',
                        content: `保存成功！`,
                        onOk:()=>{
                            this.handleFilter();
                            form.resetFields();
                            this.setState({ visible: false });
                        }
                    });
                })
        });
    }
    
    render() {
        let data=this.state.rows?this.state.rows.data:[];
        
        const pagination = {
            total: this.state.rows?this.state.rows.recordsTotal:0,
            pageSize:this.state.pageSize,
            defaultCurrent: 1,
            showSizeChanger: true,
            loading: true,
            onShowSizeChange: this.onShowSizeChange.bind(this),
            onChange: this.handleOnChange.bind(this)
        }
        return (
            <div>
                <BreadcrumbItems itemText={itemText}></BreadcrumbItems>
                <div style={{ padding: 24, background: '#fff', minHeight: 380 }}>
                    <WrappedSearchForm  wrappedComponentRef={(form) => this.formRefs = form}/>
                    <Row className='row-bottom'>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button htmlType="submit" onClick={this.handleFilter}>查询</Button>
                            <Button type="danger"  style={{ marginLeft: 8 }} onClick={this.handleReset}>
                            清除
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={() => this.showModal()}>新增</Button>
                        </Col>
                    </Row>
                    <Table
                        columns={this.columns}
                        scroll={{ x: 1900}}
                        dataSource={data}
                        pagination={pagination}
                    />
                    {this.state.visible? <OrgEdit  wrappedComponentRef={(formRef) => this.formRef = formRef}
                        id={this.state.id}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}/>:''}
                </div>
            </div>
        )
    }
}
export default CorOrgList;