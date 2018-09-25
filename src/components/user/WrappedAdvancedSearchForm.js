import React  from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Row, Col, Input, Button, Select,Icon,Radio,TreeSelect} from 'antd';
require('../../utils/style/userControl.css');

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const treeData = [{
  title: '管理层',
  value: '0-0',
  key: '0-0',
}, {
  title: '门店事业部',
  value: '0-1',
  key: '0-1',
  children: [{
    title: '区域管理',
    value: '0-0-1',
    key: '0-0-1',
  }, {
    title: '小门店',
    value: '0-0-2',
    key: '0-0-2',
  }],
}];

function handleChange(value) {
  console.log(`selected ${value}`);
}

function handleBlur() {
  console.log('blur');
}

function handleFocus() {
  console.log('focus');
}

class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
    initialValue: 1,
    values: undefined,
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form
        className="ant-advanced-search-form wrappedAdvancedSearchForm"
        onSubmit={this.handleSearch}
      >
        <Row gutter={24}>
          <Col span={8} style={{ textAlign: 'left'}}>
            <FormItem label="登陆账号" style={{display: "flex"}}>
              {getFieldDecorator(`loginId`)(
                <Input placeholder="请输入登陆账号"/>  
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ textAlign: 'left'}}>
            <FormItem label="姓名" style={{display: "flex"}}>
              {getFieldDecorator(`fullname`)(
                <Input placeholder="请输入姓名"/>  
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ textAlign: 'left'}}>
            <FormItem label="账号内部唯一识别号" style={{display: "flex"}}>
              {getFieldDecorator(`id`)(
                <Input placeholder="请输入账号内部唯一识别号"/>  
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ textAlign: 'left'}}>
            <FormItem label="所属部门" style={{display: "flex"}}>
              {getFieldDecorator(`departmentId`)(
                 <TreeSelect
                 style={{ width: 300 }}
                 initialValue={this.state.values}
                 dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                 treeData={treeData}
                 placeholder="请选择"
                 treeDefaultExpandAll
                 onChange={this.onChanges}
               />  
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ textAlign: 'left'}}>
            <FormItem label="所属门店" style={{display: "flex"}}>
              {getFieldDecorator(`shopName`)(
                <Input placeholder="请输入所属门店"/>  
              )}
            </FormItem>
          </Col>
          <Col span={8} style={{ textAlign: 'left'}}>
            <FormItem label="角色" style={{display: "flex"}}>
              {getFieldDecorator(`roleId`)(
                <Select
                showSearch
                style={{ width: 200 }}
                placeholder="请选择角色"
                optionFilterProp="children"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
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
              {getFieldDecorator(`isDelete`)(
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
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
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