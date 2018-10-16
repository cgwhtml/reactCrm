import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table} from 'antd';
import {HttpRequest} from '../../utils/js/common';
import domain from '../../domain/domain';

class addressList extends Component {
    static propTypes = {
        itemText: PropTypes.object
    }
    constructor(props){
        super(props);
        this.state={
            rows:[],
        };
        this.columns=[
            { title: '序号', dataIndex: 'key', key: 'key', width: 100 },
            { title: '收车地址', dataIndex: 'detail', key: 'detail', width: 100 },
            { title: '联系人', dataIndex: 'receiverName', key: 'receiverName', width: 100},
            { title: '联系电话', dataIndex: 'receiverMobile', key: 'receiverMobile', width: 150},
            { title: '录入日期', dataIndex: 'createdAt', key: 'createdAt', width: 150 },
            { title: '录入人', dataIndex: 'createdName', key: 'createdName', width: 150 },
        ];
    }

    // 初始化列表数据函数
    initData=()=>{
        const id=this.props.id;
        if(id){
            let obj={   
                shopId:id
            }
            HttpRequest.getRequest(
                {
                    url:domain.addressList,
                    params:obj
                },
                res=>{
                    this.handleData(res)
                }
            )
        }
    }
    componentDidMount=()=>{
        this.initData();
    }
    handleData=(res)=>{
        if(res){
            this.setState({
                rows: res
            })
        }
    }
    render() {
        let data=this.state.rows?this.state.rows:[];
        
        return (
            <div>
                <div style={{ padding: 24, background: '#fff', minHeight: 380 }}>
                    <Table
                        columns={this.columns}
                        dataSource={data}
                        pagination={false}
                    />
                </div>
            </div>
        )
    }
}
export default addressList;