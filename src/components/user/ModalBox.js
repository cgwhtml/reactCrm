//wq 角色分配 品牌分配
import React , {Component} from 'react';
import { Modal, Button,Transfer } from 'antd';


import domain from '../../domain/domain';

import {TransferLeft,HttpRequest} from '../../utils/js/common'



//角色分配
class ModalBox extends Component{
    constructor(props){
        super(props);
        this.state={
            mockData:[],
            visible: false,
            targetKeys:[],
            selectedKeys: [],
            titles:['未分配角色', '已分配角色']
        };

    }
    //模态框
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    //传值
    filterList=()=>{
        const { filterModalData } = this.props;
        let keys=this.state.targetKeys;
        let mockData=this.state.mockData;
        let name=TransferLeft.getName(keys,mockData,'role');
        filterModalData(name);
    }
    handleModalOk = (e) => {
        let _this=this;
        _this.filterList();
        _this.setState({
            visible: false,
        });
    }
    handleModalCancel = (e) => {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }
    //穿梭框
    handleChange = (nextTargetKeys, direction, moveKeys) => {
        this.setState({ targetKeys: nextTargetKeys });
    }

    handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
    }

    handleScroll = (direction, e) => {

    }

    componentDidMount = ()=>{
        var _this=this;
        HttpRequest.getRequest({
            url: domain.roles,
            params: {userId:_this.props.id},
        }, (result)=>{
                _this.setState({
                    mockData:result.allRoles,
                    targetKeys:result.withRoles
                });
                _this.filterList();
        })
    }

    render(){
        return(
            <div>
                <Button type="primary" style={{display:'none'}} onClick={this.showModal}>Open</Button>
                <Modal
                    title="操作"
                    visible={this.state.visible}
                    onOk={this.handleModalOk}
                    onCancel={this.handleModalCancel}
                >
                    <Transfer
                        rowKey={record => record.id}
                        dataSource={this.state.mockData}
                        titles={this.state.titles}
                        targetKeys={this.state.targetKeys}
                        selectedKeys={this.state.selectedKeys}
                        onChange={this.handleChange}
                        onSelectChange={this.handleSelectChange}
                        onScroll={this.handleScroll}
                        render={item => item.name}
                    />
                </Modal>
            </div>
        )
    }
}


//主品牌
class MasterBrand extends Component{
    constructor(props){
        super(props);
        this.state={
            mockData:[],
            visible: false,
            targetKeys:[],
            selectedKeys: [],
            titles:['未分配品牌', '已分配品牌']
        };

    }
    //模态框
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    //传值
    filterList=()=>{
        const { filterModalData } = this.props;
        let keys=this.state.targetKeys;
        let mockData=this.state.mockData;
        let name=TransferLeft.getName(keys,mockData);
        filterModalData(name);
    }
    handleModalOk = (e) => {
        let _this=this;
        _this.filterList();
        _this.setState({
            visible: false,
        });
    }
    handleModalCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    //穿梭框
    handleChange = (nextTargetKeys, direction, moveKeys) => {
        this.setState({ targetKeys: nextTargetKeys });
    }

    handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
    }

    handleScroll = (direction, e) => {
    }
    
    brand=()=>{
        var _this=this;
        HttpRequest.getRequest({
            url: domain.brand,
            params: {
                isMain:1,
                userId:_this.props.id
            },
        }, (result)=>{
            _this.setState({
                mockData:result.allBrands,
                targetKeys:result.bindings?result.bindings:[]
            });
            _this.filterList();

        })
    }
    componentDidMount = ()=>{
        this.brand();
    }
    render(){
        return(
            <div>
                <Button type="primary" style={{display:'none'}} onClick={this.showModal}>Open</Button>
                <Modal
                    title="操作"
                    visible={this.state.visible}
                    onOk={this.handleModalOk}
                    onCancel={this.handleModalCancel}
                >
                    <Transfer
                        rowKey={record => record.id}
                        dataSource={this.state.mockData}
                        titles={this.state.titles}
                        targetKeys={this.state.targetKeys}
                        selectedKeys={this.state.selectedKeys}
                        onChange={this.handleChange}
                        onSelectChange={this.handleSelectChange}
                        onScroll={this.handleScroll}
                        render={item => item.name}
                    />
                </Modal>
            </div>
        )
    }
}


//非主品牌
class NotMainBrand extends Component{
    constructor(props){
        super(props);
        this.state={
            mockData:[],
            visible: false,
            targetKeys:[],
            selectedKeys: [],
            titles:['未分配品牌', '已分配品牌']
        };

    }
    //模态框
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    //传值
    filterList=()=>{
        const { filterModalData } = this.props;
        let keys=this.state.targetKeys;
        let mockData=this.state.mockData;
        let name=TransferLeft.getName(keys,mockData);
        filterModalData(name);
    }
    handleModalOk = (e) => {
        console.log(e.target);
        let _this=this;
        _this.filterList();
        _this.setState({
            visible: false,
        });
    }
    handleModalCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    //穿梭框
    handleChange = (nextTargetKeys, direction, moveKeys) => {
        this.setState({ targetKeys: nextTargetKeys });
    }

    handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
    }

    handleScroll = (direction, e) => {

    }

    brand = ()=>{
        var _this=this;
        HttpRequest.getRequest({
            url: domain.brand,
            params: {
                isMain:2,
                userId:_this.props.id
            },
        }, (result)=>{
            _this.setState({
                mockData:result.allBrands,
                targetKeys:result.bindings?result.bindings:[]
            });
            _this.filterList();

        })
    }
    componentDidMount = ()=>{
        this.brand();
    }
    render(){
        return(
            <div>
                <Button type="primary" style={{display:'none'}} onClick={this.showModal}>Open</Button>
                <Modal
                    title="操作"
                    visible={this.state.visible}
                    onOk={this.handleModalOk}
                    onCancel={this.handleModalCancel}
                >
                    <Transfer
                        rowKey={record => record.id}
                        dataSource={this.state.mockData}
                        titles={this.state.titles}
                        targetKeys={this.state.targetKeys}
                        selectedKeys={this.state.selectedKeys}
                        onChange={this.handleChange}
                        onSelectChange={this.handleSelectChange}
                        onScroll={this.handleScroll}
                        render={item => item.name}
                    />
                </Modal>
            </div>
        )
    }
}


export {ModalBox , MasterBrand, NotMainBrand} ;