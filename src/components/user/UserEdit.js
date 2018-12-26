//wq 用户修改
import React , {Component} from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Form, Row, Col, Input, Button, Select, Icon, Tree, TreeSelect,AutoComplete,Radio,Modal,Tabs} from 'antd';

import {HttpRequest,Check} from '../../utils/js/common'
import BreadcrumbItems from '../layouts/BreadcrumbItems';
import TooltipModal from '../layouts/TooltipModal';
import {ModalBox , MasterBrand, NotMainBrand} from './ModalBox'
import {ZonalTable} from './ZonalTable'
import domain from "../../domain/domain";
import axios from "axios/index";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const TreeNode = Tree.TreeNode;
const itemText={
                    item1:'主页',
                    item2:'系统管理',
                    item3:'添加/修改用户信息'
                };
const formColLayout12 = {xxl: { span:12 },};
const formColLayout6 = {xxl: { span:6 },};

class UserEdit extends Component{
    static propTypes={
        itemText: PropTypes.object,
    }
    constructor(props){
        super(props);
        this.state={
            detailData:{shopId:123},
            id:'',//用户识别号
            roleData:[],//角色
            isDisabled:{},//tabs是否显示
            areaTree:{id:1000},//区域树
            //所属部门
            departmentValue:undefined,
            departmentList:[],
            //主品牌
            mainBrands:[],//选中的keys
            masterTree:[],//品牌树
            checkedMasterTree:{},//选中的复选框 参数
            //非主品牌
            notMainData:[],
            notMainTree:[],//非主品牌树
            checkedNotMainTree:{},//选中的复选框 参数
            //区域
            treeAreaCheckedKeys:[],//选中复选框的树节点
            // content:'',
            //所属门店
            shopDataSource:[],//所属门店列表
            optionGender:[],
            optionMainJobType:[],
        };
        this.gainMainBrandsData=this.gainMainBrandsData.bind(this);
    }
    //所属部门
    departmentChange = (value)=>{
        this.setState({
            departmentValue:value
        });
    }
    departmentTree = ()=>{
        const _this=this;
        HttpRequest.getRequest({
            url:domain.departmentTree,
            params:{parentId:'0001'}
        },(res)=>{
            _this.setState({
                departmentList:[res]
            })
        })
    }
    //角色
    handleRoleModalBox=()=>{
        this.refs.getModalButton.showModal();
    }
    //获取选中角色数据
    gainRoleData=(value)=>{
        let _this=this;
        let isDisabled=_this.state.isDisabled;
        let isTrue=function(list){
            let flag=false;
            for(let i=0;i<list.length;i++){
                flag= flag||list[i];
            }
            return flag;
        };
        _this.setState({
            roleData:value,
            isDisabled:(()=>{
                isDisabled['isShop']=`${isTrue(value.map(todo=>todo.isShop))}`;
                isDisabled['isPurchase']=`${isTrue(value.map(todo=>todo.isPurchase))}`;
                isDisabled['isArea']=`${isTrue(value.map(todo=>todo.isArea))}`;
                return isDisabled;
            })()
        })
    }
    //主品牌 弹窗
    handleMasterBox=()=>{
        this.refs.getMasterButton.showModal();
    }
    deleteBrandsFromTree = (data,brand) => {
        let obj=data;
        for(let key in obj){
            let hasVal=brand.filter(p=>{
                return p.id==key;//eslint-disable-line
            });
            if(hasVal.length<=0){
                delete obj[key];
            }
        }
        return obj;
    }
    // 主品牌 获取获取品牌数据
    gainMainBrandsData=(name)=>{
        const _this=this;
        const {areaTree,checkedMasterTree}=_this.state;
        _this.setState({
            mainBrands:name,
            masterTree:name.map(item=>{
                item.sysAreaTree=[areaTree];
                return [item]
            }),
            checkedMasterTree:_this.deleteBrandsFromTree(checkedMasterTree,name)
        });
    }
    checkedKeysLeaf = (checkedNodes) => {
        let newArr=[];
        checkedNodes.map(item=>{
            let level=item.props.dataRef.level;
            if(level&&level=='1'){
                newArr.push(item.key);
            }
        })
        return newArr.join('/');
    }
    //主品牌树 勾选复选框触发
    handleMasterTreeCheck = (checkedKeys, info)=>{
        if(!checkedKeys && !info)
            return;  
        const _this=this;
        const {checkedMasterTree}=_this.state;    
        let currentRootKey=info.node.context.rcTree.checkable._owner.key;
        let checkedNodes=info.checkedNodes;
         _this.setState({
            checkedMasterTree:(()=>{
                checkedMasterTree[currentRootKey]=_this.checkedKeysLeaf(checkedNodes);
                if(checkedNodes==''){
                   delete checkedMasterTree[currentRootKey];     
                }
                return checkedMasterTree
            })()
        })
    }
    //非主品牌 弹窗
    handleNotMainBox=()=>{
        this.refs.getNotMainButton.showModal();
    }
    //非主品牌 获取品牌数据
    gainNotMainData=(name)=>{
        const _this=this;
        const {areaTree,checkedNotMainTree}=_this.state;
        _this.setState({
            notMainData:name,
            notMainTree:name.map(item=>{
                item.sysAreaTree=[areaTree];
                return [item]
            }),
            checkedNotMainTree:_this.deleteBrandsFromTree(checkedNotMainTree,name)
        });
    }
    // 非主品牌  复选框
    handleNotMainTreeCheck = (checkedKeys, info)=>{
        if(!checkedKeys && !info){
            return;
        }
        const _this=this;
        const {checkedNotMainTree}=_this.state;
        let currentRootKey=info.node.context.rcTree.checkable._owner.key;
        let checkedNodes=info.checkedNodes;
         _this.setState({
            checkedNotMainTree:(()=>{
                checkedNotMainTree[currentRootKey]=_this.checkedKeysLeaf(checkedNodes);
                return checkedNotMainTree
            })()
        })
    }
    //tree 归属区域
    handleAreaTreeCheck = (checkedKeys)=>{
        let _this=this;
        _this.setState({
            treeAreaCheckedKeys:checkedKeys,
        })
    }

