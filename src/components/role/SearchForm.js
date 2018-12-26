import React  from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Row, Col, Input, Button, Select,DatePicker,Radio} from 'antd';
import {HttpRequest} from '../../utils/js/common';
import domain from '../../domain/domain';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;


class SearchForm extends React.Component {

  constructor(props){
    super(props);
    this.state={
      expand: false,
      initialValue: 1,
      values: undefined,
      departmentTreeList:[],
      roleDataSources:[],
      shopDataSources:[],
    };
  }

  getItemsValue= ()=>{    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
    const values= this.props.form.getFieldsValue();       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
    return values;
  }
  handleReset = () => {
    this.props.form.resetFields();
  }
  componentDidMount(e){
    HttpRequest.getRequest(
        {
            url:domain.departmentTreeList,
            params:{
              parentId:'0001'
            } 
        },
        res=>{
          this.setState({
            departmentTreeList:res.subDepartment
          })
        }
    )
    // 角色查询
    HttpRequest.getRequest(
      {
          url:domain.allRole
      },
      res=>{
        this.setState({
          roleDataSources:res?res:[]
        })
      }
    )
  }
  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
  }
  // 门店模糊查询
  handleShopSearch(e){
    HttpRequest.getRequest(
      {
          url:domain.shopSearchList,
          params:{
            keyWord:e,
          },
      },
      res=>{
        this.setState({
          shopDataSources:res?res:[]
        })
      }
    )
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout={labelCol: { span:4}}

    return (
      <Form
        className="ant-advanced-search-form wrappedAdvancedSearchForm"
        onSubmit={this.handleSearch}
      >
        <Row gutter={24}>
          <Row>
            <Col span={8}>
              <FormItem label="角色ID" {...formItemLayout}>
                {getFieldDecorator(`loginId`)(
                  <Input placeholder="请输入角色ID" style={{ width: 200 }}/>  
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="角色名称" {...formItemLayout}>
                {getFieldDecorator(`fullname`)(
                  <Input placeholder="请输入姓名" style={{ width: 200 }}/>  
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="创建日期" {...formItemLayout}>
                  {getFieldDecorator(`openDate`, {
                      rules: [{
                          required: false,message: '请选择创建日期!',
                      }],
                  })(
                      <DatePicker style={{ width: 200 }}/>
                  )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="创建人" {...formItemLayout}>
                {getFieldDecorator(`fullname`)(
                  <Input placeholder="请输入创建人" style={{ width: 200 }}/>  
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="已锁定" {...formItemLayout}>
                {getFieldDecorator(`isLocked`, {initialValue:"0"})(
                  <RadioGroup>
                    <Radio value="1">是</Radio>
                    <Radio value="0">否</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
          </Row>        
        </Row>
      </Form>
    );
  }
}

const WrappedSearchForm = Form.create()(SearchForm);

export default  WrappedSearchForm;