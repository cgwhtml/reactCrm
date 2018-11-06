//门店管理搜索框
import React , {Component} from 'react';
import {NavLink} from 'react-router-dom';
import { Form, Row, Col, Input, Button, Select,Icon} from 'antd';
import {HttpRequest} from '../../utils/js/common';
import domain from '../../domain/domain';

const FormItem = Form.Item;
const Option = Select.Option;


class SearchForm extends Component{

    constructor(props){
        super(props);
        this.state={
            expand: false,
            provinceList:[],
            cityList:[],
            countyList:[],
            shopTypeList:[],
            joinTypeList:[],
            levelList:[],
            shoplevelList:[],
            shopStatusList:[],
            companyList:[],
            manageList:[],
            pickList:[],
        };

    }
    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
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
    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
          return;
        };
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
        if(e){
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
    }
    // 公司名称模糊匹配
    searchCompany(e){
        HttpRequest.getRequest(
        {
            url:domain.companyList,
            params:{
                keyWord:e
            } 
        },
        res=>{
            this.setState({
                companyList:res
            })
        }
        )
    }
    // 查询区域经理
    searchManage(e){
        HttpRequest.getRequest(
        {
            url:domain.shopMangerList,
            params:{
            keyWord:e,
            roleType:1
            } 
        },
        res=>{
            this.setState({
            manageList:res
            })
        })
    }
    // 查询对接人
    searchPickPerson(e){
        HttpRequest.getRequest(
        {
            url:domain.shopMangerList,
            params:{
            keyWord:e,
            roleType:2
            } 
        },
        res=>{
            this.setState({
                pickList:res
            })
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const{provinceList,cityList,countyList,shopTypeList,joinTypeList,levelList,shoplevelList,shopStatusList,companyList,manageList,pickList}=this.state;
        const   formItemLayout={labelCol: { span:4}};
        return(
            <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
            >
                <Row gutter={24}>
                    <Col span={12}>      
                        <Row type='flex'>
                            <FormItem label='行政区划'></FormItem>
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
                            <FormItem >
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
                    </Col>
                    <Col span={12}>
                        <FormItem label='详细地址' {...formItemLayout}>
                            {getFieldDecorator('address',{rules:[{
                                    required:false,
                                }],})(
                                <Input style={{maxWidth:300}}   placeholder="请输入详细地址" />
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='门店名称' {...formItemLayout}>
                            {getFieldDecorator('shopName',{rules:[{
                                    required:false,
                                }],})(
                                <Input style={{width:200}}   placeholder="请输入门店名称" />
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8} >
                        <FormItem label='公司名称' {...formItemLayout}>
                            {getFieldDecorator('organizationName',{rules:[{
                                    required:false,
                                }],})(
                                    <Select
                                    showSearch
                                    placeholder="请输入公司名称"
                                    defaultActiveFirstOption={false}
                                    showArrow={false}
                                    notFoundContent="暂无相关公司信息"
                                    allowClear={true}
                                    filterOption={false}
                                    onSearch={this.searchCompany.bind(this)}
                                    style={{ width: 300 }}
                                  >
                                    {companyList.length > 0 &&
                                        companyList.map((item, i) => {
                                            return (
                                                <Option key={i} value={item.orgName}>
                                                    {item.orgName}
                                                </Option>
                                            );
                                        })
                                    }
                                  </Select>
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8} >
                        <FormItem label='老板' {...formItemLayout}>
                            {getFieldDecorator('principal',{rules:[{
                                    required:false,
                                }],})(
                                <Input style={{width:200}}   placeholder="请输入老板" />
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='管理员' {...formItemLayout}>
                            {getFieldDecorator('manager',{rules:[{
                                    required:false,
                                }],})(
                                <Input style={{width:200}}   placeholder="请输入管理员" />
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='门店状态' {...formItemLayout}>
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
                        <FormItem label='分销级别' {...formItemLayout}>
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
                        <FormItem label='门店类别' {...formItemLayout} style={{ display: this.state.expand? 'block' : 'none' }}>
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
                    <Col span={8} style={{ display: this.state.expand? 'block' : 'none' }}>
                        <FormItem label='加盟方式' {...formItemLayout}>
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
                    <Col span={8} style={{ display: this.state.expand? 'block' : 'none' }}>
                        <FormItem label='门店等级' {...formItemLayout}>
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
                    <Col span={8} style={{ display: this.state.expand? 'block' : 'none' }}>
                        <FormItem label='数据状态' {...formItemLayout}>
                            {getFieldDecorator('isDeleted',{rules:[{
                                required:false,
                                }],})(
                                <Select  placeholder='请选择数据状态' allowClear style={{ width: 200 }} >
                                    <Option value="0">未删除</Option>
                                    <Option value="1">已删除</Option>
                                </Select>
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8} style={{ display: this.state.expand? 'block' : 'none' }}>
                        <FormItem label='区域经理' {...formItemLayout}>
                            {getFieldDecorator('areaManager',{rules:[{
                                required:false,
                                }],})(
                                <Select
                                showSearch
                                placeholder="请输入区域经理"
                                defaultActiveFirstOption={false}
                                showArrow={false}
                                notFoundContent="暂无相关区域经理名称"
                                allowClear={true}
                                filterOption={false}
                                onSearch={this.searchManage.bind(this)}
                                style={{ width: 200 }}
                                >
                                {manageList.length > 0 &&
                                    manageList.map((item, i) => {
                                        return (
                                            <Option key={i} value={item.fullname}>
                                                {item.fullname}
                                            </Option>
                                        );
                                    })
                                }
                                </Select>
                            )}

                        </FormItem>
                    </Col>
                    <Col span={8} style={{ display: this.state.expand? 'block' : 'none' }}>
                        <FormItem label='招商对接人' labelCol={{span:4}}>
                            {getFieldDecorator('dbManager',{rules:[{
                                    required: false,
                                    message: 'Input something!',
                                }],})(
                                    <Select
                                    showSearch
                                    placeholder="请输入招商对接人"
                                    defaultActiveFirstOption={false}
                                    showArrow={false}
                                    notFoundContent="暂无相关招商对接人名称"
                                    allowClear={true}
                                    filterOption={false}
                                    onSearch={this.searchPickPerson.bind(this)}
                                    style={{ width: 200 }}
                                  >
                                    {pickList.length > 0 &&
                                        pickList.map((item, i) => {
                                            return (
                                                <Option key={i} value={item.fullname}>
                                                    {item.fullname}
                                                </Option>
                                            );
                                        })
                                    }
                                  </Select>
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
                            <NavLink  to={{pathname:'/shopEdit'}}>新增</NavLink>
                        </Button>
                        <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                            更多条件 <Icon type={this.state.expand ? 'up' : 'down'} />
                        </a>
                    </Col>
                </Row>
            </Form>
        )
    }
}
const WrappedSearchForm = Form.create()(SearchForm);
export default WrappedSearchForm;