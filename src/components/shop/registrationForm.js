import React , {Component}  from 'react';
import { Form, Input, Select, Row, Col, DatePicker} from 'antd';
import moment from 'moment'
import {HttpRequest} from '../../utils/js/common';
import domain from '../../domain/domain';

const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends Component {
    constructor(props){
        super(props);
        this.state={
            dealy:500,
            isRequired:false,
            editRequired:false,
            provinceList:[],
            cityList:[],
            countyList:[],
            shopUserList:[],
            bossMsg:{},
            managerMsg:{},
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
            joinDistrictList:[],
            isWebsiteOpenList:[]
        };

    }
    handleSubmit = (e) => {
        e.preventDefault();
        let flag=true;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                flag=false
            }
        });
        return flag;
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
                if(type==="shop_type"){
                    this.setState({
                        shopTypeList:res
                    })
                }else if(type==="distribution_level"){
                    this.setState({
                        levelList:res
                    })
                }else if(type==="shop_join_type"){
                    this.setState({
                        joinTypeList:res
                    })
                }else if(type==="shop_level"){
                    this.setState({
                        shoplevelList:res
                    })
                }else if(type==="is_new_shop"){
                    this.setState({
                        isNewShopList:res
                    })
                }else if(type==="shop_status"){
                    this.setState({
                        shopStatusList:res
                    })
                }else if(type==="shop_is_website_open"){
                    this.setState({
                        isWebsiteOpenList:res
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
        // 详情查询
        const id=this.props.id;
        if(id){
            // 门店人员查询
            HttpRequest.getRequest(
                {
                    url:domain.shopUserInShop,
                    params:{
                        shopId:id
                    }
                },
                res=>{
                    this.setState({
                        shopUserList:res,
                    })
                }
            )
            HttpRequest.getRequest(
                {
                    url:domain.shopDetail,
                    params:{
                        shopId:id
                    }
                },
                res=>{
                    if(res){
                        res.joinDistrictList=[];
                        res.joinDistrictRegion.map((item)=>{
                            if(item.regionId){
                                res.joinDistrictList.push(item.regionId)
                            }
                            return item;
                        })
                        if(res.provinceCode){
                            this.changeProvince(res.provinceCode);
                            this.changeCity(res.cityCode);
                            this.changeProvince2(res.joinProvinceRegion?res.joinProvinceRegion.regionId:res.provinceCode,1);
                            this.changeCity2(res.joinProvinceRegion?res.joinCityRegion.regionId:res.cityCode,1);
                        }
                        if(res.orgName){
                            this.searchCompany(res.orgName,1);
                            this.setState({
                                orgObj:{orgCode:res.orgCode?res.orgCode:'',orgPrincipalName:res.orgPrincipalName?res.orgPrincipalName:'',orgPrincipalPhone:res.orgPrincipalPhone?res.orgPrincipalPhone:''}
                            })
                        }
                        if(res.areaManagerName){
                            this.searchManage(res.areaManagerName,1)
                        }
                        if(res.bdManagerName){
                            this.searchPickPerson(res.bdManagerName,1)
                        }
                        this.onChangeBoss(res.bossId)
                        this.onChangeManageer(res.managerId)
                        this.onChangeCompany(res.orgId)
                        this.setState({
                            editMsg:res?res:{}
                        })
                    }
                }
            )
        }
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
        //门店是否公开
        this.initSelect('shop_is_website_open')
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
                    cityList:res,
                })
            }
        )
    }
    changeCity(e,join){
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
                        countyList:res,
                    })
                }
            )
        }
    }
    changeProvince2(e){
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
                        joinCityList:res
                    })
                }
            )
        }
    }
    changeCity2(e,join){
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
                        joinDistrictList:res
                    })
                }
            )
        }
    }
    // 公司名称模糊匹配
    searchCompany(e,immediate){
        if(immediate){
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
                })
        }
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            HttpRequest.getRequest(
            {
                url:domain.companyList,
                params:{
                    keyWord:e
                }
            },
            res=>{
                console.log(res)
                this.setState({
                    companyList:res
                })
            })
        },this.state.dealy);
    }
    onChangeCompany(e){
        this.state.companyList.map((item)=>{
            if(item.id==e){//eslint-disable-line
                this.setState({
                    orgObj:item
                })
            }
            return item;
        })
    }
    // 查询区域经理
    searchManage(e,immediate){
        if(immediate){
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
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
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
        },this.state.dealy);
    }
    // 查询对接人
    searchPickPerson(e,immediate){
        if(immediate){
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
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
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
        },this.state.dealy);
    }
    handleShoptypeChange(e){
        if(e==="2"){
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
    onChangeBoss(e){
        this.state.shopUserList.map((item)=>{
            if(item.id==e){//eslint-disable-line
                this.setState({
                    bossMsg:item
                })
            }
            return item;
        })
    }
    onChangeManageer(e){
        this.state.shopUserList.map((item)=>{
            if(item.id==e){//eslint-disable-line
                this.setState({
                    managerMsg:item
                })
            }
            return item;
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { provinceList, cityList, countyList,shopTypeList,joinTypeList,shopUserList,levelList,shoplevelList,isNewShopList,shopStatusList,companyList,
            manageList,pickList,editMsg,bossMsg,managerMsg,isWebsiteOpenList} = this.state;
        const   formItemLayout={labelCol: { span:6},wrapperCol: { span: 14 },}
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={8}>
                        <FormItem label="门店编号" {...formItemLayout}>
                            {getFieldDecorator(`id`)(
                                <span>{editMsg.id}</span>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="门店名称" {...formItemLayout} >
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
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem label="公司名称" {...formItemLayout}>
                            {getFieldDecorator(`organizationId`, {
                                initialValue:editMsg.orgId,
                                rules: [{
                                    required: false,message: '请选择公司名称!',
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
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem label="社会信用代码" {...formItemLayout}>
                            <span>{this.state.orgObj.orgCode}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="法人代表" {...formItemLayout}>
                            <span>{this.state.orgObj.orgPrincipalName}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="法人代表电话" {...formItemLayout}>
                            <span>{this.state.orgObj.orgPrincipalPhone}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
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
                        <FormItem label="门店详细地址" {...formItemLayout}>
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
                </Row>
                <Row>    
                    <Col span={8}>
                        <FormItem label="门店老板" {...formItemLayout}>
                            {getFieldDecorator(`bossId`, {
                                initialValue:editMsg.bossId,
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
                                    onChange={this.onChangeBoss.bind(this)}
                                >
                                    {shopUserList.length>0 &&
                                    shopUserList.map((item,i) => {
                                        return (
                                            <Option key={i} value={item.id}>
                                                {item.fullname}
                                            </Option>
                                        )
                                    })
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="老板电话" {...formItemLayout}>
                            <span>{bossMsg.mobile?bossMsg.mobile:''}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="老板身份证号码" {...formItemLayout}>
                            <span>{bossMsg.idCard?bossMsg.idCard:''}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem label="门店主管" {...formItemLayout}>
                            {getFieldDecorator(`managerId`, {
                                initialValue:editMsg.managerId,
                                rules: [{
                                    required: this.state.editRequired,message: '请选择门店主管!',
                                }],
                            })(
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    allowClear={true}
                                    placeholder="请选择门店主管"
                                    optionFilterProp="children"
                                    onChange={this.onChangeManageer.bind(this)}
                                >
                                    {shopUserList.length>0 &&
                                    shopUserList.map((item,i) => {
                                        return (
                                            <Option key={i} value={item.id}>
                                                {item.fullname}
                                            </Option>
                                        )
                                    })
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="主管电话" {...formItemLayout}>
                            <span>{managerMsg.mobile?managerMsg.mobile:''}</span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="主管身份证号码" {...formItemLayout}>
                            <span>{managerMsg.idCard?managerMsg.idCard:''}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem label="门店类别" {...formItemLayout}>
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
                        <FormItem label="招商对接人" {...formItemLayout}>
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
                <Row>
                    <Col span={8}>
                        <FormItem label="加盟日期" {...formItemLayout}>
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
                        <FormItem label="加盟方式" {...formItemLayout}>
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
                        <FormItem label="方式备注" {...formItemLayout}>
                            {getFieldDecorator(`joinTypeMemo`,{
                                initialValue:editMsg.joinTypeMemo,
                            })(
                                <Input placeholder="请输入方式备注" style={{ width: 300 }}/>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Row type='flex'>
                            <FormItem label='加盟区域'></FormItem>
                            <FormItem>
                                {getFieldDecorator('joinProvinceRegion',{
                                    initialValue:editMsg.joinProvinceRegion?editMsg.joinProvinceRegion.regionId:'',
                                    rules:[{
                                        required:true,
                                        message: '请选择省!'
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
                                        required:true,
                                        message: '请选择市!'
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
                                    initialValue:editMsg.joinDistrictList?editMsg.joinDistrictList:[],
                                    rules:[{
                                        required:true,
                                        message: '请选择县!'
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
                    </Col>
                    <Col span={12}>
                        <FormItem label="区域经理" {...formItemLayout}>
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
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem label="分销级别" {...formItemLayout}>
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
                        <FormItem label="门店等级" {...formItemLayout}>
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
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem label="开业日期" {...formItemLayout}>
                            {getFieldDecorator(`openDate`, {
                                initialValue:editMsg.openDate?moment(editMsg.openDate):editMsg.openDate,
                                rules: [{
                                    required: false,message: '请选择开业日期!',
                                }],
                            })(
                                <DatePicker/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="门店状态" {...formItemLayout}>
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
                        <FormItem label="是否新店" {...formItemLayout}>
                            {getFieldDecorator(`isNewShop`, {
                                initialValue:editMsg.isNewShop?editMsg.isNewShop.code:'',
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
                </Row>
                <Row>
                    <Col span={8}  style={{display: "flex",alignItem:"center"}}>
                        <FormItem>
                            <span>门店定位：</span>
                        </FormItem>
                        <FormItem label="经度" style={{display: "flex",width:150}}>
                            {getFieldDecorator(`longitude`,
                                {initialValue:editMsg.longitude})(
                                <Input type="number" style={{width:100}}/>
                            )}
                        </FormItem>
                        <FormItem label="纬度" style={{display: "flex",width:150}}>
                            {getFieldDecorator(`latitude`,{initialValue:editMsg.latitude})(
                                <Input type="number" style={{width:100}}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="门店是否公开" {...formItemLayout}>
                            {getFieldDecorator(`isWebsiteOpen`, {
                                initialValue:editMsg.isWebsiteOpen?editMsg.isWebsiteOpen.code:'',
                                rules: [{
                                    required: true,message: '请选择是否新店!',
                                }],
                            })(
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="请选择门店是否公开"
                                    optionFilterProp="children"
                                >
                                    {isWebsiteOpenList.length>0 &&
                                    isWebsiteOpenList.map((item,i) => {
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
                </Row>
            </Form>
        );
    }
}
const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm;