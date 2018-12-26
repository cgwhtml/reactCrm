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
        };

    }

  componentDidMount() {
    // HttpRequest.getRequest(
    //     {
    //         url:domain.areaRegion,
    //         params:{
    //             level:1
    //         } 
    //     },
    //     res=>{
    //         res.map((item)=>{
    //             item.key=item.id;
    //             return item;
    //         })
    //         this.setState({
    //             provinceList:res,
    //             mockData:res,
    //         })
    //     }
    // )  
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

  handleChange = (targetKeys, direction, moveKeys) => {
    this.setState({ targetKeys:targetKeys});
  }

  render() {
    const { visible, onCancel, onCreate} = this.props;
    const {mockData}=this.state;
    return (
        <Modal
            title="操作"
            visible={visible}
            destroyOnClose={true}
            okText="保存"
            onCancel={onCancel}
            onOk={onCreate}
        >
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