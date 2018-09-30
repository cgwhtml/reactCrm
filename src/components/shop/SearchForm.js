//门店管理搜索框
import React , {Component} from 'react';
import {NavLink} from 'react-router-dom';
import { Form, Row, Col, Input, Button, Select } from 'antd';
import {HttpRequest} from '../../utils/js/common';
import domain from '../../domain/domain';

const FormItem = Form.Item;
const Option = Select.Option;


class SearchForm extends Component{

    constructor(props){
        super(props);
        this.state={
            provinceList:[],
            cityList:[],
            countyList:[],
            shopTypeList:[],
            joinTypeList:[],
            levelList:[],
            shoplevelList:[],
            shopStatusList:[]
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
    initSelect=(type)=>{
        HttpRequest.getRequest(
            {
                url:domain.shopTypeList,
                params:{
                    typeId:type
                } 
            },
            res=>{
                console.log(type)
                if(type=="shop_type"){
                    this.setState({
                        shopTypeList:res
                    })        
                }else if(type=="distribution_level"){
                    this.setState({
                        levelList:res
                    })
                }else if(type=="shop_join_type"){
                    this.setState({
                        joinTypeList:res
                    })
                }else if(type=="shop_level"){
                    this.setState({
                        shoplevelList:res
                    })
                }else if(type=="shop_status"){
                    this.setState({
                      shopStatusList:res
                    })
                }
            }
        )    
    }
    componentDidMount(){
        HttpRequest.getRequest(
            {
                url:domain.areaList,
                params:{
                    regionId:'000000000000'
                } 
            },
            res=>{
                this.setState({
                    provinceList:res
                })
            }
        )
        // 门店类型
        this.initSelect('shop_type')
        // 分销级别
        this.initSelect('distribution_level')
        // 门店加盟方式
        this.initSelect('shop_join_type')
        // 门店等级
        this.initSelect('shop_level')
        // 门店状态
        this.initSelect('shop_status')
}
    changeProvince(e){
        HttpRequest.getRequest(
            {
                url:domain.areaList,
                params:{
                    regionId:e
                } 
            },
            res=>{
                this.setState({
                    cityList:res
                })
            }
        )
    }
    changeCity(e){
        HttpRequest.getRequest(
            {
                url:domain.areaList,
                params:{
                    regionId:e
                } 
            },
            res=>{
                this.setState({
                    countyList:res
                })
            }
        )
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const provinceList =this.state.provinceList;
        const cityList =this.state.cityList;
        const countyList=this.state.countyList;
        const shopTypeList=this.state.shopTypeList;
        const joinTypeList=this.state.joinTypeList;
        const levelList=this.state.levelList;
        const shoplevelList=this.state.shoplevelList;
        const shopStatusList=this.state.shopStatusList;

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
                                    {getFieldDecorator('provinceCode',{rules:[{
                                            required:false,
                                        }],})(
                                        <Select  placeholder='请选择省'  style={{ width: 120 }}  onChange={this.changeProvince.bind(this)}>
                                            {provinceList.length > 0 &&
                                                provinceList.map((item, i) => {
                                                    return (
                                                        <Select.Option key={i} value={item.id}>
                                                            {item.name}
                                                        </Select.Option>
                                                    );
                                                })
                                            }
                                        </Select>
                                    )}

                                    <span className='icon-connectors'>—</span>
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('cityCode',{rules:[{
                                            required:false,
                                        }],})(
                                        <Select placeholder='请选择市' allowClear style={{ width: 120 }} onChange={this.changeCity.bind(this)}>
                                            {cityList.length>0 && 
                                                cityList.map((item,i) => {
                                                    return (
                                                        <Select.Option key={i} value={item.id}>
                                                            {item.name}
                                                        </Select.Option>    
                                                    )        
                                                })
                                            }        
                                        </Select>
                                    )}

                                    <span className='icon-connectors'>—</span>
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('districtCode',{rules:[{
                                            required:false,
                                        }],})(
                                        <Select placeholder='请选择县' allowClear style={{ width: 120 }}>
                                             {countyList.length>0 && 
                                                countyList.map((item,i) => {
                                                    return (
                                                        <Select.Option key={i} value={item.id}>
                                                            {item.name}
                                                        </Select.Option>    
                                                    )        
                                                })
                                            }    
                                        </Select>
                                    )}
                                </FormItem>
                            </Row>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label='详细地址' labelCol={{span:4}}>
                            {getFieldDecorator('address',{rules:[{
                                    required:false,
                                }],})(
                                <Input style={{maxWidth:500}}   placeholder="请输入详细地址" />
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='门店名称' labelCol={{span:4}}>
                            {getFieldDecorator('shopName',{rules:[{
                                    required:false,
                                }],})(
                                <Input style={{width:200}}   placeholder="请输入门店名称" />
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8} >
                        <FormItem label='公司名称' labelCol={{span:4}}>
                            {getFieldDecorator('organizationName',{rules:[{
                                    required:false,
                                }],})(
                                <Input style={{width:200}}   placeholder="请输入公司名称" />
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8} >
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
                            {getFieldDecorator('manager',{rules:[{
                                    required:false,
                                }],})(
                                <Input style={{width:200}}   placeholder="请输入管理员" />
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='门店状态' labelCol={{span:4}}>
                            {getFieldDecorator('status',{rules:[{
                                    required:false,
                                }],})(
                                <Select  placeholder='请选择门店状态' allowClear style={{ width: 200 }} >
                                    {shopStatusList.length>0 && 
                                        shopStatusList.map((item,i) => {
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
                    <Col span={8}>
                        <FormItem label='分销级别' labelCol={{span:4}}>
                            {getFieldDecorator('distributionLevel',{rules:[{
                                required:false,
                                }],})(
                                <Select  placeholder='请选择分销级别' allowClear style={{ width: 200 }} >
                                    {levelList.length>0 && 
                                    levelList.map((item,i) => {
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
                    <Col span={8}>
                        <FormItem label='门店类别' labelCol={{span:4}}>
                            {getFieldDecorator('type',{rules:[{
                                required:false,
                                }],})(
                                <Select  placeholder='请选择门店类别' allowClear style={{ width: 200 }} >
                                    {shopTypeList.length>0 && 
                                        shopTypeList.map((item,i) => {
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
                    <Col span={8}>
                        <FormItem label='加盟方式' labelCol={{span:4}}>
                            {getFieldDecorator('joinType',{rules:[{
                                required:false,
                                }],})(
                                <Select  placeholder='请选择加盟方式' allowClear style={{ width: 200 }} >
                                    {joinTypeList.length>0 && 
                                        joinTypeList.map((item,i) => {
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
                    <Col span={8}>
                        <FormItem label='门店等级' labelCol={{span:4}}>
                            {getFieldDecorator('level',{rules:[{
                                required:false,
                                }],})(
                                <Select  placeholder='请选择门店等级' allowClear style={{ width: 200 }} >
                                    {shoplevelList.length>0 && 
                                        shoplevelList.map((item,i) => {
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
                    <Col span={8}>
                        <FormItem label='数据状态' labelCol={{span:4}}>
                            {getFieldDecorator('dataState',{rules:[{
                                required:false,
                                }],})(
                                <Select  placeholder='请选择数据状态' allowClear style={{ width: 200 }} >
                                    <Option value="0">未删除</Option>
                                    <Option value="1">已删除</Option>
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
                            {getFieldDecorator('dbManager',{rules:[{
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