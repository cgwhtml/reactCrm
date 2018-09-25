import React, { Component } from 'react';
import BreadcrumbItems from '../layouts/BreadcrumbItems';
import WrappedAdvancedSearchForm from './WrappedAdvancedSearchForm'
import PropTypes from 'prop-types';
import { Table,Button,Popconfirm} from 'antd';
import { NavLink } from 'react-router-dom';
import {HttpRequest} from '../../utils/js/common';
import domain from '../../domain/domain';
//用户管理
const itemText = {
    item1: '主页',
    item2: '系统管理',
    item3: '用户管理'
};

class Manage extends Component {
    static propTypes = {
        itemText: PropTypes.object
    }
    constructor(props){
        super(props);
        this.state={
            value:'',
            son:'',
            rows:{},
            pageSize: 10,
            pageCur: 1
        };
        this.columns=[
            { title: '序号', dataIndex: 'Id', key: 'inedx', width: 100 },
            { title: '账号内部id', dataIndex: 'id', key: 'id', width: 100 },
            { title: '登录账号', dataIndex: 'loginId', key: 'loginId', width: 100},
            { title: '姓名', dataIndex: 'fullname', key: 'fullname', width: 150},
            { title: '工作岗位', dataIndex: 'positionTitle', key: 'positionTitle', width: 150 },
            { title: '部门', dataIndex: 'departmentName', key: 'departmentName', width: 150 },
            { title: '部门职务', dataIndex: 'principal', key: 'principal', width: 150 },
            { title: '门店', dataIndex: 'shopName', key: 'shopName', width: 150 },
            { title: '锁定', dataIndex: 'isLockedName', key: 'isLockedName', width: 150 },
            { title: '删除', dataIndex: 'isDeleteName', key: 'isDeleteName', width: 150 },
            { title: '更新日期', dataIndex: 'updatedAt', key: 'updatedAt' , width: 150},
            { title: '更新人', dataIndex: 'updatedName', key: 'updatedName', width: 150 },
            {
                title: '操作',
                key: 'operation',
                width: 300,
                render: (text, record,index) =>(<div>
                     {record.isLocked==0 ?
                        (
                            <Button type="danger" style={{display:'inline-block'}} >
                                <Popconfirm title="确定锁定吗?" onConfirm={() => this.handleLockClick(record)}>
                                    <a href="javascript:void(0)" >锁定</a>
                                </Popconfirm>
                            </Button>
                        ):(
                            <Button type="danger" style={{display:'inline-block'}}>
                                <Popconfirm title="确定恢复吗?" onConfirm={() => this.handleUnlockClick(record)}>
                                    <a href="javascript:void(0)" >解锁</a>
                                </Popconfirm>
                            </Button>        
                        )
                    }
                    <Button className='btn-right'>
                        {/*<a href="javascript:void(0)" onClick={() =>this.handleRevampClick(text, record,index)}>修改</a>*/}
                        <NavLink exact to={{pathname:'/modify',state:{id: index}}}>修改</NavLink>
                    </Button>
                    {record.isDelete==0 ?
                        (
                            <Button type="danger" style={{display:'inline-block'}} >
                                <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDeleteClick(record)}>
                                    <a href="javascript:void(0)" >删除</a>
                                </Popconfirm>
                            </Button>
                        ):(
                            <Button type="danger" style={{display:'inline-block'}}>
                                <Popconfirm title="确定恢复吗?" onConfirm={() => this.handleRecoverClick(record)}>
                                    <a href="javascript:void(0)" >恢复</a>
                                </Popconfirm>
                            </Button>        
                        )
                    }
                </div>) ,
            },
        ];
    }

     //表格
     handleRevampClick=(text, record, index)=>{
        console.log(this.props);
        this.props.router.replace({
            pathname: '/modify',
            query: {foo:index}
        })
        console.log(text);
        console.log(record);
        console.log(index);
    }
    // 删除
    handleDeleteClick=(record)=>{
        HttpRequest.postRequest({
            url:domain.shopDelete,
            data:{
                shopId:parseInt(record.id),
                operateType:record.isDelete==0?1:0    
            }
            },
            result=>{
                console.log(7)
            })
    }
    // 恢复
    handleRecoverClick=(record)=>{
        HttpRequest.postRequest({
            url:domain.shopDelete,
            data:{
                shopId:parseInt(record.id),
                operateType:record.isDelete==0?1:0    
            }
            },
            result=>{
                console.log(7)
            })
    }
    //分页
    handleOnChange(current) {
        HttpRequest.getRequest(
            {
                url:domain.userList,
                params:{                  
                    pageCur:current,
                    pageSize:this.state.pageSize
                } 
            },
            res=>{
                this.handleData(res)
            }
        )
    }
    onShowSizeChange(current, pageSize) {
        HttpRequest.getRequest(
            {
                url:domain.userList,
                params:{
                    pageCur:current,
                    pageSize:pageSize
                }   
            },
            res=>{
                this.handleData(res,pageSize)
            }
        )
    } 
    componentDidMount=()=>{
        HttpRequest.getRequest(
            {
                url:domain.userList,
                params:{
                    pageCur:this.state.pageCur,
                    pageSize:this.state.pageSize
                } 
            },
            res=>{
                this.handleData(res)
            }
        )
    }
    // 搜索
    handleFilter(values) {     
        let obj=Object.assign(
            {pageCur:this.state.pageCur,
                pageSize:this.state.pageSize
            } , values)
        HttpRequest.getRequest(
            {
                url:domain.userList,
                params:obj
            },
            res=>{
                this.handleData(res)
            }
        )
    }
    handleData=(res,pageSize)=>{
        if(res.data){
            res.data.map(item=>{
                item.isDeleteName=item.isDelete==0?'未删除':'已删除';
                item.isLockedName=item.isLocked==0?'未锁定':'已锁定';
            })
            console.log(res)
            this.setState({
                rows: res,
                pageSize:pageSize?pageSize:10
            })
        }
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
                    <WrappedAdvancedSearchForm />
                    <Table
                        columns={this.columns}
                        dataSource={data}
                        pagination={pagination}
                    />
                </div>
            </div>
        )
    }
}
export default Manage;