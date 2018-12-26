import React, { Component } from 'react';
import BreadcrumbItems from '../layouts/BreadcrumbItems';
import WrappedSearchForm from './SearchForm'
import PropTypes from 'prop-types';
import { Table,Button,Popconfirm,Row, Col} from 'antd';
import RoleEdit from './roleEdit'
import RoleModal from './roleModal';
import {HttpRequest} from '../../utils/js/common';
import {roleDomain} from '../../domain/domain';
//用户管理
const itemText = {
    item1: '主页',
    item2: '系统管理',
    item3: '角色管理'
};

class UserList extends Component {
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
            visible:false,
            visiblePower:false

        };
        this.columns=[
            { title: '序号', dataIndex: 'id', key: 'key',fixed: 'left', width: 70 },
            { title: '角色ID', dataIndex: 'id', key: 'id', width: 100 },
            { title: '角色名称', dataIndex: 'name', key: 'name', width: 150},
            { title: '是否有效', dataIndex: 'enabled', key: 'enabled', width: 150},
            { title: '角色描述', dataIndex: 'description', key: 'description', width: 150 },
            { title: '创建日期', dataIndex: 'createdAt', key: 'createdAt' , width: 200},
            { title: '创建人', dataIndex: 'createdName', key: 'createdName', width: 150 },
            { title: '更新日期', dataIndex: 'updatedAt', key: 'updatedAt' , width: 200},
            { title: '更新人', dataIndex: 'updatedName', key: 'updatedName', width: 150 },
            {
                title: '操作',
                key: 'operation',
                fixed: 'right',
                width: 450,
                render: (text, record,index) =>(<div>
                    <Button style={{marginLeft:'10px'}} onClick={() => this.showModal(record.id)}>修改</Button>
                    {record.isDelete==0 ?
                        (
                            <Button type="danger" style={{display:'inline-block',marginLeft:'10px'}}>
                                <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDeleteClick(record)}>
                                    <a href="javascript:void(0)" >删除</a>
                                </Popconfirm>
                            </Button>
                        ):(
                            <Button type="danger" style={{display:'inline-block',marginLeft:'10px'}}>
                                <Popconfirm title="确定恢复吗?" onConfirm={() => this.handleDeleteClick(record)}>
                                    <a href="javascript:void(0)" >恢复</a>
                                </Popconfirm>
                            </Button>        
                        )
                    }
                    {record.isLocked==0 ?
                        (
                            <Button type="danger" style={{display:'inline-block',marginLeft:'10px'}} >
                                <Popconfirm title="确定锁定吗?" onConfirm={() => this.handleLockClick(record)}>
                                    <a href="javascript:void(0)" >禁用</a>
                                </Popconfirm>
                            </Button>
                        ):(
                            <Button type="danger" style={{display:'inline-block',marginLeft:'10px'}}>
                                <Popconfirm title="确定恢复吗?" onConfirm={() => this.handleLockClick(record)}>
                                    <a href="javascript:void(0)" >启用</a>
                                </Popconfirm>
                            </Button>        
                        )
                    }
                    <Button type="primary" style={{marginLeft:'10px'}} onClick={() => this.showModalPower(record.id)}>分配权限</Button>
                    <Button type="primary" style={{marginLeft:'10px'}}>吊销用户</Button>
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
                url:roleDomain.roleList,
                params:obj
            },
            res=>{
                this.handleData(res)
            }
        )
    }
    // // 删除以及恢复
    // handleDeleteClick=(record)=>{
    //     HttpRequest.postRequest({
    //         url:domain.userDelete,
    //         data:{
    //             id:parseInt(record.id),
    //             deleteCode:record.isDelete==0?1:0    
    //         }
    //         },
    //         result=>{
    //             this.initData()
    //         })
    // }
    //  // 禁用以及启用
    //  handleLockClick=(record)=>{
    //     HttpRequest.postRequest({
    //         url:domain.userLock,
    //         data:{
    //             id:parseInt(record.id),
    //             lockedCode:record.isLocked==0?1:0    
    //         }
    //         },
    //         result=>{
    //             this.initData();
    //         })
    // }
    // 搜索
    handleFilter(values) {
        this.setState({
            searchValues:values
        },()=>{
            this.initData(this.state.pageCur,this.state.pageSize,this.state.searchValues)
        })  
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
    handleData=(res,pageSize)=>{
        if(res.data){
            res.data.map(item=>{
                item.shopName=item.shopInfos.map(items=>{
                    return items.shopName    
                }).join(" , ")
                item.key+=1;
                item.isDeleteName=item.isDelete==0?'':'已删除';
                item.isLockedName=item.isLocked==0?'':'已锁定';
            })
            this.setState({
                rows: res
            })
        }
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
    // 弹出层
    showModalPower=()=>{
        this.setState({ visiblePower: true});
    }
    handleCancelPower = () => {
        this.setState({ visiblePower: false });
    }

    showModal = () => {
        this.setState({ visible: true});
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
        //     HttpRequest.postRequest({
        //         url:domain.addOrg,
        //         data:values
        //         },
        //         result=>{
        //             Modal.success({
        //                 title: '确定',
        //                 content: `保存成功！`,
        //                 onOk:()=>{
        //                     this.handleFilter();
        //                     form.resetFields();
        //                     this.setState({ visible: false });
        //                 }
        //             });
        //         })
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
                    <WrappedSearchForm wrappedComponentRef={(form) => this.formRefs = form} />
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
                    {this.state.visible? <RoleEdit  wrappedComponentRef={(formRef) => this.formRef = formRef}
                        id={this.state.id}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}/>:''}
                    <RoleModal
                         visible={this.state.visiblePower}
                         onCancel={this.handleCancelPower}
                    />
                </div>
            </div>
        )
    }
}
export default UserList;