import React  from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Row, Col, Input, Button, Select} from 'antd';
import {HttpRequest} from '../../utils/js/common';
import domain from '../../domain/domain';

const FormItem = Form.Item;
const Option = Select.Option;


class SearchForm extends React.Component {

  constructor(props){
    super(props);
    this.state={
      initialValue: 1,
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const   formItemLayout={labelCol: { span:4}}
    return (
      <Form
        className="ant-advanced-search-form wrappedAdvancedSearchForm"
        onSubmit={this.handleSearch}
      >
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label="系统" {...formItemLayout}>
              {getFieldDecorator(`loginId`)(
                <Input placeholder="请输入系统" style={{ width: 200 }}/>  
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="配置分节" {...formItemLayout}>
              {getFieldDecorator(`fullname`)(
                <Input placeholder="请输入配置分节" style={{ width: 200 }}/>  
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="配置名称" {...formItemLayout}>
              {getFieldDecorator(`fullname`)(
                <Input placeholder="请输入配置名称" style={{ width: 200 }}/>  
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
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedSearchForm = Form.create()(SearchForm);

export default  WrappedSearchForm;