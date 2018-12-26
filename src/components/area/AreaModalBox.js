import React from 'react';
import { Transfer,Modal,Row,Select,Col} from 'antd';
import {TransferLeft,HttpRequest} from '../../utils/js/common'
import domain from '../../domain/domain';

class AreaModalBox extends React.Component {
    constructor(props){
        super(props);
        this.state={
            mockData:[],
            visible: false,
            targetKeys:[],
            titles:['未分配', '已分配'],
            provinceList:[],
            level:1
        };

    }

  componentDidMount() {
    this.props.onRef(this)
    HttpRequest.getRequest(
        {
            url:domain.areaRegion,
            params:{
                level:1
            } 
        },
        res=>{
            if(res.length>0){
                res.map((item)=>{
                    item.key=item.id;
                    item.level=1;
                    return item;
                })
                this.setState({
                    provinceList:res,
                    mockData:res,
                })    
            }
        }
    )
    setTimeout(()=>{
        this.changeLevel(1)
    },500)
  }
    //传值
    filterList=()=>{
        const { filterModalData } = this.props;
        let keys=this.state.targetKeys;
        let mockData=this.state.mockData;
        let name=TransferLeft.getName(keys,mockData);
        filterModalData(name);
    }
    //模态框
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleModalOk = (e) => {
        let _this=this;
        _this.filterList();
        _this.setState({
            visible: false,
        });
    }
    // 区域等级改变
    changeLevel(e){
        let areaArrlist=this.props.areaArr;
        let arrListP=[];
        let arrListC=[];
        let selectedListP=[];
        let selectedListC=[];
        if(areaArrlist.length>0){
            areaArrlist.map((item)=>{
                item.key=item.id;
                item.title=item.name;
                if(item.level===1){
                    selectedListP.push(item.id);
                    arrListP.push(item);
                }else{
                    selectedListC.push(item.id);
                    arrListC.push(item);
                }
                return item;
            })
        }
        if(e===2){
            this.setState({
                targetKeys:selectedListC,
                mockData:[...arrListC]
            })
        }else{
            this.setState({
                targetKeys:selectedListP,
                mockData:[...arrListP,...this.state.provinceList]
            })
        }
        this.setState({
            level:e,
            // targetKeys:[]
        })
    }
    changeProvince(e){
        HttpRequest.getRequest(
            {
                url:domain.areaRegion,
                params:{
                    regionId:e,
                    level:2
                } 
            },
            res=>{
                res.map((item)=>{
                    item.key=item.id;
                    item.level=2;
                    return item;
                })
                this.setState({
                    mockData:res,
                })
            }
        )
    }

  handleChange = (targetKeys, direction, moveKeys) => {
    this.setState({ targetKeys:targetKeys});
  }

  render() {
    const {provinceList,level,mockData,visible,targetKeys}=this.state;
    return (
        <Modal
            title="操作"
            visible={visible}
            destroyOnClose={true}
            okText="保存"
            onCancel={this.handleCancel}
            onOk={()=>this.handleModalOk()}
        >
        <Row gutter={24} style={{marginBottom:"20px"}}>
            <span>行政区划:</span>
            <Select onChange={this.changeLevel.bind(this)} style={{width: 100,marginLeft:"20px"}} value={level}>
                <Select.Option key={1} value={1}>省级</Select.Option>
                <Select.Option key={2} value={2}>市级</Select.Option>
            </Select>
            {level===2?(<Select placeholder='请选择省' allowClear  onChange={this.changeProvince.bind(this)} style={{width: 200,marginLeft:"20px"}}>
                {provinceList.length > 0 &&
                    provinceList.map((item, i) => {
                        return (
                            <Select.Option key={i} value={item.id}>
                                {item.name}
                            </Select.Option>
                        );
                    })
                }
            </Select>):''}        
            </Row>
            <Transfer
                titles={this.state.titles}
                dataSource={mockData}
                onChange={this.handleChange}
                targetKeys={targetKeys}
                render={item => item.name}
            />
        </Modal>
    );
  }
}

export default AreaModalBox