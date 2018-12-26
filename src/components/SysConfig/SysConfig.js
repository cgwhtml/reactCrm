import React,{Component} from 'react';
import { Collapse,Form,Row,Col,Input,Alert,DatePicker,TimePicker} from 'antd';
import BreadcrumbItems from '../layouts/BreadcrumbItems';
import PropTypes from 'prop-types';
import WrappedSearchForm from './SearchForm'
import {HttpRequest} from '../../utils/js/common';
import domain from '../../domain/domain';

const Panel = Collapse.Panel;
const FormItem = Form.Item;

//系统配置
const itemText = {
    item1: '主页',
    item2: '系统管理',
    item3: '系统配置'
};

class sysConfig extends Component{
    static propTypes = {
        itemText: PropTypes.object
    }
    constructor(props){
        super(props);
        this.state={
        };
    }
    // 搜索
       handleFilter(values) {
        this.setState({
            searchValues:values
        },()=>{
            this.initData(this.state.pageCur,this.state.pageSize,this.state.searchValues)
        })  
    }
    getFields() {
        const { getFieldDecorator } = this.props.form;
        const children = [];
        const imgNameList=[{name:'新车采购'},{name:'新车采购2'}]
        imgNameList.map((item,i)=>{
        children.push(
            <Panel header="新车采购" key={i}>
                <Row span={24}>
                    <Col span={8}>
                        <FormItem label="名称" labelCol={{span:5}}>
                            {getFieldDecorator('id', {
                                rules: [{
                                required: true,
                                }],
                            })(
                                <Input placeholder="请输入名称" style={{ width: 300 }}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <Alert message="提示：订单默认名称" type="info" />
                    </Col>
                </Row>
                <Row span={24}>
                    <Col span={8}>
                        <FormItem label="定金比例" labelCol={{span:5}}>
                            {getFieldDecorator('id', {
                                rules: [{
                                required: true,
                                }],
                            })(
                                <Input placeholder="请输入定金比例" style={{ width: 300 }}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <Alert message="提示：订单定金比例，x% 的x部分，不含小数点" type="info" />
                    </Col>
                </Row>
                <Row span={24}>
                    <Col span={8}>
                        <FormItem label="税率" labelCol={{span:5}}>
                            {getFieldDecorator('id', {
                                rules: [{
                                required: true,
                                }],
                            })(
                                <Input placeholder="请输入税率" style={{ width: 300 }}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <Alert message="提示：订单纳税比例，x.yy% 的x.yy部分，2位小数" type="info" />
                    </Col>
                </Row>
                <Row span={24}>
                    <Col span={8}>
                        <FormItem label="月初日期" labelCol={{span:5}}>
                            {getFieldDecorator('id', {
                                rules: [{
                                required: true,
                                }],
                            })(
                                <DatePicker style={{ width: 300 }}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <Alert message="提示：订单结算月第一天日期" type="info" />
                    </Col>
                </Row>
                <Row span={24}>
                    <Col span={8}>
                        <FormItem label="开始时间" labelCol={{span:5}}>
                            {getFieldDecorator('id', {
                                rules: [{
                                required: true,
                                }],
                            })(
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="Select Time" style={{ width: 300 }}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <Alert message="提示：订单定金比例，x% 的x部分，不含小数点" type="info" />
                    </Col>
                </Row>
                <Row span={24}>
                    <Col span={8}>
                        <FormItem label="执行时刻" labelCol={{span:5}}>
                            {getFieldDecorator('id', {
                                rules: [{
                                required: true,
                                }],
                            })(
                                <TimePicker style={{ width: 300 }}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <Alert message="提示：订单定金比例，x% 的x部分，不含小数点" type="info" />
                    </Col>
                </Row>            
            </Panel>
        );
        return children;
        })
        return children;
      }
    render(){
        return(
            <div>
                <BreadcrumbItems itemText={itemText}></BreadcrumbItems>
                <div style={{ padding: 24, background: '#fff', minHeight: 380 }}>
                    <WrappedSearchForm filterCallback={this.handleFilter.bind(this)} />
                    <Form onSubmit={this.handleSubmit2}>
                        <Collapse bordered={false} defaultActiveKey={['0']}>{this.getFields()}</Collapse>
                    </Form>  
                </div>
            </div>        
        )
    }
} 
const SysConfig = Form.create()(sysConfig);
export default SysConfig;