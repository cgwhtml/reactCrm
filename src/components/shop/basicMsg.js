import React , {Component}  from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, DatePicker,Checkbox, Button} from 'antd';
import moment from 'moment'
import {HttpRequest} from '../../utils/js/common';
import domain from '../../domain/domain';

const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends React.Component {
  constructor(props){
    super(props);
    this.state={
        isRequired:false,
        editRequired:false,
        provinceList:[],
        cityList:[],
        countyList:[],
        shopTypeList:[],
        joinTypeList:[],
        levelList:[],
        shoplevelList:[],
        isNewShopList:[],
        shopStatusList:[],
        companyList:[],
        orgObj:{},
        manageList:[],
        pickList:[],
        editMsg:{},
        joinCityList:[],
        joinDistrictList:[]
    };

  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      
    });
  }
  getItemsValue= ()=>{    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
    const values= this.props.form.getFieldsValue();       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
    return values;
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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
          }else if(type=="is_new_shop"){
            this.setState({
              isNewShopList:res
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
  //省查询
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
  HttpRequest.getRequest(
    {
        url:domain.shopDetail,
        params:{
          shopId:468
        } 
    },
    res=>{
      if(res){
        res.joinDistrictList=[];
        res.joinDistrictRegion.map((item)=>{
          res.joinDistrictList.push(item.regionId)
        })
        if(res.provinceCode){
          this.changeProvince(res.provinceCode)
          this.changeCity(res.cityCode)
          this.changeProvince2(res.joinProvinceRegion?res.joinProvinceRegion.regionId:res.provinceCode,1)
          this.changeCity2(res.joinProvinceRegion?res.joinCityRegion.regionId:res.cityCode,1)
        }
        this.setState({
          editMsg:res?res:{}
        })
      }
    }
  )
  // 门店类型
  this.initSelect('shop_type');
  // 分销级别
  this.initSelect('distribution_level');
  // 门店加盟方式
  this.initSelect('shop_join_type');
  // 门店等级
  this.initSelect('shop_level');
  // 是否是新店
  this.initSelect('is_new_shop');
  // 门店状态
  this.initSelect('shop_status');
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
                cityList:res,
            })
          }
      )
  }
  changeCity(e,join){
      HttpRequest.getRequest(
          {
              url:domain.areaList,
              params:{
                  regionId:e
              } 
          },
          res=>{
            this.setState({
              countyList:res,
            })
          }
      )
  }
  changeProvince2(e){
    HttpRequest.getRequest(
        {
            url:domain.areaList,
            params:{
                regionId:e
            } 
        },
        res=>{
          this.setState({
            joinCityList:res
          })  
        }
    )
}
changeCity2(e,join){
    HttpRequest.getRequest(
        {
            url:domain.areaList,
            params:{
                regionId:e
            } 
        },
        res=>{
          this.setState({
            joinDistrictList:res
          }) 
        }
    )
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
  onChangeCompany(e){
    console.log(e)
    this.state.companyList.map((item)=>{
      if(item.id==e){
        this.setState({
          orgObj:item
        })
      }
    })    
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
  handleShoptypeChange(e){
    if(e==2){
      this.setState({
        isRequired:true
      }, () => {
        // this.props.form.validateFields(['bdManagerName'], { force: true });
      });
    }else{
      this.setState({
        isRequired:false
      }, () => {
        // this.props.form.validateFields(['bdManagerName'], { force: false });
      });
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const provinceList =this.state.provinceList;
    const cityList =this.state.cityList;
    const countyList=this.state.countyList;
    const shopTypeList=this.state.shopTypeList;
    const joinTypeList=this.state.joinTypeList;
    const levelList=this.state.levelList;
    const shoplevelList=this.state.shoplevelList;
    const isNewShopList=this.state.isNewShopList;
    const shopStatusList=this.state.shopStatusList;
    const companyList=this.state.companyList;
    const manageList=this.state.manageList;
    const pickList=this.state.pickList;
    const editMsg=this.state.editMsg
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={24}>
          <Col span={8} style={{ textAlign: 'left'}}>
            <FormItem label="门店编号" style={{display: "flex"}}>
              {getFieldDecorator(`id`,{
                initialValue:editMsg.id,
                rules: [{
                  required: true,message: '请输入门店名称!',
                  }]
                })(
                <Input placeholder="请输入门店编号" style={{ width: 300 }}/>  
              )}
            </FormItem>
          </Col>
          <Col span={8}>
              <FormItem label="门店名称" style={{display: "flex"}}>
                {getFieldDecorator(`name`, {
                  initialValue:editMsg.name,
                  rules: [{
                    required: true,message: '请输入门店名称!',
                  }],
                })(
                  <Input placeholder="请输入门店名称" style={{ width: 300 }}/>
                )}
              </FormItem>
            </Col>
          <Col span={24}>
            <Col span={8}>
              <FormItem label="公司名称" style={{display: "flex"}}>
                  {getFieldDecorator(`organizationId`, {
                    initialValue:editMsg.orgId,
                    rules: [{
                      required: true,message: '请选择公司名称!',
                    }],
                  })(
                    <Select
                    showSearch
                    placeholder="请输入公司名称"
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    notFoundContent="暂无相关公司信息"
                    allowClear={true}
                    filterOption={false}
                    onChange={this.onChangeCompany.bind(this)}
                    onSearch={this.searchCompany.bind(this)}
                    style={{ width: 300 }}
                  >
                    {companyList.length > 0 &&
                        companyList.map((item, i) => {
                            return (
                                <Option key={i} value={item.id}>
                                    {item.orgName}
                                </Option>
                            );
                        })
                    }
                  </Select>
                  )}
              </FormItem>        
            </Col>
          </Col>
          <Col span={24}>
            <FormItem>
              <Col span={8}>社会信用代码：{this.state.orgObj.orgCode}</Col>
              <Col span={8}>法人代表：{this.state.orgObj.orgPrincipalName}</Col>
              <Col span={8}>法人代表电话：{this.state.orgObj.orgPrincipalPhone}</Col>
            </FormItem>        
          </Col>
          <Col span={12}>
              <Row type='flex'>
                <FormItem label="门店地址"></FormItem>
                
                <FormItem>
                    {getFieldDecorator('provinceCode',{
                      initialValue:editMsg.provinceCode,
                      rules:[{
                          required:true,
                          message: '请选择省!'
                        }],})(
                        <Select  placeholder='请选择省'  style={{ width: 120 }}  onChange={this.changeProvince.bind(this)}>
                            {provinceList.length > 0 &&
                                provinceList.map((item, i) => {
                                    return (
                                        <Option key={i} value={item.id}>
                                            {item.name}
                                        </Option>
                                    );
                                })
                            }
                        </Select>
                    )}
                    <span className='icon-connectors'>—</span>
                  </FormItem>

                  <FormItem>
                      {getFieldDecorator('cityCode',{
                        initialValue:editMsg.cityCode,
                        rules:[{
                            required:true,
                            message: '请选择市!'
                          }],})(
                          <Select placeholder='请选择市' allowClear style={{ width: 120 }} onChange={this.changeCity.bind(this)}>
                              {cityList.length>0 && 
                                  cityList.map((item,i) => {
                                      return (
                                          <Option key={i} value={item.id}>
                                              {item.name}
                                          </Option>    
                                      )        
                                  })
                              }        
                          </Select>
                      )}

                      <span className='icon-connectors'>—</span>
                  </FormItem>
                  
                  <FormItem>
                      {getFieldDecorator('districtCode',{
                          initialValue:editMsg.districtCode,
                          rules:[{
                            required:true,
                            message: '请选择县!'
                          }],})(
                          <Select placeholder='请选择县' allowClear style={{ width: 120 }}>
                                {countyList.length>0 && 
                                  countyList.map((item,i) => {
                                      return (
                                          <Option key={i} value={item.id}>
                                              {item.name}
                                          </Option>    
                                      )        
                                  })
                              }    
                          </Select>
                      )}
                  </FormItem>
              </Row>
          </Col>
          <Col span={12}>
            <FormItem label="门店详细地址" style={{display: "flex"}}>
                {getFieldDecorator(`address`, {
                  initialValue:editMsg.address,
                  rules: [{
                    required: true,message: '请输入门店详细地址!',
                  }],
                })(
                  <Input placeholder="请输入门店详细地址" style={{ width: 300 }}/>  
                )}
            </FormItem>        
          </Col>
          <Col span={8}>
            <FormItem label="门店老板" style={{display: "flex"}}>
                {getFieldDecorator(`bossId`, {
                  initialValue:editMsg.bossName,
                  rules: [{
                    required: this.state.editRequired,message: '请选择门店老板!',
                  }],
                })(
                    <Select
                    showSearch
                    allowClear={true}
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
                {getFieldDecorator(`managerId`, {
                  initialValue:editMsg.managerId,
                  rules: [{
                    required: this.state.editRequired,message: '请选择门店主管!',
                  }],
                })(
                    <Select
                    showSearch
                    allowClear={true}
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
                  {getFieldDecorator(`type`, {
                    initialValue:editMsg.type?editMsg.type.code:'',
                    rules: [{
                      required: true,message: '请选择门店类别!',
                    }],
                  })(
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="请选择门店类别"
                      optionFilterProp="children"
                      onChange={this.handleShoptypeChange.bind(this)}
                    >
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
              <FormItem label="招商对接人" style={{display: "flex"}}>
                  {getFieldDecorator(`bdManagerName`, {
                        initialValue:editMsg.bdManagerName,
                        rules: [{
                          required: this.state.isRequired,
                          message: '请选择招商对接人',
                        }],
                      })(
                        <Select
                        showSearch
                        placeholder="请输入招商对接人"
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        notFoundContent="暂无相关招商对接人名称"
                        allowClear={true}
                        filterOption={false}
                        onSearch={this.searchPickPerson.bind(this)}
                        style={{ width: 300 }}
                      >
                        {pickList.length > 0 &&
                            pickList.map((item, i) => {
                                return (
                                    <Option key={i} value={item.id}>
                                        {item.fullname}
                                    </Option>
                                );
                            })
                        }
                      </Select>
                  )}
              </FormItem>        
            </Col>
          </Col>
          <Col span={8}>
            <FormItem label="加盟日期" style={{display: "flex"}}>
                {getFieldDecorator(`joinDate`, {
                  initialValue:editMsg.joinDate?moment(editMsg.joinDate):editMsg.joinDate,
                  rules: [{
                    required: true,message: '请选择加盟日期!',
                  }],
                })(
                  <DatePicker/>
                )}
            </FormItem>        
          </Col>
          <Col span={8}>
            <FormItem label="加盟方式" style={{display: "flex"}}>
                {getFieldDecorator(`joinType`, {
                  initialValue:editMsg.joinType?editMsg.joinType.code:'',
                  rules: [{
                    required: true,message: '请选择加盟方式!',
                  }],
                })(
                    <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择加盟方式"
                    optionFilterProp="children"
                  >
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
            <FormItem label="方式备注" style={{display: "flex"}}>
                {getFieldDecorator(`joinTypeMemo`,{
                  initialValue:editMsg.joinTypeMemo,
                })(
                  <Input placeholder="请输入方式备注" style={{ width: 300 }}/>  
                )}
            </FormItem>        
          </Col>
          <Col span={12}>
            <FormItem label='加盟区域' labelCol={{span:2}}>
                <Row type='flex'>
                    <FormItem>
                        {getFieldDecorator('joinProvinceRegion',{
                          initialValue:editMsg.joinProvinceRegion?editMsg.joinProvinceRegion.regionId:'',
                          rules:[{
                              required:false,
                          }],})(
                          <Select  placeholder='请选择省'  style={{ width: 120 }}  onChange={this.changeProvince2.bind(this)}>
                              {provinceList.length > 0 &&
                                  provinceList.map((item, i) => {
                                      return (
                                          <Option key={i} value={item.id}>
                                              {item.name}
                                          </Option>
                                      );
                                  })
                              }
                          </Select>
                        )}

                        <span className='icon-connectors'>—</span>
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('joinCityRegion',{
                            initialValue:editMsg.joinCityRegion?editMsg.joinCityRegion.regionId:'',
                            rules:[{
                                required:false,
                            }],})(
                            <Select placeholder='请选择市' allowClear style={{ width: 120 }} onChange={this.changeCity2.bind(this)}>
                                {this.state.joinCityList.length>0 && 
                                    this.state.joinCityList.map((item,i) => {
                                        return (
                                            <Option key={i} value={item.id}>
                                                {item.name}
                                            </Option>    
                                        )        
                                    })
                                }        
                            </Select>
                        )}

                        <span className='icon-connectors'>—</span>
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('joinRegions',{
                            initialValue:editMsg.joinDistrictList,
                            rules:[{
                                required:false,
                            }],})(
                              <Select
                              mode="multiple"
                              style={{ width: 300}}
                              placeholder='请选择县'                        
                            >
                                {this.state.joinDistrictList.length>0 && 
                                    this.state.joinDistrictList.map((item,i) => {
                                        return (
                                            <Option key={i} value={item.id}>
                                                {item.name}
                                            </Option>    
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
            <FormItem label="区域经理" style={{display: "flex"}}>
                {getFieldDecorator(`areaManagerId`,
                  {initialValue:editMsg.areaManagerId}
                )(
                  <Select
                    showSearch
                    placeholder="请输入区域经理"
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    notFoundContent="暂无相关区域经理名称"
                    allowClear={true}
                    filterOption={false}
                    onSearch={this.searchManage.bind(this)}
                    style={{ width: 300 }}
                  >
                    {manageList.length > 0 &&
                        manageList.map((item, i) => {
                            return (
                                <Option key={i} value={item.id}>
                                    {item.fullname}
                                </Option>
                            );
                        })
                    }
                  </Select>
                )}
            </FormItem>        
          </Col>        
          <Col span={24}>
            <Col span={8}>
              <FormItem label="分销级别" style={{display: "flex"}}>
                  {getFieldDecorator(`distributionLevel`, {
                    initialValue:editMsg.distributionLevel?editMsg.distributionLevel.code:'',
                    rules: [{
                      required: true,message: '请选择分销级别!',
                    }],
                  })(
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="请选择分销级别"
                      optionFilterProp="children"
                    >
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
              <FormItem label="门店等级" style={{display: "flex"}}>
                  {getFieldDecorator(`level`, {
                    initialValue:editMsg.level,
                    rules: [{
                      required: true,message: '请选择门店等级!',
                    }],
                  })(
                      <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="请选择门店等级"
                        optionFilterProp="children"
                      >
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
          </Col>
          <Col span={8}>
            <FormItem label="开业日期" style={{display: "flex"}}>
                {getFieldDecorator(`openDate`, {
                  initialValue:editMsg.openDate?moment(editMsg.openDate):editMsg.openDate,
                  rules: [{
                    required: true,message: '请选择开业日期!',
                  }],
                })(
                  <DatePicker/>
                )}
            </FormItem>        
          </Col>
          <Col span={8}>
            <FormItem label="门店状态" style={{display: "flex"}}>
                {getFieldDecorator(`status`, {
                  initialValue:editMsg.status?editMsg.status.code:'',
                  rules: [{
                    required: true,message: '请选择门店状态!',
                  }],
                })(
                    <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择门店状态"
                    optionFilterProp="children"
                  >
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
            <FormItem label="是否新店" style={{display: "flex"}}>
                {getFieldDecorator(`isNewShop`, {
                  initialValue:editMsg.isNewShop?editMsg.isNewShop.isNewShop:'',
                  rules: [{
                    required: true,message: '请选择是否新店!',
                  }],
                })(
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择是否新店"
                    optionFilterProp="children"
                  >
                  {isNewShopList.length>0 && 
                      isNewShopList.map((item,i) => {
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
          <Col span={24}  style={{display: "flex",alignItem:"center"}}>
            <FormItem>
              <span>门店定位：</span>    
            </FormItem>
            <FormItem label="经度" style={{display: "flex",width:150}}>
              {getFieldDecorator(`longitude`,
              {initialValue:editMsg.longitude})(
                <Input style={{width:100}}/>   
              )}
            </FormItem>
            <FormItem label="纬度" style={{display: "flex",width:150}}>
              {getFieldDecorator(`latitude`,{initialValue:editMsg.latitude})(
                <Input style={{width:100}}/>   
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