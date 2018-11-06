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
            titles:['未分配行政区划', '已分配行政区划'],
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
            res.map((item)=>{
                item.key=item.id;
            })
            this.setState({
                provinceList:res,
                mockData:res,
            })
        }
    )  
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
        if(e===2){
            this.setState({
                mockData:[]
            })
        }else{
            this.setState({
                mockData:this.state.provinceList
            })
        }
        this.setState({
            level:e,
            targetKeys:[]
        })
    }
    changeProvince(e){
        HttpRequest.getRequest(
            {
                url:domain.areaList,
                params:{
                    regionId:e,
                    level:2
                } 
            },
            res=>{
                res.map((item)=>{
                    item.key=item.id;
                })
                this.setState({
                    mockData:res,
                })
            }
        )
    }

  handleChange = (targetKeys, direction, moveKeys) => {
    console.log(targetKeys);
    this.setState({ targetKeys:targetKeys});
  }

  render() {
    const {provinceList,level,mockData,visible}=this.state;
    return (
        <Modal
            title="操作"
            visible={visible}
            destroyOnClose={true}
            title={"行政区划分"}
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
            {level===2?(<Select placeholder='请选择省'allowClear  onChange={this.changeProvince.bind(this)} style={{width: 200,marginLeft:"20px"}}>
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
                dataSource={mockData}
                targetKeys={this.state.targetKeys}
                onChange={this.handleChange}
                render={item => item.name}
            />
        </Modal>
    );
  }
}

export default AreaModalBox