    renderAreaTreeNodes = (data)=>{
        return data.map((item)=>{
            if(item.sysAreaTree){
                return(
                    <TreeNode   title={item.name}  key={item.id}   dataRef={item}>
                        {this.renderAreaTreeNodes(item.sysAreaTree)}
                    </TreeNode>
                )
            }
            return <TreeNode title={item.name} key={item.id}  dataRef={item} />
        })
    }

    renderDepartmentTreeNodes = (data)=>{
        return data.map((item)=>{
            if(item.subDepartment){
                let disabled= (item.subDepartment &&  item.subDepartment.length>0 ) ? true : false;
                // disabled={disabled}
                return(
                    <TreeNode value={item.id}  title={item.name} key={item.id}   dataRef={item}>
                        {this.renderDepartmentTreeNodes(item.subDepartment)}
                    </TreeNode>
                )
            }
            return <TreeNode   value={item.id} title={item.name} key={item.id} dataRef={item} />
        })
    }
    renderOptionNodes=(data)=>{
        return data.map((item) => {
            if(item){
                return <Option key={item.code}>{item.name}</Option>;
            }
        });
    }
    //首要工作方向
    renderMainJobType = ()=>{
        let _this=this;
        HttpRequest.getRequest({
            url:domain.shopTypeList,
            params:{
                typeId:'main_job_type'
            }
        },(res)=>{
            _this.setState({
                optionMainJobType:res
            })
        })
    }
    //性别
    renderGender = ()=>{
        let _this=this;
        HttpRequest.getRequest({
            url:domain.shopTypeList,
            params:{
                typeId:'gender'
            }
        },(res)=>{
            _this.setState({
                optionGender:res
            })
        })
    }

