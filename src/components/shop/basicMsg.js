import React , {Component}  from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, DatePicker,Checkbox, Button} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

function onChange(value) {
  console.log(value);
}

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;


    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={24}>
          <Col span={8} style={{ textAlign: 'left'}}>
            <FormItem label="门店编号" style={{display: "flex"}}>
              {getFieldDecorator(`门店编号`, {
                rules: [{
                  required: true,message: '请输入门店名称!',
                  }]
                })(
                <Input placeholder="请输入门店编号" style={{ width: 300 }}/>  
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <Col span={8}>
              <FormItem label="门店名称" style={{display: "flex"}}>
                {getFieldDecorator(`门店名称`, {
                  rules: [{
                    required: true,message: '请输入门店名称!',
                  }],
                })(
                  <Input placeholder="请输入门店名称" style={{ width: 300 }}/>
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="公司名称" style={{display: "flex"}}>
                  {getFieldDecorator(`公司名称`, {
                    rules: [{
                      required: true,message: '请选择公司名称!',
                    }],
                  })(
                    <Select
                    showSearch
                    style={{ width: 300 }}
                    placeholder="请选择公司名称"
                    />
                  )}
              </FormItem>        
            </Col>
          </Col>
          <Col span={24}>
            <FormItem>
              <Col span={8}>社会信用代码：123456</Col>
              <Col span={8}>法人代表：pdd</Col>
              <Col span={8}>法人代表电话：110110110</Col>
            </FormItem>        
          </Col>
          <Col span={24}>
            <Col span={8}>
              <FormItem label="门店地址" style={{display: "flex"}}>
                  {getFieldDecorator(`门店地址`, {
                    rules: [{
                      required: true,message: '请选择公司名称!',
                    }],
                  })(
                    <Cascader options={options} onChange={onChange} placeholder="Please select" style={{ width: 300 }}/>
                  )}
              </FormItem>        
            </Col>
            <Col span={16}>
              <FormItem label="门店详细地址" style={{display: "flex"}}>
                  {getFieldDecorator(`门店地址`, {
                    rules: [{
                      required: true,message: '请输入门店详细地址!',
                    }],
                  })(
                    <Input placeholder="请输入门店详细地址" style={{ width: 300 }}/>  
                  )}
              </FormItem>        
            </Col>
          </Col>
          <Col span={8}>
            <FormItem label="门店老板" style={{display: "flex"}}>
                {getFieldDecorator(`门店老板`, {
                  rules: [{
                    required: true,message: '请选择门店老板!',
                  }],
                })(
                    <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择门店老板"
                    optionFilterProp="children"
                  />
                )}
            </FormItem>        
          </Col>
          <Col span={8}>
            <FormItem label="老板电话" style={{display: "flex"}}>
                <span>135989458888</span>
            </FormItem>        
          </Col>
          <Col span={8}>
            <FormItem label="老板身份证号码" style={{display: "flex"}}>
                <span>1423558887899999999999</span>
            </FormItem>        
          </Col>
          <Col span={8}>
            <FormItem label="门店主管" style={{display: "flex"}}>
                {getFieldDecorator(`门店主管`, {
                  rules: [{
                    required: true,message: '请选择门店主管!',
                  }],
                })(
                    <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择门店主管"
                    optionFilterProp="children"
                  />
                )}
            </FormItem>        
          </Col>
          <Col span={8}>
            <FormItem label="主管电话" style={{display: "flex"}}>
                <span>135989458888</span>
            </FormItem>        
          </Col>
          <Col span={8}>
            <FormItem label="主管身份证号码" style={{display: "flex"}}>
                <span>1423558887899999999999</span>
            </FormItem>        
          </Col>
          <Col span={24}>
            <Col span={8}>
              <FormItem label="门店类别" style={{display: "flex"}}>
                  {getFieldDecorator(`门店类别`, {
                    rules: [{
                      required: true,message: '请选择门店类别!',
                    }],
                  })(
                      <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="请选择门店类别"
                      optionFilterProp="children"
                    />
                  )}
              </FormItem>        
            </Col>
            <Col span={8}>
              <FormItem label="招商对接人" style={{display: "flex"}}>
                  {getFieldDecorator(`招商对接人`)(
                      <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="请选择招商对接人"
                      optionFilterProp="children"
                    />
                  )}
              </FormItem>        
            </Col>
          </Col>
          <Col span={8}>
            <FormItem label="加盟日期" style={{display: "flex"}}>
                {getFieldDecorator(`加盟日期`, {
                  rules: [{
                    required: true,message: '请选择加盟日期!',
                  }],
                })(
                  <DatePicker onChange={onChange} />
                )}
            </FormItem>        
          </Col>
          <Col span={8}>
            <FormItem label="加盟方式" style={{display: "flex"}}>
                {getFieldDecorator(`加盟方式`)(
                    <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择加盟方式"
                    optionFilterProp="children"
                  />
                )}
            </FormItem>        
          </Col>
          <Col span={8}>
            <FormItem label="方式备注" style={{display: "flex"}}>
                {getFieldDecorator(`方式备注`)(
                  <Input placeholder="请输入方式备注" style={{ width: 300 }}/>  
                )}
            </FormItem>        
          </Col>
          <Col span={24}>
            <Col span={8}>
              <FormItem label="加盟区域" style={{display: "flex"}}>
                  {getFieldDecorator(`加盟区域`, {
                    rules: [{
                      required: true,message: '请选择加盟区域!',
                    }],
                  })(
                    <Cascader options={options} onChange={onChange} placeholder="Please select" style={{ width: 300 }}/>
                  )}
              </FormItem>        
            </Col>
            <Col span={8}>
              <FormItem label="区域经理" style={{display: "flex"}}>
                  {getFieldDecorator(`区域经理`)(
                      <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="请选择区域经理"
                      optionFilterProp="children"
                    />
                  )}
              </FormItem>        
            </Col>        
          </Col>
          <Col span={24}>
            <Col span={8}>
              <FormItem label="分销级别" style={{display: "flex"}}>
                  {getFieldDecorator(`分销级别`, {
                    rules: [{
                      required: true,message: '请选择分销级别!',
                    }],
                  })(
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="请选择分销级别"
                      optionFilterProp="children"
                    />
                  )}
              </FormItem>        
            </Col>
            <Col span={8}>
              <FormItem label="门店等级" style={{display: "flex"}}>
                  {getFieldDecorator(`门店等级`, {
                    rules: [{
                      required: true,message: '请选择门店等级!',
                    }],
                  })(
                      <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="请选择门店等级"
                        optionFilterProp="children"
                      />
                  )}
              </FormItem>        
            </Col>            
          </Col>
          <Col span={8}>
            <FormItem label="开业日期" style={{display: "flex"}}>
                {getFieldDecorator(`开业日期`, {
                  rules: [{
                    required: true,message: '请选择开业日期!',
                  }],
                })(
                  <DatePicker onChange={onChange} />
                )}
            </FormItem>        
          </Col>
          <Col span={8}>
            <FormItem label="门店状态" style={{display: "flex"}}>
                {getFieldDecorator(`门店状态`, {
                  rules: [{
                    required: true,message: '请选择门店状态!',
                  }],
                })(
                    <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择门店状态"
                    optionFilterProp="children"
                  />
                )}
            </FormItem>        
          </Col>
          <Col span={8}>
            <FormItem label="是否新店" style={{display: "flex"}}>
                {getFieldDecorator(`是否新店`, {
                  rules: [{
                    required: true,message: '请选择是否新店!',
                  }],
                })(
                  <Input placeholder="请选择是否新店" style={{ width: 300 }}/>  
                )}
            </FormItem>        
          </Col>
          <Col span={24}  style={{display: "flex",alignItem:"center"}}>
            <FormItem>
              <span>门店定位：</span>    
            </FormItem>
            <FormItem label="经度" style={{display: "flex",width:100}}>
              {getFieldDecorator(`经度`)(
                <Input style={{width:50}}/>   
              )}
            </FormItem>
            <FormItem label="纬度" style={{display: "flex",width:100}}>
              {getFieldDecorator(`纬度`)(
                <Input style={{width:50}}/>   
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem style={{textAlign:"center"}}>
          <Button type="primary">取消</Button>
          <Button type="primary" htmlType="submit" style={{marginLeft:'30px'}}>确定</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;