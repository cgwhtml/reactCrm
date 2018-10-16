import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table} from 'antd';
import {HttpRequest} from '../../utils/js/common';
import domain from '../../domain/domain';

class invoiceInfoList extends Component {
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
            { title: '单位名称', dataIndex: 'companyName', key: 'companyName', width: 100 },
            { title: '纳税人识别号', dataIndex: 'taxpayerNumber', key: 'taxpayerNumber', width: 100},
            { title: '开户银行', dataIndex: 'openingBank', key: 'openingBank', width: 150 },
            { title: '银行账号', dataIndex: 'account', key: 'account', width: 150 },
            { title: '电话', dataIndex: 'phoneNumber', key: 'phoneNumber', width: 150 },
            { title: '地址', dataIndex: 'address', key: 'address', width: 150},
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
                    url:domain.invoiceInfoList,
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
export default invoiceInfoList;