    //区域树
    getTree=()=>{
        const _this=this;
        axios({
            method: 'get',
            url: domain.tree,
            params: {parentId:1000},
        })
            .then((res)=>{
                let data=res.data
                if(data.error===0){
                    _this.setState({
                        areaTree:data.result,
                    })
                }
            })
    }
    //所属门店
    onShopSelect = (value)=>{}
    //重置密码
    passwordReset =() =>{
        let _this=this;
        let id=_this.props.match.params.id;
        HttpRequest.postRequest({
            url:domain.passInit,
            data:{
                userId:id
            }
        },(res)=>{
            Modal.success({
                title: '确定',
                content: `密码重置成功！`,
            });
        })
    }
    //查询用户详情
    userDetail = ()=>{
        const _this=this;
        let operateType=_this.props.match.params?_this.props.match.params.operateType:'';
        let id=_this.props.match.params?_this.props.match.params.id:'';
        _this.setState({
            id:id,
        })
        function toolKey(data){
            let obj={};
            for(let key in data){
                let list=data[key].map(item=>{
                    return item.id;
                });
                obj[key]=list.join('/');
            }
            return obj;
        }
        HttpRequest.getRequest({
            url:domain.userDetail,
            params:{
                id:id,
                operateType:operateType
            }
        },(res)=>{
            _this.setState({
                detailData:res,
                shopDataSource:[{id:res.shopId,name:res.shopName}],
                treeAreaCheckedKeys:res.areas,
                checkedMasterTree:toolKey(res.mainBrandAreaInfos),
                checkedNotMainTree:toolKey(res.subBrandAreaInfos)

            })
        })
    }
    //所属门店
    handleShopSearch = (value) => {
        HttpRequest.getRequest({
            url:domain.shopName,
            params:{keyWord:value},
        },(res)=>{
            this.setState({
                shopDataSource: res
            });
        })
    }
    renderShop = (data) => {
        return data.map((item) => {
            if(item){
                return <Option key={item.id}>{item.name}</Option>;
            }
        });
    }
    showTap = (flag,node) => {
        if(flag)
            return node
    }
    //保存
    handleSearch = (e) => {
        e.preventDefault();
        const _this = this;
        const { roleData, checkedMasterTree, checkedNotMainTree, treeAreaCheckedKeys, isDisabled} = _this.state;
        const rolesList=roleData.map(todo=>todo.id);
        let id = _this.props.match.params.id;

        _this.props.form.validateFields((err, values) => {
            values.id = id;
            values.roles = JSON.stringify(rolesList);//角色
            values.mainBrandArea = JSON.stringify(checkedMasterTree);//主品牌和区域
            values.minorBrandArea = JSON.stringify(checkedNotMainTree);//非主品牌和区域
            values.responsibleArea = JSON.stringify(treeAreaCheckedKeys);//区域属性
            if(isDisabled.isShop === 'false' && err!=null && err.shopId){//eslint-disable-line
                delete err.shopId;
            }
            if(isDisabled.isPurchase === 'false' && err!=null && err.mainJobType){//eslint-disable-line
                delete err.mainJobType;
            }
            if(
                (err!=null && Object.keys(err).length !== 0)
                 ||  isDisabled.isPurchase ==='true' && Object.keys(checkedMasterTree).length === 0
                 || isDisabled.isArea === 'true' && treeAreaCheckedKeys.length === 0
                 || rolesList.length === 0
                 ){
                Modal.error({
                    title: '提示',
                    content: '必要信息请填写完整！',
                });
                return;
            }
            HttpRequest.postRequest({
                url:domain.addOrUpdate,
                data:values
            },(res)=>{
                Modal.success({
                    title: '确定',
                    content: `保存成功！`,
                    onOk:()=>{
                        _this.props.history.push("/userList");
                    }
                });
            })
        });
    }
    componentWillMount =()=>{
        let _this=this;
        _this.getTree();
        _this.departmentTree();
        _this.userDetail();
        _this.renderGender();
        _this.renderMainJobType();
    }

