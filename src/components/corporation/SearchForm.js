import React  from 'react';
import { Form, Row, Col, Input, Select} from 'antd';
import {HttpRequest} from '../../utils/js/common';
import domain from '../../domain/domain';
require('../../utils/style/userControl.css');

const FormItem = Form.Item;
const Option = Select.Option;


class SearchForm extends React.Component {

  constructor(props){
    super(props);
    this.state={
      expand: false,
      values: undefined,
      orgCodeType:[],
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
  }
  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {orgCodeType}=this.state;
    const   formItemLayout={labelCol: { span:6}}
    return (
      <Form
        className="ant-advanced-search-form wrappedAdvancedSearchForm"
        onSubmit={this.handleSearch}
      >
        <Row gutter={24}>
          <Col span={8} style={{ textAlign: 'left'}}>
            <FormItem label="法人机构名称" {...formItemLayout}>
              {getFieldDecorator(`orgName`)(
                <Input placeholder="请输入法人机构名称" style={{ width: 200 }}/>  
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ textAlign: 'left'}}>
            <FormItem label="法人机构地址" {...formItemLayout}>
              {getFieldDecorator(`orgAddress`)(
                <Input placeholder="请输入法人机构地址" style={{ width: 200 }}/>  
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ textAlign: 'left'}}>
            <FormItem label="法人代表人" {...formItemLayout}>
              {getFieldDecorator(`orgPrincipalName`)(
                <Input placeholder="请输入法人代表人" style={{ width: 200 }}/>  
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ textAlign: 'left'}}>
            <FormItem label="法人证号类型：" {...formItemLayout}>
              {getFieldDecorator(`orgCodeType`,{
                initialValue:"1",
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
          </Col>

          <Col span={8} style={{ textAlign: 'left'}}>
            <FormItem label="机构代码" {...formItemLayout}>
              {getFieldDecorator(`orgCode`)(
                <Input placeholder="请输入机构代码" style={{ width: 200 }}/>  
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedSearchForm = Form.create()(SearchForm);

export default  WrappedSearchForm;