import React  from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Row, Col, Input, Button, Select,Icon,Radio,TreeSelect} from 'antd';
import {HttpRequest} from '../../utils/js/common';
import domain from '../../domain/domain';
require('../../utils/style/userControl.css');

const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;
const Option = Select.Option;
const RadioGroup = Radio.Group;


class SearchForm extends React.Component {

  constructor(props){
    super(props);
    this.state={
      dealy:500,
      expand: false,
      initialValue: 1,
      values: undefined,
      departmentTreeList:[],
      roleDataSources:[],
      shopDataSources:[],
    };
  }

  handleSearch = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        console.log(values)
          const { filterCallback } = this.props;
          filterCallback(values);
      });
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
    clearTimeout(this.timer);
    this.timer = setTimeout(()=>{
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
    },this.state.dealy);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const departmentTreeList=this.state.departmentTreeList;
    const roleDataSources=this.state.roleDataSources;
    const shopDataSources=this.state.shopDataSources;
    const   formItemLayout={labelCol: { span:4}}
    return (
      <Form
        className="ant-advanced-search-form wrappedAdvancedSearchForm"
        onSubmit={this.handleSearch}
      >
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label="登录账号" {...formItemLayout}>
              {getFieldDecorator(`loginId`)(
                <Input placeholder="请输入登录账号" style={{ width: 200 }}/>  
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="姓名" {...formItemLayout}>
              {getFieldDecorator(`fullname`)(
                <Input placeholder="请输入姓名" style={{ width: 200 }}/>  
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="ID" {...formItemLayout}>
              {getFieldDecorator(`id`)(
                <Input placeholder="请输入id" style={{ width: 200 }}/>  
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="所属部门" {...formItemLayout}>
              {getFieldDecorator(`departmentId`)(
                 <TreeSelect
                 style={{ width: 200 }}
                 initialValue={this.state.values}
                 dropdownStyle={{ maxHeight: 400, overflow: 'auto'}}
                 placeholder="请选择"
                 allowClear={true}
                 treeDefaultExpandAll
                 onChange={this.onChanges}
                 showSearch={true}
               >
                  {departmentTreeList.length > 0 &&
                      departmentTreeList.map((item, i) => {
                          return (
                              <TreeNode value={item.id} title={item.name} key={i}>
                                 {item.subDepartment.length >0 && 
                                  item.subDepartment.map((items,j)=>{
                                    return (
                                      <TreeNode value={items.id} title={items.name} key={items.id}></TreeNode>
                                    )
                                  })  
                                }    
                              </TreeNode>
                          );
                      })
                  }
              </TreeSelect>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="所属门店" {...formItemLayout}>
              {getFieldDecorator(`shopName`)(
                <Select
                  showSearch
                  placeholder="请输入门店名称"
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  notFoundContent="暂无相关门店信息"
                  allowClear={true}
                  filterOption={false}
                  onSearch={this.handleShopSearch.bind(this)}
                  style={{ width: 200 }}
                >
                  {shopDataSources.length > 0 &&
                      shopDataSources.map((item, i) => {
                          return (
                              <Select.Option key={i} value={item.name}>
                                  {item.name}
                              </Select.Option>
                          );
                      })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="角色" {...formItemLayout}>
              {getFieldDecorator(`roleId`)(
                  <Select
                  showSearch
                  placeholder="请输入角色名称"
                  allowClear={true}
                  notFoundContent="暂无相关角色信息"
                  style={{ width: 200 }}
                  filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                >
                  {roleDataSources.length > 0 &&
                      roleDataSources.map((item, i) => {
                          return (
                              <Select.Option key={i} value={item.id}>
                                  {item.name}
                              </Select.Option>
                          );
                      })
                  }
                </Select>
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
          <Col span={8}>
            <FormItem label="已删除" {...formItemLayout}>
              {getFieldDecorator(`isDeleted`, {initialValue:"0"})(
                <RadioGroup>
                  <Radio value="1">是</Radio>
                  <Radio value="0">否</Radio>
                </RadioGroup>  
              )}
            </FormItem>
          </Col>
        </Row>
        <Row className='row-bottom'>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button htmlType="submit">查询</Button>
            <Button type="danger"  style={{ marginLeft: 8 }} onClick={this.handleReset}>
              清除
            </Button>
            <Button style={{ marginLeft: 8 }}>
              {/*<NavLink exact to='/modify' >新增</NavLink>*/}
              <NavLink exact to={{pathname:'/userEdit/1'}}>新增</NavLink>
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedSearchForm = Form.create()(SearchForm);

export default  WrappedSearchForm;