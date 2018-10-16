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
        render: (text, row, index) => {
            // console.log(row,index);
            const obj = {
                children: text,
                props: {},
            };
            // if (index === 0 || index === 2) {
            //     obj.props.rowSpan = 2;
            // }
            // if (index === 3 || index === 1) {
            //     obj.props.rowSpan = 0;
            // }

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

let dataLists = [
    {
        key: '1',
        index:'1',
        name: '杨总',
        region: '西南',
        province: '四川省/贵州省/云南省/西藏/重庆市',

    },
];

//角色分配
class ZonalTable extends Component{
    constructor(props){
        super(props);
        this.state={
        };

    }
    componentDidMount = ()=>{
        let _this=this;
        let i=0;
        HttpRequest.getRequest({
            url:domain.userZonal,
        },(res)=>{
            res.map((item)=>{
                item['index']=i++;
            });
            dataLists=res;
        })
    }

    render(){
        return(
            <Table
                columns={columns}
                dataSource={dataLists}
                bordered
                pagination={false}
                rowKey={record => record.index}
            />
        )
    }
}

export {ZonalTable} ;