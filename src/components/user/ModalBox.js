//wq
import React , {Component} from 'react';
import { Modal, Button,Transfer } from 'antd';
import axios from 'axios';
import domain from '../../domain/domain';

let mockData = [];
for (let i = 0; i < 20; i++) {
    mockData.push({
        id: i.toString(),
        title: `角色${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 3 < 1,
    });
}

let targetKeys = mockData
    .filter(item => +item.id % 5 > 1)
    .map(item => item.id);

console.log(targetKeys);

//角色分配
class ModalBox extends Component{
    constructor(props){
        super(props);
        this.state={
            visible: false,
            targetKeys,
            selectedKeys: [],
            titles:['未分配角色', '已分配角色']
        };

    }
    //模态框
    showModal = () => {
        console.log(this.props.mockData);
        this.setState({
            visible: true,
        });
    }
    handleModalOk = (e) => {
        console.log(e.target);
        const { filterModalData } = this.props;
        filterModalData(this.state.targetKeys);
        this.setState({
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

        console.log('targetKeys: ', nextTargetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);
    }

    handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        console.log('targetSelectedKeys: ', targetSelectedKeys);
    }

    handleScroll = (direction, e) => {
        console.log('direction:', direction);
        console.log('target:', e.target);
    }
    // componentWillReceiveProps=(nextProps)=>{
    //     this.setState({
    //         targetKeys:nextProps.mockData.targetKeys
    //     });
    // }
    componentDidMount = ()=>{
        var _this=this;
        axios.post(domain.roles,{
            params:{
                userId:1578
            }
        }).then(res=>{
            let data=res.data;
            console.log(data);
            if(data.error==0){
                let result=data.result;
                mockData=result.withoutRoles;
                _this.setState({
                    targetKeys:["10000001-ab32-11e8-a23f-00155d58fc01"]
                })
            }
        });
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
                        dataSource={mockData}
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


const mockMasterData = [];
for (let i = 0; i < 20; i++) {
    mockMasterData.push({
        key: i.toString(),
        title: `品牌${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 3 < 1,
    });
}

const targetKeysMaster = mockMasterData
    .filter(item => +item.key % 3 > 1)
    .map(item => item.key);
//主品牌
class MasterBrand extends Component{
    constructor(props){
        super(props);
        this.state={
            visible: false,
            targetKeys:targetKeysMaster,
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
    handleModalOk = (e) => {
        console.log(e.target);
        const { filterModalData } = this.props;
        filterModalData(this.state.targetKeys);
        this.setState({
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

        console.log('targetKeys: ', nextTargetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);
    }

    handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        console.log('targetSelectedKeys: ', targetSelectedKeys);
    }

    handleScroll = (direction, e) => {
        console.log('direction:', direction);
        console.log('target:', e.target);
    }
    componentDidMount = ()=>{
        axios.get(domain.roles,{
            params:{
                userId:1578
            }
        }).then(res=>{
            console.log(res);
        });
    }
    // componentWillReceiveProps=(nextProps)=>{
    //     this.setState({
    //         targetKeys:nextProps.mockData.targetKeys
    //     });
    // }
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
                        dataSource={mockMasterData}
                        titles={this.state.titles}
                        targetKeys={this.state.targetKeys}
                        selectedKeys={this.state.selectedKeys}
                        onChange={this.handleChange}
                        onSelectChange={this.handleSelectChange}
                        onScroll={this.handleScroll}
                        render={item => item.title}
                    />
                </Modal>
            </div>
        )
    }
}


//非主品牌
const mockNotMainData = [];
for (let i = 0; i < 20; i++) {
    mockNotMainData.push({
        key: i.toString(),
        title: `非主品牌${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 3 < 1,
    });
}

const targetKeysNotMain = mockNotMainData
    .filter(item => +item.key % 3 > 1)
    .map(item => item.key);
//非主品牌
class NotMainBrand extends Component{
    constructor(props){
        super(props);
        this.state={
            visible: false,
            targetKeys:targetKeysNotMain,
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
    handleModalOk = (e) => {
        console.log(e.target);
        const { filterModalData } = this.props;
        filterModalData(this.state.targetKeys);
        this.setState({
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

        console.log('targetKeys: ', nextTargetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);
    }

    handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        console.log('targetSelectedKeys: ', targetSelectedKeys);
    }

    handleScroll = (direction, e) => {
        console.log('direction:', direction);
        console.log('target:', e.target);
    }
    // componentWillReceiveProps=(nextProps)=>{
    //     this.setState({
    //         targetKeys:nextProps.mockData.targetKeys
    //     });
    // }
    componentDidMount = ()=>{
        axios.get(domain.roles,{
            params:{
            userId:1578
            }
        }).then(res=>{
            console.log(res);
        });
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
                        dataSource={mockNotMainData}
                        titles={this.state.titles}
                        targetKeys={this.state.targetKeys}
                        selectedKeys={this.state.selectedKeys}
                        onChange={this.handleChange}
                        onSelectChange={this.handleSelectChange}
                        onScroll={this.handleScroll}
                        render={item => item.title}
                    />
                </Modal>
            </div>
        )
    }
}


export {ModalBox , MasterBrand, NotMainBrand} ;