import React from 'react';
import { Modal, Form, Input} from 'antd';
import {HttpRequest} from '../../utils/js/common';
import domain from '../../domain/domain';

const FormItem = Form.Item;
const { TextArea } = Input;

class roleEdit extends React.Component {
    constructor(props){
        super(props);
        this.state={
            deptMsg:{},
            id:'',
            orgCodeType:[],
            areaCodeArr:[],
            areaArr:[]
        };
    }
    componentDidMount(){
        const id=this.props.id
        if(!id){
            return;
        }
        HttpRequest.getRequest(
            {
                url:domain.deptDetail,
                params:{
                    id:id,
                } 
            },
            res=>{
              if(res){
                this.setState({
                  deptMsg:res?res:{},
                  id:res.id
                })
              }
            }
        )
    }
    render() {
    const { visible, onCancel, onCreate} = this.props;
    const { getFieldDecorator } = this.props.form;
    const {deptMsg,id}=this.state;
    return (
        <Modal
            visible={visible}
            destroyOnClose={true}
            title={id?'修改组织机构信息':'添加组织机构信息'}
            okText="保存"
            onCancel={onCancel}
            onOk={onCreate}
        >
            <Form>
                <FormItem label="角色ID" labelCol={{span:6}}>
                    {getFieldDecorator('id',{
                        initialValue:deptMsg.id,
                    })(
                        <Input placeholder="请输入区域编码" style={{ width: 200 }} disabled/>    
                    )}
                </FormItem>
                <FormItem label="角色名称" labelCol={{span:6}}>
                    {getFieldDecorator(`name`,{
                            initialValue:deptMsg.name?deptMsg.name:'',
                            rules:[{
                            required:true,
                            message: '请输入角色名称!'
                        }]
                    })(
                        <Input placeholder="请输入角色名称" style={{ width: 200 }}/>  
                    )}
                </FormItem>
                <FormItem label="角色描述" labelCol={{span:6}}>
                    {getFieldDecorator(`fullName`,{
                            initialValue:deptMsg.fullName?deptMsg.fullName:'',
                            rules:[{
                            required:true,
                            max:100,
                            message: '请输入机构全称!'
                        }]
                    })(
                        <TextArea placeholder="请输入角色描述（100字符以内）" style={{ width: 300 }}/>  
                    )}
                </FormItem>
            </Form>
        </Modal>
    );
    }
}
const RoleEdit = Form.create()(roleEdit);
export default RoleEdit;