    render(){
        const _this=this;
        const {id,roleData,detailData,optionGender,departmentList,isDisabled,shopDataSource,mainBrands,masterTree,checkedMasterTree,notMainData,checkedNotMainTree,areaTree,treeAreaCheckedKeys}=_this.state;
        const { getFieldDecorator } = _this.props.form;
        const roleName=roleData.map(todo=>todo.name);
        let isShop=true,/*isDisabled.isShop==="true"*/ isPurchase=isDisabled.isPurchase==="true", isArea=isDisabled.isArea==="true";
        return(
            <div>
                <BreadcrumbItems itemText={itemText} />
                <div className='main-content'>
                    <Form className="ant-advanced-search-form"
                          onSubmit={this.handleSearch}
                    >
                        <Row gutter={24}>
                            <Col {...formColLayout12}>
                                <FormItem label='用户ID' labelCol={{span:3}} >
                                    {detailData.id}
                                </FormItem>
                            </Col>
                            <Col {...formColLayout12}>
                                <FormItem label='角色' labelCol={{span:3}} wrapperCol={{span:21}} className='required' >
                                    <TextArea placeholder="请选择角色" value={roleName.join('/')} style={{ width: 300,marginRight:15 }} autosize disabled />
                                    <Button onClick={this.handleRoleModalBox}>角色分配</Button>
                                    <ModalBox ref="getModalButton" id={id}  filterModalData={this.gainRoleData.bind(this)} />
                                    <div style={{color: '#f5222d',display: roleName.length === 0 ? 'block' : 'none'}}>请选择用户角色!</div>
                                </FormItem>
                            </Col>
                            <Col {...formColLayout12} >
                                <FormItem label='登录账号' labelCol={{span:3}}  wrapperCol={{span:21}}>
                                    {getFieldDecorator('loginId',{rules:[{
                                            required:true,
                                            message: '请输入登录账号!',
                                        }],initialValue:detailData.loginId})(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} style={{maxWidth:200}}   placeholder="请输入登录账号" />
                                    )}
                                    <span style={{marginLeft:10,display:'inline-block'}}>
                                        (删除：{detailData.isDelete} 锁定：{detailData.isLocked})
                                    </span>
                                </FormItem>
                            </Col>
                            <Col {...formColLayout12}>
                                <FormItem label='初始密码' labelCol={{span:3}}  wrapperCol={{span:21}}>
                                    <span style={{paddingRight: 15}}>root</span>
                                    <Button type="primary" onClick={_this.passwordReset}>复位密码</Button>
                                </FormItem>
                            </Col>
                            <Col {...formColLayout6}>
                                <FormItem label='姓名' labelCol={{span:6}} wrapperCol={{span:18}} >
                                    {getFieldDecorator('fullname',{rules:[{
                                            required:true,
                                            message: '请输入姓名!',
                                        }],initialValue:detailData.fullname})(
                                        <Input  style={{maxWidth:200}}   placeholder="请输入姓名" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...formColLayout6}>
                                <FormItem label='性别' labelCol={{span:6}} wrapperCol={{span:18}}>
                                    {getFieldDecorator('gender',{rules:[{
                                            required:true,
                                            message: '请选择性别!',
                                        }],initialValue:detailData.gender})(
                                        <Select  placeholder='请选择性别' allowClear style={{ width: 120 }}>
                                            {_this.renderOptionNodes(optionGender)}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...formColLayout6}>
                                <FormItem label='手机号码' labelCol={{span:6}} wrapperCol={{span:18}}>
                                    {getFieldDecorator('mobile',{rules:[{
                                            required:true,
                                            message: '手机号码!',
                                        },{
                                            pattern:/^1\d{10}$/,
                                            message:'请输入手机号码'
                                        }],initialValue:detailData.mobile})(
                                        <Input   style={{maxWidth:200,marginRight:15}}   placeholder="请输入手机号码" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...formColLayout6}>
                                <FormItem label='身份证' labelCol={{span:6}} wrapperCol={{span:18}}>
                                    {getFieldDecorator('idcard',{rules:[{
                                            required:false,
                                            validator:Check.idCard,
                                        },{
                                        }],initialValue:detailData.idcard})(
                                        <Input   style={{maxWidth:200,marginRight:15}}   placeholder="请输入正确的身份证号码" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...formColLayout6}>
                                <FormItem label='所属部门' labelCol={{span:6}} wrapperCol={{span:18}}>
                                    {getFieldDecorator('departmentId',{rules:[{
                                            required:true,
                                            message: '所属部门!',
                                        }],initialValue:detailData.departmentId})(
                                        <TreeSelect
                                            style={{ width: 300 }}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder="请输入所属部门"
                                            allowClear
                                            treeDefaultExpandAll
                                            onChange={this.departmentChange}
                                        >
                                            {_this.renderDepartmentTreeNodes(departmentList)}
                                        </TreeSelect>
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...formColLayout6}>
                                <FormItem label='工作岗位' labelCol={{span:6}} wrapperCol={{span:18}}>
                                    {getFieldDecorator('positionTitle',{rules:[{
                                            required:false,
                                            message: '工作岗位!',
                                        }],initialValue:detailData.positionTitle})(
                                        <Input   style={{maxWidth:200,marginRight:15}}   placeholder="请属入工作岗位" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...formColLayout6}>
                                <FormItem label='电子邮箱' labelCol={{span:6}} wrapperCol={{span:18}}>
                                    {getFieldDecorator('email',{rules:[{
                                            required:false,
                                            message: '电子邮箱!',
                                        },{
                                            type:'email',
                                            message:'请输入正确的邮箱地址'
                                        }],initialValue:detailData.email})(
                                        <Input   style={{maxWidth:200,marginRight:15}}   placeholder="请输入电子邮箱" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Tabs defaultActiveKey="1" type="card">
                            {
                                _this.showTap(isShop,
                                    <TabPane tab="门店属性" key="1">
                                        <Row gutter={24}>
                                            <Col {...formColLayout6}>
                                                <FormItem label='所属门店' labelCol={{span:6}} wrapperCol={{span:18}}>
                                                    {getFieldDecorator('shopId',{rules:[{
                                                            required:true,
                                                            message: '请选择所属门店!',
                                                        }],initialValue:`${(detailData.shopId || detailData.shopId === 0) ? detailData.shopId:''}`})(//eslint-disable-line
                                                        <AutoComplete
                                                            style={{ width: 200 }}
                                                            onSelect={_this.onShopSelect}
                                                            onSearch={_this.handleShopSearch}
                                                            placeholder="请选择所属门店"
                                                        >
                                                            {_this.renderShop(shopDataSource)}
                                                        </AutoComplete>
                                                    )}
                                                </FormItem>
                                            </Col>
                                            <Col {...formColLayout6}>
                                                <FormItem label='是否老板' labelCol={{span:6}} wrapperCol={{span:18}}>
                                                    {detailData.shopBoss}
                                                </FormItem>
                                            </Col>
                                            <Col {...formColLayout6}>
                                                <FormItem label='是否店长' labelCol={{span:6}} wrapperCol={{span:18}}>
                                                    {detailData.shopManager}
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                )
                            }
                            {
                                _this.showTap(isPurchase,
                                  <TabPane tab="采销属性" key="2">
                                      <Row gutter={24}>
                                          <Col xxl={{span:24}}>
                                              <FormItem label='首要工作方向' labelCol={{span:2}} wrapperCol={{span:21}}>
                                                  {getFieldDecorator('mainJobType',{rules:[{
                                                          required:true,
                                                          message: '首要工作方向!',
                                                      }],initialValue:`${detailData.mainJobType?detailData.mainJobType:''}`})(
                                                      <Select  placeholder='请选择首要工作方向' allowClear style={{ width: 200 }}>
                                                          {_this.renderOptionNodes(_this.state.optionMainJobType)}
                                                          <Option value=''>请选择首要工作方向</Option>
                                                      </Select>
                                                  )}
                                              </FormItem>
                                          </Col>
                                          <Col xxl={{span:24}}>
                                              <FormItem label='主品牌' labelCol={{span:2}} wrapperCol={{span:21}} className='required'>
                                                  <TextArea placeholder="请选择品牌" value={mainBrands.map(item=>item.name).join('/')} style={{ width: 300,marginRight:15 }} autosize disabled />
                                                  <Button onClick={this.handleMasterBox}>品牌分配</Button>
                                                  <MasterBrand ref="getMasterButton" id={_this.state.id}  filterModalData={this.gainMainBrandsData.bind(this)} />
                                              </FormItem>
                                          </Col>
                                          <Col xxl={{span:24}}>
                                              <FormItem label='主品牌和区域' labelCol={{span:2}} wrapperCol={{span:21}} className='required' >
                                                  <div className='scrollbar'>
                                                      {
                                                          masterTree.map((item,index)=>{
                                                              let brandId= mainBrands.map((n=>n.id));
                                                              let defaultMasterCheckedKeys=[];
                                                              for(let checkedKey in checkedMasterTree){
                                                                  if(checkedKey==brandId[index]){//eslint-disable-line
                                                                      defaultMasterCheckedKeys=checkedMasterTree[checkedKey].split("/");
                                                                  }
                                                              }
                                                              return (
                                                                  <Tree
                                                                      checkable
                                                                      key={brandId[index]}
                                                                      ref={brandId[index]}
                                                                      defaultExpandedKeys={defaultMasterCheckedKeys}
                                                                      defaultCheckedKeys={defaultMasterCheckedKeys}
                                                                      onCheck={_this.handleMasterTreeCheck}
                                                                  >
                                                                      {_this.renderAreaTreeNodes(item)}
                                                                  </Tree>
                                                              )
                                                          })
                                                      }
                                                  </div>
                                                  <div style={{color: '#f5222d',display:Object.keys(checkedMasterTree).length === 0 ? 'block' : 'none'}}>请选择主品牌和区域!</div>
                                              </FormItem>
                                          </Col>
                                          <Col xxl={{span:24}}>
                                              <FormItem label='非主品牌' labelCol={{span:2}} wrapperCol={{span:21}}>
                                                  <TextArea placeholder="请选择非主品牌" value={notMainData.map(item=>item.name).join('/')} style={{ width: 300,marginRight:15 }} autosize disabled />
                                                  <Button onClick={_this.handleNotMainBox}>品牌分配</Button>
                                                  <NotMainBrand ref="getNotMainButton" id={_this.state.id}  filterModalData={this.gainNotMainData.bind(this)} />
                                              </FormItem>
                                          </Col>
                                          <Col xxl={{span:24}}>
                                              <FormItem label='非主品牌和区域' labelCol={{span:2}} wrapperCol={{span:21}}>
                                                  <div className='scrollbar'>
                                                      {
                                                          this.state.notMainTree.map((item,index)=>{
                                                              let brandId= notMainData.map((n=>{return n.id}));
                                                              let defaultMasterCheckedKeys=[];
                                                              for(let checkedKey in checkedNotMainTree){
                                                                  if(checkedKey == brandId[index]){//eslint-disable-line
                                                                      defaultMasterCheckedKeys=checkedNotMainTree[checkedKey].split("/");
                                                                  }
                                                              }
                                                              return (
                                                                  <Tree
                                                                      checkable
                                                                      key={brandId[index]}
                                                                      ref={brandId[index]}
                                                                      defaultExpandedKeys={defaultMasterCheckedKeys}
                                                                      defaultCheckedKeys={defaultMasterCheckedKeys}
                                                                      onCheck={_this.handleNotMainTreeCheck}
                                                                  >
                                                                        {_this.renderAreaTreeNodes(item)}
                                                                  </Tree>
                                                              )
                                                          })
                                                      }
                                                  </div>
                                              </FormItem>
                                          </Col>
                                      </Row>
                                  </TabPane>
                              )
                            }
                            {
                                _this.showTap(isArea,
                                    <TabPane tab="区域属性" key="3">
                                        <Row gutter={24}>
                                            <Col xxl={{span:24}}>
                                                <FormItem label='负责区域' labelCol={{span:2}} wrapperCol={{span:21}} className={'required'} >
                                                    <div className='scrollbar'>
                                                        <Tree
                                                            checkable
                                                            defaultExpandAll
                                                            defaultExpandedKeys={treeAreaCheckedKeys}
                                                            checkedKeys={{checked:treeAreaCheckedKeys}}
                                                            onCheck={_this.handleAreaTreeCheck}
                                                        >
                                                            {_this.renderAreaTreeNodes([areaTree])}
                                                        </Tree>
                                                    </div>
                                                    <div style={{color: '#f5222d',display:treeAreaCheckedKeys.length === 0 ? 'block' : 'none'}}>请选择负责区域!</div>
                                                </FormItem>
                                            </Col>
                                            <Col xxl={{span:24}}>
                                                <FormItem label='区域划分参考' labelCol={{span:2}} wrapperCol={{span:21}}>
                                                    <ZonalTable></ZonalTable>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                )
                            }
                        </Tabs>
                        <Row className='row-bottom'>
                            <Col span={24} style={{ textAlign: 'center' }}>
                                <Button htmlType="submit">保存</Button>
                                <Button type="danger" style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                    <NavLink exact to={{pathname:'/userList'}}>取消</NavLink>
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                </div>
            </div>
        )
    }
}
const WrappedUserEdit= Form.create()(UserEdit);

export default WrappedUserEdit;