import React from 'react';
import { Button, Modal, Form, Input,Select} from 'antd';
import AreaModalBox from './AreaModalBox';
import {HttpRequest} from '../../utils/js/common';
import domain from '../../domain/domain';

const FormItem = Form.Item;

class areaEdit extends React.Component {
    constructor(props){
        super(props);
        this.state={
            editMsg:{},
            id:'',
            orgCodeType:[],
            areaCodeArr:[],
            areaArr:[]
        };
    }
    onRef = (ref) => {
        this.areaModal = ref
    }
    showAreaModal = () => {
        this.areaModal.showModal();
    }
    getAreaData=(value)=>{
        value.map((item)=>{
            this.state.areaCodeArr.push(item.id)
            return this.state.areaCodeArr;
        })
        this.setState({
            areaCodeArr:this.state.areaCodeArr,
            areaArr:value
        })
    }
    componentDidMount(){
        const id=this.props.id
        if(!id){
            return;
        }
        HttpRequest.getRequest(
            {
                url:domain.areaDetail,
                params:{
                    id:id,
                } 
            },
            res=>{
              if(res){
                this.setState({
                  editMsg:res?res:{},
                  id:res.id
                })
              }
            }
        )
    }
    render() {
    const { visible, onCancel, onCreate} = this.props;
    const { getFieldDecorator } = this.props.form;
    const {editMsg,id,areaCodeArr,areaArr}=this.state;
    return (
        <Modal
            visible={visible}
            destroyOnClose={true}
            title={id?'修改区域信息':'添加区域信息'}
            okText="保存"
            onCancel={onCancel}
            onOk={onCreate}
        >
            <Form>
                <FormItem label="区域编码" labelCol={{span:6}}>
                    {getFieldDecorator('id',{
                        initialValue:editMsg.id,
                    })(
                        <Input placeholder="请输入区域编码" style={{ width: 200 }} disabled/>    
                    )}
                </FormItem>
                <FormItem label="区域名称" labelCol={{span:6}}>
                    {getFieldDecorator(`name`,{
                            initialValue:editMsg.name?editMsg.name:'',
                            rules:[{
                            required:true,
                            message: '请输入区域名称!'
                        }]
                    })(
                        <Input placeholder="请输入区域名称" style={{ width: 200 }}/>  
                    )}
                </FormItem>
                <FormItem label="区域全称" labelCol={{span:6}}>
                    {getFieldDecorator(`fullname`,{
                            initialValue:editMsg.fullname?editMsg.fullname:'',
                            rules:[{
                            required:true,
                            message: '请输入区域全称!'
                        }]
                    })(
                        <Input placeholder="请输入区域全称" style={{ width: 200 }}/>  
                    )}
                </FormItem>  
                <FormItem label='包含行政区划' labelCol={{span:6}}>
                    {getFieldDecorator(`area`,{
                            initialValue:areaCodeArr,
                            rules:[{
                            required:true,
                            message: '请选择行政区划!'
                        }]
                    })(
                        <Select
                            mode="multiple"
                            style={{ width: 200}}
                            placeholder='请选择行政区划'
                            disabled
                        >
                            {areaArr.length>0 &&
                                areaArr.map((item,i) => {
                                    return (
                                        <Select.Option key={i} value={item.id}>
                                            {item.name}
                                        </Select.Option>
                                    )        
                                })
                            }
                        </Select>
  
                    )}
                    <Button onClick={()=>this.showAreaModal()} style={{marginLeft:"20px"}}>行政区划</Button>
                    <AreaModalBox
                        onRef={this.onRef} 
                        filterModalData={this.getAreaData.bind(this)}    
                       />
                </FormItem>        
            </Form>
        </Modal>
    );
    }
}
const AreaEdit = Form.create()(areaEdit);
export default AreaEdit;