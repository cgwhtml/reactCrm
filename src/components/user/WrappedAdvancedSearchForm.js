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


class AdvancedSearchForm extends React.Component {

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

  handleSearch = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
          const { filterCallback } = this.props;
          filterCallback(values);
      });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }
  componentDidMount(){
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
  // 角色模糊查询
  handleVagueSearch(e){
    HttpRequest.getRequest(
      {
          url:domain.roleSearchList,
          params:{
            type:2,
            searchParam:e
          },
      },
      res=>{
        this.setState({
          roleDataSources:res.data?res.data:[]
        })
      }
    )
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const departmentTreeList=this.state.departmentTreeList;
    const roleDataSources=this.state.roleDataSources;
    const shopDataSources=this.state.shopDataSources;
    return (
      <Form
        className="ant-advanced-search-form wrappedAdvancedSearchForm"
        onSubmit={this.handleSearch}
      >
        <Row gutter={24}>
          <Col span={8} style={{ textAlign: 'left'}}>
            <FormItem label="登录账号" style={{display: "flex"}}>
              {getFieldDecorator(`loginId`)(
                <Input placeholder="请输入登录账号" style={{ width: 200 }}/>  
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ textAlign: 'left'}}>
            <FormItem label="姓名" style={{display: "flex"}}>
              {getFieldDecorator(`fullname`)(
                <Input placeholder="请输入姓名" style={{ width: 200 }}/>  
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ textAlign: 'left'}}>
            <FormItem label="id" style={{display: "flex"}}>
              {getFieldDecorator(`id`)(
                <Input placeholder="请输入id" style={{ width: 200 }}/>  
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ textAlign: 'left'}}>
            <FormItem label="所属部门" style={{display: "flex"}}>
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
                              <TreeNode value={item.id} title={item.name} key={i} disabled>
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
          <Col span={8} style={{ textAlign: 'left'}}>
            <FormItem label="所属门店" style={{display: "flex"}}>
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
          <Col span={8} style={{ textAlign: 'left'}}>
            <FormItem label="角色" style={{display: "flex"}}>
              {getFieldDecorator(`roleId`)(
                  <Select
                  showSearch
                  placeholder="请输入角色名称"
                  allowClear={true}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={this.handleVagueSearch.bind(this)}
                  notFoundContent="暂无相关角色信息"
                  style={{ width: 200 }}
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
            <FormItem label="已锁定" labelCol={{span:2}}>
              {getFieldDecorator(`isLocked`)(
                <RadioGroup>
                  <Radio value={0}>未锁定</Radio>
                  <Radio value={1}>锁定</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="已删除" labelCol={{span:2}}>
              {getFieldDecorator(`isDeleted`)(
                <RadioGroup>
                  <Radio value="0">未删除</Radio>
                  <Radio value="1">已删除</Radio>
                </RadioGroup>  
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button htmlType="submit">查询</Button>
            <Button type="danger"  style={{ marginLeft: 8 }} onClick={this.handleReset}>
              清除
            </Button>
            <Button style={{ marginLeft: 8 }}>
              <NavLink exact to='/modify'>新增</NavLink>
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

export default  WrappedAdvancedSearchForm;