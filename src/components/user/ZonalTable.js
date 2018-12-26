//wq 角色分配 品牌分配
import React , {Component} from 'react';
import { Table } from 'antd';


import domain from '../../domain/domain';

import {HttpRequest} from '../../utils/js/common'

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
        render: renderContent,
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

//角色分配
class ZonalTable extends Component{
    constructor(props){
        super(props);
        this.state={
            dataLists:[]
        };

    }
    componentDidMount = ()=>{
        let i=0;
        HttpRequest.getRequest({
            url:domain.userZonal,
        },(res)=>{
            res.map((item)=>{
                item['index']=i++;
            });
            this.setState({
                dataLists: res
            })
        })
    }

    render(){
        return(
            <Table
                columns={columns}
                dataSource={this.state.dataLists}
                bordered
                pagination={false}
                rowKey={record => record.index}
            />
        )
    }
}

export {ZonalTable} ;