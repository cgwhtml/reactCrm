import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Radio,DatePicker,Select} from 'antd';
import moment from 'moment'
import {HttpRequest,Check} from '../../utils/js/common';
import domain from '../../domain/domain';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class CorOrgForm extends Component {
    constructor(props){
        super(props);
        this.state={
            editMsg:{},
            id:'',
            orgCodeType:[],
        };
    }
    componentDidMount(){
        const id=this.props.id
        // 法人证号类型下拉
        HttpRequest.getRequest(
            {
                url:domain.shopTypeList,
                params:{
                typeId:'org_code_type'
                },
            },
            res=>{
            this.setState({
                orgCodeType:res?res:[]
            })
            }
        )
        if(!id){
            return;
        }
        HttpRequest.getRequest(
            {
                url:domain.corOrgEditDetail,
                params:{
                    id:id
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
    const {orgCodeType,editMsg,id}=this.state;
    return (
        <Modal
            visible={visible}
            destroyOnClose={true}
            maskClosable={false}
            title={id?'修改法人机构信息':'添加法人机构信息'}
            okText="保存"
            onCancel={onCancel}
            onOk={onCreate}
        >
        <Form>
            <FormItem label="法人机构ID" labelCol={{span:6}}>
                {getFieldDecorator('id',{
                    initialValue:editMsg.id,
                })(
                    <span>{id}<Input type="hidden"/></span>   
                )}
            </FormItem>
            <FormItem label="法人机构名称" labelCol={{span:6}}>
                {getFieldDecorator(`orgName`,{
                        initialValue:editMsg.orgName?editMsg.orgName:'',
                        rules:[{
                        required:true,
                        message: '请输入法人机构名称!'
                    }]
                })(
                    <Input placeholder="请输入法人机构名称" style={{ width: 300 }}/>  
                )}
            </FormItem>
            <FormItem label="法人类型" labelCol={{span:6}}>
                {getFieldDecorator('orgType')(
                    <span>普通企业</span>    
                )}
            </FormItem>
            <FormItem label="法人地址" labelCol={{span:6}}>
                {getFieldDecorator(`orgAddress`,{
                        initialValue:editMsg.orgAddress?editMsg.orgAddress:'',
                        rules:[{
                        required:true,
                        message: '请输入法人地址!'
                    }]
                })(
                    <Input placeholder="请输入法人地址" style={{ width: 300 }}/>  
                )}
            </FormItem>
            <FormItem label="法人代表" labelCol={{span:6}}>
                {getFieldDecorator(`orgPrincipalName`,{
                        initialValue:editMsg.orgPrincipalName?editMsg.orgPrincipalName:'',
                        rules:[{
                        required:true,
                        message: '请输入法人代表!'
                    }]
                })(
                    <Input placeholder="请输入法人代表" style={{ width: 200 }}/>  
                )}
            </FormItem>
            <FormItem label="法人代表身份证" labelCol={{span:6}}>
                {getFieldDecorator(`orgPrincipalIdcard`,{
                        initialValue:editMsg.orgPrincipalIdcard?editMsg.orgPrincipalIdcard:'',
                        rules:[{
                        required:true,
                        message: '请输入法人代表身份证!'
                    },{
                        validator:Check.idCard,
                    }]
                })(
                    <Input placeholder="请输入法人代表身份证" style={{ width: 200 }}/>  
                )}
            </FormItem>
            <FormItem label="法人代表电话" labelCol={{span:6}}>
                {getFieldDecorator(`orgPrincipalPhone`,{
                        initialValue:editMsg.orgPrincipalPhone?editMsg.orgPrincipalPhone:'',
                        rules:[{
                        required:false,
                    },{
                        validator: (rule, value, callback)=>{
                            if(!/^1\d{10}$/.test(value) && value) {
                                callback('手机号码输入有误'); // 校验未通过
                            }else{
                                callback()
                            }
                        }
                    }]
                })(
                    <Input placeholder="请输入法人代表电话" style={{ width: 200 }}/>  
                )}
            </FormItem>
            <FormItem label="成立日期" labelCol={{span:6}}>
                {getFieldDecorator(`registerDate`,{
                        initialValue:editMsg.registerDate?moment(editMsg.registerDate):editMsg.registerDate,
                        rules:[{
                        required:false,
                        message: '请输入成立日期!'
                    }]
                })(
                    <DatePicker/> 
                )}
            </FormItem>
            <FormItem label="法人证号类型" labelCol={{span:6}}>
                {getFieldDecorator(`orgCodeType`,{
                        initialValue:editMsg.orgCodeType?editMsg.orgCodeType:"1",
                        rules:[{
                        required:true,
                        message: '请输入法人证号类型!'
                    }]
                })(
                  <Select
                    style={{ width: 200 }}
                    placeholder="请选择法人证号类型"
                    optionFilterProp="children"
                  >
                    {orgCodeType.length>0 && 
                      orgCodeType.map((item,i) => {
                          return (
                              <Option key={item.code} value={item.code}>
                                  {item.name}
                              </Option>    
                          )        
                      })
                    }
                  </Select>  
                )}
            </FormItem>
            <FormItem label="法人机构代码" labelCol={{span:6}}>
                {getFieldDecorator(`orgCode`,{
                        initialValue:editMsg.orgCode?editMsg.orgCode:'',
                        rules:[{
                        required:true,
                        message: '请输入法人机构代码!'
                    }]
                })(
                    <Input placeholder="请输入法人机构代码" style={{ width: 200 }}/>  
                )}
            </FormItem>
            <FormItem label="法人法人状态" labelCol={{span:6}}>
                {getFieldDecorator(`orgStatus`,{
                        initialValue:editMsg.orgStatus?editMsg.orgStatus:"1",
                        rules:[{
                        required:true,
                        message: '请选择法人状态!'
                    }]
                })(
                    <RadioGroup>
                    <Radio value="1">有效</Radio>
                    <Radio value="0">无效</Radio>
                    </RadioGroup>
                )}
            </FormItem>
        </Form>
        </Modal>
    );
    }
}
const CorOrgEdit = Form.create()(CorOrgForm);
export default CorOrgEdit;