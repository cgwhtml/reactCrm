//门店管理搜索框
import React , {Component} from 'react';
import {NavLink} from 'react-router-dom';
import { Form, Row, Col, Input, Button, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const formColLayout12 = {
    xxl: { span:12 },
};
const formColLayout6 = {
    xxl: { span:6 },
};


class SearchForm extends Component{

    constructor(props){
        super(props);
        this.state={
            expand: false,
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
        console.log(this.props.form);
        this.props.form.resetFields();
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }
    componentDidMount(){

    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
            >
                <Row gutter={24}>
                    <Col span={12}>
                        <FormItem label='行政区划' labelCol={{span:2}}>
                            <Row type='flex'>
                                <FormItem>
                                    {getFieldDecorator('province',{rules:[{
                                            required:false,
                                        }],})(
                                        <Select  placeholder='请选择省' allowClear style={{ width: 120 }}>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                    )}

                                    <span className='icon-connectors'>—</span>
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('city',{rules:[{
                                            required:false,
                                        }],})(
                                        <Select placeholder='请选择市' allowClear style={{ width: 120 }}>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                    )}

                                    <span className='icon-connectors'>—</span>
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('county',{rules:[{
                                            required:false,
                                        }],})(
                                        <Select placeholder='请选择县' allowClear style={{ width: 120 }}>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                    )}

                                    <span className='icon-connectors'>—</span>
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('street',{rules:[{
                                            required:false,
                                        }],})(
                                        <Select
                                            showSearch
                                            allowClear
                                            style={{ width: 180 }}
                                            placeholder="请选择街道"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="tom">Tom</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Row>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label='详细地址' labelCol={{span:4}}>
                            {getFieldDecorator('detailedAddress',{rules:[{
                                    required:false,
                                }],})(
                                <Input style={{maxWidth:500}}   placeholder="请输入详细地址" />
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='门店名称' labelCol={{span:4}}>
                            {getFieldDecorator('storeName',{rules:[{
                                    required:false,
                                }],})(
                                <Input style={{width:200}}   placeholder="请输入门店名称" />
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8} >
                        <FormItem label='公司名称' labelCol={{span:4}}>
                            {getFieldDecorator('companyName',{rules:[{
                                    required:false,
                                }],})(
                                <Input style={{width:200}}   placeholder="请输入公司名称" />
                            )}

                        </FormItem>
                    </Col>
                    <Col {...formColLayout6}>
                        <FormItem label='负责人' labelCol={{span:4}}>
                            {getFieldDecorator('principal',{rules:[{
                                    required:false,
                                }],})(
                                <Input style={{width:200}}   placeholder="请输入负责人" />
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='管理员' labelCol={{span:4}}>
                            {getFieldDecorator('administrator',{rules:[{
                                    required:false,
                                }],})(
                                <Input style={{width:200}}   placeholder="请输入管理员" />
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='门店状态' labelCol={{span:4}}>
                            {getFieldDecorator('storesState',{rules:[{
                                    required:false,
                                }],})(
                                <Select  placeholder='请选择门店状态' allowClear style={{ width: 200 }} >
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="disabled" disabled>Disabled</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='分销级别' labelCol={{span:4}}>
                            {getFieldDecorator('distributionLevel',{rules:[{
                                required:false,
                                }],})(
                                <Select  placeholder='请选择分销级别' allowClear style={{ width: 200 }} >
                                    <Option value="1">一级分销</Option>
                                    <Option value="2">二级分销</Option>
                                    <Option value="3">三级分销</Option>
                                </Select>
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='门店类别' labelCol={{span:4}}>
                            {getFieldDecorator('storeCategory',{rules:[{
                                required:false,
                                }],})(
                                <Select  placeholder='请选择门店类别' allowClear style={{ width: 200 }} >
                                    <Option value="1">一级分销</Option>
                                    <Option value="2">二级分销</Option>
                                    <Option value="3">三级分销</Option>
                                </Select>
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='加盟方式' labelCol={{span:4}}>
                            {getFieldDecorator('wayAgency',{rules:[{
                                required:false,
                                }],})(
                                <Select  placeholder='请选择加盟方式' allowClear style={{ width: 200 }} >
                                    <Option value="1">5+5</Option>
                                    <Option value="2">10+10</Option>
                                    <Option value="3">20+20</Option>
                                </Select>
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='门店等级' labelCol={{span:4}}>
                            {getFieldDecorator('storeLevel',{rules:[{
                                required:false,
                                }],})(
                                <Select  placeholder='请选择门店等级' allowClear style={{ width: 200 }} >
                                    <Option value="1">A</Option>
                                    <Option value="2">B</Option>
                                    <Option value="3">SSS</Option>
                                </Select>
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='数据状态' labelCol={{span:4}}>
                            {getFieldDecorator('dataState',{rules:[{
                                required:false,
                                }],})(
                                <Select  placeholder='请选择数据状态' allowClear style={{ width: 200 }} >
                                    <Option value="1">有效</Option>
                                    <Option value="2">无效</Option>
                                </Select>
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='区域经理' labelCol={{span:4}}>
                            {getFieldDecorator('areaManager',{rules:[{
                                required:false,
                                }],})(
                                <Input style={{width:200}}   placeholder="请输入区域经理" />
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='招商对接人' labelCol={{span:5}}>
                            {getFieldDecorator('buttMan',{rules:[{
                                    required: false,
                                    message: 'Input something!',
                                }],})(
                                <Input style={{width:200}}   placeholder="请输入招商对接人" />
                            )}

                        </FormItem>
                    </Col>

                </Row>
                <Row className='row-bottom'>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button htmlType="submit">查询</Button>
                        <Button type="danger" style={{ marginLeft: 8 }} onClick={this.handleReset}>
                            清除
                        </Button>
                        <Button type="primary" style={{ marginLeft: 8 }}>
                            <NavLink exact to={{pathname:'/editAddShop'}}>新增</NavLink>
                        </Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}
const WrappedSearchForm = Form.create()(SearchForm);
export default WrappedSearchForm;