import React, { Component } from 'react';
import BreadcrumbItems from '../layouts/BreadcrumbItems';
import WrappedSearchForm from './SearchForm'
import PropTypes from 'prop-types';
import { Table,Button,Popconfirm} from 'antd';
import { NavLink } from 'react-router-dom';
import {HttpRequest,CountDown} from '../../utils/js/common';
import domain from '../../domain/domain';
//用户管理
const itemText = {
    item1: '主页',
    item2: '系统管理',
    item3: '用户管理'
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
            pageCur: 1
        };
        this.columns=[
            { title: '序号', dataIndex: 'key', key: 'key',fixed: 'left', width: 70 },
            { title: 'ID', dataIndex: 'id', key: 'id', width: 100 },
            { title: '登录账号', dataIndex: 'loginId', key: 'loginId', width: 150},
            { title: '姓名', dataIndex: 'fullname', key: 'fullname', width: 150},
            { title: '工作岗位', dataIndex: 'positionTitle', key: 'positionTitle', width: 150 },
            { title: '部门', dataIndex: 'departmentName', key: 'departmentName', width: 200 },
            { title: '部门职务', dataIndex: 'jobTitle', key: 'jobTitle', width: 150 },
            { title: '门店', dataIndex: 'shopName', key: 'shopName', width: 200 },
            { title: '锁定', dataIndex: 'isLockedName', key: 'isLockedName', width: 80 },
            { title: '删除', dataIndex: 'isDeleteName', key: 'isDeleteName', width: 80 },
            { title: '更新日期', dataIndex: 'updatedAt', key: 'updatedAt' , width: 200},
            { title: '更新人', dataIndex: 'updatedName', key: 'updatedName', width: 150 },
            {
                title: '操作',
                key: 'operation',
                fixed: 'right',
                width: 250,
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
                                <Popconfirm title="确定恢复吗?" onConfirm={() => this.handleLockClick(record)}>
                                    <a href="javascript:void(0)" >解锁</a>
                                </Popconfirm>
                            </Button>        
                        )
                    }

                    <Button style={{marginLeft:'10px'}}>
                        <NavLink exact to={`/userEdit/2/${record.id}`}>修改</NavLink>
                    </Button>
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
            } , searchValues?searchValues:{isLocked:0,isDeleted:0})
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
    // 删除以及恢复
    handleDeleteClick=(record)=>{
        HttpRequest.postRequest({
            url:domain.userDelete,
            data:{
                id:parseInt(record.id),
                deleteCode:record.isDelete==="0"?1:0    
            }
            },
            result=>{
                CountDown.countDown("操作成功");
                this.initData(this.state.pageCur,this.state.pageSize,this.state.searchValues);
            })
    }
     // 锁定以及解锁
     handleLockClick=(record)=>{
        HttpRequest.postRequest({
            url:domain.userLock,
            data:{
                id:parseInt(record.id),
                lockedCode:record.isLocked==="0"?1:0    
            }
            },
            result=>{
                CountDown.countDown("操作成功");
                this.initData(this.state.pageCur,this.state.pageSize,this.state.searchValues);
            })
    }
    // 搜索
    handleFilter(values) {
        this.setState({
            searchValues:values
        },()=>{
            this.initData(this.state.pageCur,this.state.pageSize,this.state.searchValues);
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
                item.isDeleteName=item.isDelete==="0"?'':'已删除';
                item.isLockedName=item.isLocked==="0"?'':'已锁定';
                return item;
            })
            this.setState({
                rows: res
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
                    <WrappedSearchForm filterCallback={this.handleFilter.bind(this)} />
                    <Table
                        columns={this.columns}
                        scroll={{ x: 1900}}
                        dataSource={data}
                        pagination={pagination}
                    />
                </div>
            </div>
        )
    }
}
export default UserList;