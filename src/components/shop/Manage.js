// 门店管理
import React , {Component} from 'react';
import PropTypes from 'prop-types';
import { Table,Button,Popconfirm } from 'antd';
import { NavLink } from 'react-router-dom';
import {HttpRequest} from '../../utils/js/common'
import domain from '../../domain/domain';

import BreadcrumbItems from '../layouts/BreadcrumbItems';
import WrappedSearchForm from './SearchForm'
import TooltipModal from '../layouts/TooltipModal';


const itemText={
    item1:'主页',
    item2:'系统管理',
    item3:'门店管理'
};


class Manage extends Component{
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
            { title: '序号', dataIndex: 'key', key: 'id', fixed: 'left', width: 100 },
            { title: '门店编号', dataIndex: 'id', key: 'shopId', fixed: 'left' , width: 100},
            { title: '门店名称', dataIndex: 'name', key: 'name', width: 150 },
            { title: '门店地址', dataIndex: 'address', key: 'address', width: 150 },
            { title: '公司名称', dataIndex: 'company', key: 'company', width: 150 },
            { title: '负责人', dataIndex: 'principal', key: 'principal', width: 150 },
            { title: '主管', dataIndex: 'manager', key: 'manager', width: 150 },
            { title: '营业情况', dataIndex: 'businessCondition', key: 'businessCondition', width: 150 },
            { title: '分销级别', dataIndex: 'distributionLevel', key: 'distributionLevel', width: 150 },
            { title: '门店类别', dataIndex: 'type', key: 'type' , width: 150},
            { title: '加盟方式', dataIndex: 'joinType', key: 'joinType', width: 150 },
            { title: '等级', dataIndex: 'level', key: 'level', width: 150 },
            { title: '加盟区域', dataIndex: 'joinShopRegion', key: 'joinShopRegion' , width: 150},
            { title: '入网日期', dataIndex: 'date', key: 'date' , width: 150},
            { title: '区域经理', dataIndex: 'areaManager', key: 'areaManager' , width: 150},
            { title: '删除', dataIndex: 'isDeleteName', key: 'isDeleteName' , width: 150},
            {
                title: '操作',
                key: 'operation',
                fixed: 'right',
                width: 200,
                render: (text, record,index) =>(<div>
             
                    {/* <a href="javascript:void(0)" onClick={() =>this.handleRevampClick(text, record,index)}>修改</a> */}
                    {/* <NavLink exact to={{pathname:`/editAddShop?id=${record}`,state:{id: index}}}>修改</NavLink> */}
                    <Button onClick={() =>this.handleRevampClick(text, record,index)}>修改</Button>
                   
                    {record.isDelete==0 ?
                        (
                            <Button type="danger">
                                <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDeleteClick(record)}>
                                    <a href="javascript:void(0)" >删除</a>
                                </Popconfirm>
                            </Button>
                        ):(
                            <Button type="danger" style={{display:'inline-block'}}>
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
    //表格
    handleRevampClick=(text, record, index)=>{
        window.location.href=`/editAddShop?id=${record.id}`
    }
     // 初始化列表数据函数
     initData=(current,pageSize)=>{
        let obj=Object.assign(
            {
                pageCur:current?current:this.state.pageCur,
                pageSize:pageSize?pageSize:this.state.pageSize
            } , this.state.searchValues)
        HttpRequest.getRequest(
            {
                url:domain.shopList,
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
            url:domain.shopDelete,
            data:{
                shopId:parseInt(record.id),
                operateType:record.isDelete==0?1:0    
            }
            },
            result=>{
                this.initData()
            })
    }
    // 搜索
    handleFilter(values) {
        this.setState({
            searchValues:values
        })     
        this.initData()
    }
    //分页
    handleOnChange(current) {
        this.initData(current)
    }
    onShowSizeChange(current, pageSize) {
        this.setState({
            pageSize:pageSize
        })
        this.initData(current,pageSize);
    } 
    componentDidMount=()=>{
        this.initData();
    }
    handleData=(res,pageSize)=>{
        if(res.data){
            res.data.map(item=>{
                item.joinShopRegion=item.joinShopRegion.map(items=>{
                    return items.region    
                }).join(",")
                item.isDeleteName=item.isDelete==0?'未删除':'已删除'
            })
            this.setState({
                rows: res
            })
        }
    }
    render(){
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
        return(
            <div>
                <TooltipModal ref='getToolModal' content={this.state.content} ></TooltipModal>
                <BreadcrumbItems itemText={itemText}></BreadcrumbItems>
                <div className='main-content'>
                    <WrappedSearchForm filterCallback={this.handleFilter.bind(this)} />
                    <Table
                        columns={this.columns}
                        dataSource={data}
                        scroll={{ x: 2350}}
                        pagination={pagination}
                    />
                </div>
            </div>
        )
    }
}
export default Manage;