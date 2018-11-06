//wq 用户修改
import React , {Component} from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Form, Row, Col, Input, Button, Select, Icon, Tree, TreeSelect,AutoComplete,Radio,Modal} from 'antd';

import {HttpRequest,Check} from '../../utils/js/common'
import BreadcrumbItems from '../layouts/BreadcrumbItems';
import TooltipModal from '../layouts/TooltipModal';
import {ModalBox , MasterBrand, NotMainBrand} from './ModalBox'
import {ZonalTable} from './ZonalTable'
import domain from "../../domain/domain";
import axios from "axios/index";

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
            flag:0,//初始
            detailData:{
                shopId:123
            },
            password:'',
            isBrandRequired:'true',
            isAreaRequired:'true',
            isRoleRequired:'true',
            id:'',//用户识别号
            treesH:'0',
            //角色
            roleData:[],
            roleName:[],//角色名
            roleId:[],//角色id
            isDisabled:{},//tabs是否显示
            tabsKey:"isArea",//tabs是否显示
            areaTree:{id:1000},//区域树
            //所属部门
            departmentValue:undefined,
            departmentList:[],
            //主品牌
            masterData:[],//选中的keys
            masterName:[],//选中的name
            masterId:[],//选中的name
            masterTree:[],//品牌树
            checkedMasterTree:{},//选中的品牌树 参数
            defaultMasterExpandedKeys:[],//默认展开指定的树节点
            defaultMasterSelectedKeys:[],//默认选中的树节点
            defaultMasterCheckedKeys:[],//默认选中复选框的树节点
            treeMasterCheckedKeys:{},//选中复选框的树节点
            //非主品牌
            notMainData:[],
            notMainName:[],
            notMainId:[],
            notMainTree:[],//非主品牌树
            checkedNotMainTree:{},//选中的非主品牌树 参数
            defaultNotMainExpandedKeys:[],//默认展开指定的树节点
            defaultNotMainSelectedKeys:[],//默认选中的树节点
            defaultNotMainCheckedKeys:[],//默认选中复选框的树节点
            treeNotMainCheckedKeys:{},//选中复选框的树节点
            //区域
            defaultAreaExpandedKeys:[],//默认展开指定的树节点
            defaultAreaSelectedKeys:[],//默认选中的树节点
            defaultAreaCheckedKeys:[],//默认选中复选框的树节点
            treeAreaCheckedKeys:[],//选中复选框的树节点
            content:'',
            //所属门店
            shopDataSource:[],//所属门店列表
            optionGender:[],
            optionMainJobType:[],
        };
    }
    //所属部门
    departmentChange = (value, label, extra)=>{
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
        let roleName=[],roleId=[],isArea=[],isPurchase=[],isShop=[];
        let _this=this;
        let isDisabled=_this.state.isDisabled;
        value.map(item=>{//eslint-disable-line
            roleName.push(item.name);
            roleId.push(item.id);
            isArea.push(item.isArea);
            isPurchase.push(item.isPurchase);
            isShop.push(item.isShop);
        })

        _this.setState({
            roleData:value,
            roleName:roleName,
            roleId:roleId,
            isDisabled:(()=>{
                function isTrue(list){
                    let flag=false;
                    for(let i=0;i<list.length;i++){
                        let a=list[i];
                        flag= flag||a;
                    }
                    return flag;
                }
                isDisabled['isShop']=`${isTrue(isShop)}`;
                isDisabled['isPurchase']=`${isTrue(isPurchase)}`;
                isDisabled['isArea']=`${isTrue(isArea)}`;

                return isDisabled;
            })(),
            tabsKey:(()=>{
                /*
                * isShop 门店属性
                * isPurchase 采销属性
                * isArea 区域属性
                * */
                for(let keyWord in isDisabled){
                    if(isDisabled[keyWord]==='true'){//eslint-disable-line
                        return keyWord;
                    }
                }
            })()
        },()=>{
            // let isDisabled=_this.state.isDisabled;
            if(isDisabled.isShop=='false' && isDisabled.isPurchase=='true' ){//eslint-disable-line
                _this.refs.getMasterButton.brand();
                _this.refs.getNotMainButton.brand();
                _this.setState({
                    flag:_this.state.flag+=1
                });
            }
        })
    }
    //主品牌 弹窗
    handleMasterBox=()=>{
        this.refs.getMasterButton.showModal();
    }
    // 主品牌 获取获取品牌数据
    gainMasterData=(name)=>{
        let lists=[],_this=this;
        let masterName=[],masterId=[];
        name.map(item=>{//eslint-disable-line
            item.level='1000';
            item.isLeaf=0;
            lists.push([item]);
            masterName.push(item.name);
            masterId.push(item.id);
        })
        this.setState({
            masterData:name,
            masterName:masterName,
            masterId:masterId,
            masterTree:lists.map(item=>{
                return item.map(count=>{
                    let areaTree=_this.state.areaTree;
                    areaTree.parentIds=count.id;
                    count.sysAreaTree=[areaTree];
                    return  count;
                })
            }),
            checkedMasterTree:(()=>{
                let checkedMasterTree=_this.state.checkedMasterTree;
                for(let key in checkedMasterTree){
                    let hasVal=name.filter(p=>{
                        return p.id==key;//eslint-disable-line
                    });
                    if(hasVal.length<=0){
                        delete checkedMasterTree[key];
                    }
                }
                return checkedMasterTree;
            })(),
            treeMasterCheckedKeys:(()=>{
                let treeMasterCheckedKeys=_this.state.treeMasterCheckedKeys;
                for(let key in treeMasterCheckedKeys){
                    let hasVal=name.filter(p=>{
                        return p.id==key;//eslint-disable-line
                    });
                    if(hasVal.length<=0){
                        delete treeMasterCheckedKeys[key];
                    }
                }
                return treeMasterCheckedKeys;
            })()
        });
    }
    //tree
    handleMasterTreeSelect = (selectedKeys, info)=>{
    }
    //主品牌树 勾选复选框触发
    handleMasterTreeCheck = (checkedKeys, info)=>{
        const _this=this;
        if(!checkedKeys && !info){
            return;
        }
        let currentRootKey=info.node.context.rcTree.checkable._owner.key;
        let brandList=_this.state.masterData;//选中的品牌
        let brandId=brandList.map(item=>{
            return `{brandId:${item.id}}`;
        });
        let checkedObj=checkedKeys,halfCheckedKeys=info.halfCheckedKeys;
        let msg=[],checkedKeysL=[],brandRoot={},
            checkedMasterTree=_this.state.checkedMasterTree,
            treeMasterCheckedKeys=_this.state.treeMasterCheckedKeys;
        let brandRoot1=checkedObj.filter(item=>{
            item=eval('('+ item +')');//eslint-disable-line
            return item.level=='1000'//eslint-disable-line
        });
        let brandRoot2=halfCheckedKeys.filter(item=>{
            item=eval('('+ item +')');//eslint-disable-line
            return item.level=='1000'//eslint-disable-line
        });
        let checkedDefault=[],checkedDefaultList=[];//选中复选框后，重新选择品牌后 树的默认值 [brandId:key/key]
        brandRoot=brandRoot1.length>0 ? brandRoot1 :brandRoot2;
        brandRoot=eval('('+ brandRoot[0] +')');//eslint-disable-line
        brandId.map(n=>{//eslint-disable-line
            n=eval('('+ n +')');//eslint-disable-line
            if(brandRoot!=undefined && n.brandId==brandRoot.id){//eslint-disable-line
                checkedObj.map(p=>{//eslint-disable-line
                    checkedDefault.push(p);
                    p=eval('('+ p +')');
                    if(p.isLeaf==1){//eslint-disable-line
                        checkedKeysL.push(p.id);
                    }
                })
                msg.push(`{${n.brandId}:"${checkedKeysL.join('/')}"}`);//[{brandId:areaId/areaId}]
                checkedDefaultList.push(`{${n.brandId}:"${checkedDefault.join('/')}"}`);//[{brandId:areaId/areaId}]
            }
        })
        _this.setState({
            checkedMasterTree:(()=>{
                let checkedKey='',checkedCount='';
                if(msg.length===0){
                    checkedKey=currentRootKey;
                    checkedCount='';
                }else{
                    msg.map(item=>{//eslint-disable-line
                        item=eval('('+ item +')');
                        for(let key in item){
                            checkedKey=key;
                            checkedCount=item[key];
                        }
                    })
                }
                checkedMasterTree[checkedKey]=checkedCount;
                for(let key in checkedMasterTree){
                    let hasVal=brandId.filter(p=>{
                                p=eval('('+ p +')');//eslint-disable-line
                                return p.brandId==key;//eslint-disable-line
                            });
                    if(hasVal.length<=0){
                        delete checkedMasterTree[key];
                    }
                }
                return checkedMasterTree;
            })(),
            treeMasterCheckedKeys:(()=>{
                let checkedKey='',checkedCount='';
                if(checkedDefaultList.length===0){
                    checkedKey=currentRootKey;
                    checkedCount='';
                }else{
                    checkedDefaultList.map(item=>{//eslint-disable-line
                        item=eval('('+ item +')');//eslint-disable-line
                        for(let key in item){
                            checkedKey=key;
                            checkedCount=item[key];
                        }
                    })
                }
                treeMasterCheckedKeys[checkedKey]=checkedCount;
                for(let key in treeMasterCheckedKeys){
                    let hasVal=brandId.filter(p=>{
                        p=eval('('+ p +')');//eslint-disable-line
                        return p.brandId==key;//eslint-disable-line
                    });
                    if(hasVal.length<=0){
                        delete checkedMasterTree[key];
                    }
                }
                return treeMasterCheckedKeys;
            })()
        });
    }
    //非主品牌 弹窗
    handleNotMainBox=()=>{
        this.refs.getNotMainButton.showModal();
    }
    //非主品牌 获取品牌数据
    gainNotMainData=(name)=>{

        let lists=[],_this=this;
        let masterName=[],masterId=[];
        name.map(item=>{//eslint-disable-line
            item.level='1000';
            item.isLeaf=0;
            lists.push([item]);
            masterName.push(item.name);
            masterId.push(item.id);
        })
        this.setState({
            notMainData:name,
            notMainName:masterName,
            notMainId:masterId,
            notMainTree:lists.map(item=>{
                return item.map(count=>{
                    let areaTree=this.state.areaTree;
                    areaTree.parentIds=count.id;
                    count.sysAreaTree=[areaTree];
                    return  count;
                })
            }),
            checkedNotMainTree:(()=>{
                let checkedMasterTree=_this.state.checkedNotMainTree;
                for(let key in checkedMasterTree){
                    let hasVal=name.filter(p=>{
                        return p.id==key;//eslint-disable-line
                    });
                    if(hasVal.length<=0){
                        delete checkedMasterTree[key];
                    }
                }
                return checkedMasterTree;
            })(),
            treeNotMainCheckedKeys:(()=>{
                let treeMasterCheckedKeys=_this.state.treeNotMainCheckedKeys;
                for(let key in treeMasterCheckedKeys){
                    let hasVal=name.filter(p=>{
                        return p.id==key;//eslint-disable-line
                    });
                    if(hasVal.length<=0){
                        delete treeMasterCheckedKeys[key];
                    }
                }
                return treeMasterCheckedKeys;
            })()
        });
    }
    //tree 非主品牌树 节点
    handleNotMainTreeSelect = (selectedKeys, info)=>{}
    // 非主品牌  复选框
    handleNotMainTreeCheck = (checkedKeys, info)=>{
        const _this=this;
        if(!checkedKeys && !info){
            return;
        }
        let currentRootKey=info.node.context.rcTree.checkable._owner.key;
        let brandList=_this.state.notMainData;//选中的品牌
        let brandId=brandList.map(item=>{
            return `{brandId:${item.id}}`;
        });
        let checkedObj=checkedKeys,halfCheckedKeys=info.halfCheckedKeys;
        let msg=[],checkedKeysL=[],brandRoot={},
            checkedMasterTree=_this.state.checkedNotMainTree,
            treeMasterCheckedKeys=_this.state.treeNotMainCheckedKeys;
        let brandRoot1=checkedObj.filter(item=>{
            item=eval('('+ item +')');//eslint-disable-line
            return item.level=='1000'//eslint-disable-line
        });
        let brandRoot2=halfCheckedKeys.filter(item=>{
            item=eval('('+ item +')');//eslint-disable-line
            return item.level=='1000'//eslint-disable-line
        });
        let checkedDefault=[],checkedDefaultList=[];//选中复选框后，重新选择品牌后 树的默认值 [brandId:key/key]
        brandRoot=brandRoot1.length>0 ? brandRoot1 :brandRoot2;
        brandRoot=eval('('+ brandRoot[0] +')');//eslint-disable-line
        brandId.map(n=>{
            n=eval('('+ n +')');//eslint-disable-line
            if(brandRoot!=undefined && n.brandId==brandRoot.id){//eslint-disable-line
                checkedObj.map(p=>{
                    checkedDefault.push(p);
                    p=eval('('+ p +')');//eslint-disable-line
                    if(p.isLeaf==1){//eslint-disable-line
                        checkedKeysL.push(p.id);
                    }
                })
                msg.push(`{${n.brandId}:"${checkedKeysL.join('/')}"}`);//[{brandId:areaId/areaId}]
                checkedDefaultList.push(`{${n.brandId}:"${checkedDefault.join('/')}"}`);//[{brandId:areaId/areaId}]

            }
        })
        _this.setState({
            checkedNotMainTree:(()=>{
                let checkedKey='',checkedCount='';
                if(msg.length==0){//eslint-disable-line
                    checkedKey=currentRootKey;
                    checkedCount='';
                }else{
                    msg.map(item=>{
                        item=eval('('+ item +')');//eslint-disable-line
                        for(let key in item){
                            checkedKey=key;
                            checkedCount=item[key];
                        }
                    })
                }
                checkedMasterTree[checkedKey]=checkedCount;
                for(let key in checkedMasterTree){
                    let hasVal=brandId.filter(p=>{
                        p=eval('('+ p +')');//eslint-disable-line
                        return p.brandId==key;//eslint-disable-line
                    });
                    if(hasVal.length<=0){
                        delete checkedMasterTree[key];
                    }
                }
                return checkedMasterTree;
            })(),
            treeNotMainCheckedKeys:(()=>{
                let checkedKey='',checkedCount='';
                if(checkedDefaultList.length===0){
                    checkedKey=currentRootKey;
                    checkedCount='';
                }else{
                    checkedDefaultList.map(item=>{
                        item=eval('('+ item +')');//eslint-disable-line
                        for(let key in item){
                            checkedKey=key;
                            checkedCount=item[key];
                        }
                    })
                }
                treeMasterCheckedKeys[checkedKey]=checkedCount;
                for(let key in treeMasterCheckedKeys){
                    let hasVal=brandId.filter(p=>{
                        p=eval('('+ p +')');//eslint-disable-line
                        return p.brandId==key;//eslint-disable-line
                    });
                    if(hasVal.length<=0){
                        delete checkedMasterTree[key];
                    }
                }
                return treeMasterCheckedKeys;
            })()
        },()=>{
        });
    }
    //tree 归属区域
    handleAreaTreeSelect = (selectedKeys, info)=>{}
    handleAreaTreeCheck = (checkedKeys, info)=>{
        let _this=this;
        _this.setState({
            treeAreaCheckedKeys:checkedKeys,
            defaultAreaCheckedKeys:checkedKeys
        })
    }
    renderTreeNodes = (data)=>{
        return data.map((item)=>{
            if(item.sysAreaTree){
                return(
                    <TreeNode title={item.name} key={`{'id':${item.id},'isLeaf':${item.isLeaf},'level':${item.level}}`}  dataRef={item}>
                        {this.renderTreeNodes(item.sysAreaTree)}
                    </TreeNode>
                )
            }
            return <TreeNode title={item.name} key={`{'id':${item.id},'isLeaf':${item.isLeaf},'level':${item.level}}`} dataRef={item} />
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
        var _this=this;
        axios({
            method: 'get',
            url: domain.tree,
            params: {parentId:1000},
        })
            .then((res)=>{
                let data=res.data
                if(data.error===0){
                    let result=data.result;
                    _this.setState({
                        areaTree:result,
                        treesH:'1'
                    })
                }
            })
            .then(()=>{
                let isDisabled=_this.state.isDisabled;
                if(isDisabled.isShop=='false' && isDisabled.isPurchase=='true' ){//eslint-disable-line
                    _this.refs.getMasterButton.brand();
                    _this.refs.getNotMainButton.brand();
                    _this.setState({
                        flag:_this.state.flag+=1
                    });
                }
            });
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
        let _this=this;
        let operateType=_this.props.match.params?_this.props.match.params.operateType:'';
        let id=_this.props.match.params?_this.props.match.params.id:'';
        _this.setState({
            id:id,
        })
        HttpRequest.getRequest({
            url:domain.userDetail,
            params:{
                id:id,
                operateType:operateType
            }
        },(res)=>{
            this.setState({
                detailData:res,
                shopDataSource:[{id:res.shopId,name:res.shopName}],
                defaultAreaCheckedKeys:res.areas,
                password:res.password,
                defaultMasterCheckedKeys:res.mainBrandAreaInfos,
                defaultNotMainCheckedKeys:res.subBrandAreaInfos

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
    //保存
    handleSearch = (e) => {
        e.preventDefault();
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
        let _this=this;
        let isDisabled=_this.state.isDisabled;
        let id=_this.props.match.params.id;
        let treeArea=JSON.stringify(_this.state.treeAreaCheckedKeys),
            defaultAreaCheckedKeys=JSON.stringify(_this.state.defaultAreaCheckedKeys);

        let checkedMasterTree=JSON.stringify(_this.state.checkedMasterTree),
            defaultMasterCheckedKeys=JSON.stringify(toolKey(_this.state.defaultMasterCheckedKeys));

        let checkedNotMainTree=JSON.stringify(_this.state.checkedNotMainTree),
            defaultNotMainCheckedKeys=JSON.stringify(toolKey(_this.state.defaultNotMainCheckedKeys));

        this.props.form.validateFields((err, values) => {
            values.id=id;
            values.roles=JSON.stringify(_this.state.roleId);//角色
            values.mainBrandArea=checkedMasterTree=='{}'?defaultMasterCheckedKeys:checkedMasterTree;//主品牌和区域
            values.minorBrandArea=checkedNotMainTree=='{}'?defaultNotMainCheckedKeys:checkedNotMainTree;//非主品牌和区域
            values.responsibleArea= treeArea=='[]' ? defaultAreaCheckedKeys :treeArea;//区域属性

            _this.setState({
                isBrandRequired:values.mainBrandArea=='{}'?'false':'true',//eslint-disable-line
                isAreaRequired:values.responsibleArea=='[]'?'false':'true',//eslint-disable-line
                isRoleRequired:values.roles=='[]'?'false':'true'//eslint-disable-line
            })
            let isArea=values.responsibleArea=='[]';//eslint-disable-line
            let isBrand=values.mainBrandArea=='{}';//eslint-disable-line
            if(isDisabled.isShop=='false'){//eslint-disable-line
                if(err!=null)
                delete err.shopId;
            }
            if(isDisabled.isArea=='false'){//eslint-disable-line
                if(err!=null)
                isArea=false;
            }
            if(isDisabled.isPurchase=='false'){//eslint-disable-line
                delete err.mainJobType;
                isBrand=false;
            }
            if((err!=null && Object.keys(err).length !== 0) || isArea || isBrand ){
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
                        this.props.history.push("/userList");
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
    onRadioChange=(e)=>{
        let _this=this;
        if(e.target.value==='isPurchase' && _this.state.flag==0){//eslint-disable-line
            _this.refs.getMasterButton.brand();
            _this.refs.getNotMainButton.brand();
            _this.setState({
                flag:_this.state.flag+=1
            });
        }
        this.setState({
            tabsKey: e.target.value
        });
    }
    render(){
        const _this=this;
        const { getFieldDecorator } = _this.props.form;
        const  data  =_this.state.detailData;
        const  shopDataSource  = _this.state.shopDataSource;
        const children = shopDataSource.map((item) => {
                                                        if(item){
                                                            return <Option key={item.id}>{item.name}</Option>;
                                                        }
                                                    });
        let isShop=_this.state.isDisabled.isShop==="true",
            isPurchase=_this.state.isDisabled.isPurchase==="true",
            isArea=_this.state.isDisabled.isArea==="true",
            isShopChecked=_this.state.tabsKey=="isShop",//eslint-disable-line
            isPurchaseChecked=_this.state.tabsKey=="isPurchase",//eslint-disable-line
            isAreaChecked=_this.state.tabsKey=="isArea";//eslint-disable-line
        return(
            <div>
                <TooltipModal ref='getToolModal' content={this.state.content} ></TooltipModal>
                <BreadcrumbItems itemText={itemText}></BreadcrumbItems>
                <div className='main-content'>
                    <Form className="ant-advanced-search-form"
                          onSubmit={this.handleSearch}
                    >
                        <Row gutter={24}>
                            <Col {...formColLayout12}>
                                <FormItem label='用户ID' labelCol={{span:3}} >
                                    {data.id}
                                </FormItem>
                            </Col>
                            <Col {...formColLayout12}>
                                <FormItem label='角色' labelCol={{span:3}} wrapperCol={{span:21}} className='required' >
                                    <TextArea placeholder="请选择角色" value={this.state.roleName.join('/')} style={{ width: 300,marginRight:15 }} autosize disabled />
                                    <Button onClick={this.handleRoleModalBox}>角色分配</Button>
                                    <ModalBox ref="getModalButton" id={_this.state.id}  filterModalData={this.gainRoleData.bind(this)} ></ModalBox>
                                    <div style={{color: '#f5222d',display:_this.state.isRoleRequired=='true'?'none':'block'}}>请选择用户角色!</div>

                                </FormItem>
                            </Col>
                            <Col {...formColLayout12} >
                                <FormItem label='登录账号' labelCol={{span:3}}  wrapperCol={{span:21}}>
                                    {getFieldDecorator('loginId',{rules:[{
                                            required:true,
                                            message: '请输入登录账号!',
                                        }],initialValue:data.loginId})(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} style={{maxWidth:200}}   placeholder="请输入登录账号" />
                                    )}
                                    <span style={{marginLeft:10,display:'inline-block'}}>
                                        (删除：{data.isDelete} 锁定：{data.isLocked})
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
                                        }],initialValue:data.fullname})(
                                        <Input  style={{maxWidth:200}}   placeholder="请输入姓名" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...formColLayout6}>
                                <FormItem label='性别' labelCol={{span:6}} wrapperCol={{span:18}}>
                                    {getFieldDecorator('gender',{rules:[{
                                            required:true,
                                            message: '请选择性别!',
                                        }],initialValue:data.gender})(
                                        <Select  placeholder='请选择性别' allowClear style={{ width: 120 }}>
                                            {_this.renderOptionNodes(_this.state.optionGender)}
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
                                        }],initialValue:data.mobile})(
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
                                        }],initialValue:data.idcard})(
                                        <Input   style={{maxWidth:200,marginRight:15}}   placeholder="请输入正确的身份证号码" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...formColLayout6}>
                                <FormItem label='所属部门' labelCol={{span:6}} wrapperCol={{span:18}}>
                                    {getFieldDecorator('departmentId',{rules:[{
                                            required:true,
                                            message: '所属部门!',
                                        }],initialValue:data.departmentId})(
                                        <TreeSelect
                                            style={{ width: 300 }}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder="请输入所属部门"
                                            allowClear
                                            treeDefaultExpandAll
                                            onChange={this.departmentChange}
                                        >
                                            {this.renderDepartmentTreeNodes(this.state.departmentList)}
                                        </TreeSelect>
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...formColLayout6}>
                                <FormItem label='工作岗位' labelCol={{span:6}} wrapperCol={{span:18}}>
                                    {getFieldDecorator('positionTitle',{rules:[{
                                            required:false,
                                            message: '工作岗位!',
                                        }],initialValue:data.positionTitle})(
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
                                        }],initialValue:data.email})(
                                        <Input   style={{maxWidth:200,marginRight:15}}   placeholder="请输入电子邮箱" />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <div className='user-tabs-button'>
                            <div className='tabs-bar'>
                                <Radio.Group
                                    value={this.state.tabsKey} onChange={this.onRadioChange}
                                    style={{position:'relative',top:1}}
                                >
                                    <Radio.Button  value="isShop"
                                                   style={{display:isShop ? 'inline-block' : 'none'}}
                                                   className={isShopChecked?'ant-radio-button-wrapper-checked':''}
                                    >
                                        门店属性
                                    </Radio.Button>

                                    <Radio.Button value="isPurchase"
                                                  style={{display:isPurchase ? 'inline-block' : 'none'}}
                                                  className={isPurchaseChecked?'ant-radio-button-wrapper-checked':''}
                                    >
                                        采销属性
                                    </Radio.Button>

                                    <Radio.Button value="isArea"
                                                  style={{display:isArea ? 'inline-block' : 'none'}}
                                                  className={isAreaChecked ?'ant-radio-button-wrapper-checked':''}
                                    >
                                        区域属性
                                    </Radio.Button>

                                </Radio.Group>
                            </div>

                            <div style={{display:isShop && isShopChecked ? 'block' : 'none'}} >
                                <Row gutter={24}>
                                    <Col {...formColLayout6}>
                                        <FormItem label='所属门店' labelCol={{span:6}} wrapperCol={{span:18}}>
                                            {getFieldDecorator('shopId',{rules:[{
                                                    required:true,
                                                    message: '请选择所属门店!',
                                                }],initialValue:`${(data.shopId || data.shopId==0) ? data.shopId:''}`})(//eslint-disable-line
                                                <AutoComplete
                                                    style={{ width: 200 }}
                                                    onSelect={this.onShopSelect}
                                                    onSearch={this.handleShopSearch}
                                                    placeholder="请选择所属门店"
                                                >
                                                    {children}
                                                </AutoComplete>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col {...formColLayout6}>
                                        <FormItem label='是否老板' labelCol={{span:6}} wrapperCol={{span:18}}>
                                            {data.shopBoss}
                                        </FormItem>
                                    </Col>
                                    <Col {...formColLayout6}>
                                        <FormItem label='是否店长' labelCol={{span:6}} wrapperCol={{span:18}}>
                                            {data.shopManager}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                            <div style={{display:isPurchase && isPurchaseChecked ? 'block' : 'none'}} >
                                <Row gutter={24}>
                                    <Col xxl={{span:24}}>
                                        <FormItem label='首要工作方向' labelCol={{span:2}} wrapperCol={{span:21}}>
                                            {getFieldDecorator('mainJobType',{rules:[{
                                                    required:true,
                                                    message: '首要工作方向!',
                                                }],initialValue:`${data.mainJobType?data.mainJobType:''}`})(
                                                <Select  placeholder='请选择首要工作方向' allowClear style={{ width: 200 }}>
                                                    {_this.renderOptionNodes(_this.state.optionMainJobType)}
                                                    <Option value=''>请选择首要工作方向</Option>
                                                </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col xxl={{span:24}}>
                                        <FormItem label='主品牌' labelCol={{span:2}} wrapperCol={{span:21}} className='required'>
                                            <TextArea placeholder="请选择品牌" value={this.state.masterName.join('/')} style={{ width: 300,marginRight:15 }} autosize disabled />
                                            <Button onClick={this.handleMasterBox}>品牌分配</Button>
                                            <MasterBrand ref="getMasterButton" id={_this.state.id}  filterModalData={this.gainMasterData.bind(this)}></MasterBrand>
                                        </FormItem>
                                    </Col>
                                    <Col xxl={{span:24}}>
                                        <FormItem label='主品牌和区域' labelCol={{span:2}} wrapperCol={{span:21}} className='required' >
                                            <div className='scrollbar'>
                                                {
                                                    this.state.masterTree.map((item,index)=>{
                                                        let _this=this;
                                                        let brandId= _this.state.masterData.map((n=>{return n.id}));
                                                        let defaultCheckedTree= data.mainBrandAreaInfos;
                                                        let defaultMasterCheckedKeys=[];
                                                        for(let checkedKey in defaultCheckedTree){
                                                            if(checkedKey==brandId[index]){//eslint-disable-line
                                                                defaultMasterCheckedKeys=defaultCheckedTree[checkedKey].map(item=>{
                                                                    return `{'id':${item.id},'isLeaf':${item.isLeaf},'level':${item.level}}`
                                                                });
                                                            }
                                                        }
                                                        return (
                                                            <Tree
                                                                checkable
                                                                key={brandId[index]}
                                                                ref={brandId[index]}
                                                                defaultExpandedKeys={defaultMasterCheckedKeys}
                                                                defaultSelectedKeys={this.state.defaultMasterSelectedKeys}
                                                                defaultCheckedKeys={defaultMasterCheckedKeys}
                                                                onSelect={this.handleMasterTreeSelect}
                                                                onCheck={this.handleMasterTreeCheck}
                                                            >
                                                                {this.renderTreeNodes(item)}
                                                            </Tree>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div style={{color: '#f5222d',display:_this.state.isBrandRequired=='true'?'none':'block'}}>请选择主品牌和区域!</div>
                                        </FormItem>
                                    </Col>
                                    <Col xxl={{span:24}}>
                                        <FormItem label='非主品牌' labelCol={{span:2}} wrapperCol={{span:21}}>
                                            <TextArea placeholder="请选择非主品牌" value={this.state.notMainName.join('/')} style={{ width: 300,marginRight:15 }} autosize disabled />
                                            <Button onClick={this.handleNotMainBox}>品牌分配</Button>
                                            <NotMainBrand ref="getNotMainButton" id={_this.state.id}  filterModalData={this.gainNotMainData.bind(this)}></NotMainBrand>
                                        </FormItem>
                                    </Col>
                                    <Col xxl={{span:24}}>
                                        <FormItem label='非主品牌和区域' labelCol={{span:2}} wrapperCol={{span:21}}>
                                            <div className='scrollbar'>
                                                {
                                                    this.state.notMainTree.map((item,index)=>{
                                                        let _this=this;
                                                        let brandId= _this.state.notMainData.map((n=>{
                                                            return n.id
                                                        }));
                                                        let defaultCheckedTree= data.subBrandAreaInfos;

                                                        let defaultMasterCheckedKeys=[];
                                                        for(let checkedKey in defaultCheckedTree){
                                                            if(checkedKey==brandId[index]){//eslint-disable-line
                                                                defaultMasterCheckedKeys=defaultCheckedTree[checkedKey].map(item=>{
                                                                    return `{'id':${item.id},'isLeaf':${item.isLeaf},'level':${item.level}}`
                                                                });
                                                            }
                                                        }
                                                        return (
                                                            <Tree
                                                                checkable
                                                                key={brandId[index]}
                                                                ref={brandId[index]}
                                                                defaultExpandedKeys={defaultMasterCheckedKeys}
                                                                defaultSelectedKeys={this.state.defaultNotMainSelectedKeys}
                                                                defaultCheckedKeys={defaultMasterCheckedKeys}
                                                                onSelect={this.handleNotMainTreeSelect}
                                                                onCheck={this.handleNotMainTreeCheck}
                                                            >
                                                                {this.renderTreeNodes(item)}
                                                            </Tree>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                            <div style={{display:isArea && isAreaChecked ? 'block' : 'none'}} >
                                <Row gutter={24}>
                                    <Col xxl={{span:24}}>
                                        <FormItem label='负责区域' labelCol={{span:2}} wrapperCol={{span:21}} className={'required'} >
                                            <div className='scrollbar'>
                                                <Tree
                                                    checkable
                                                    defaultExpandAll
                                                    defaultExpandedKeys={this.state.defaultAreaCheckedKeys}
                                                    checkedKeys={{checked:this.state.defaultAreaCheckedKeys}}
                                                    onSelect={this.handleAreaTreeSelect}
                                                    onCheck={this.handleAreaTreeCheck}
                                                >
                                                    {this.renderAreaTreeNodes([this.state.areaTree])}
                                                </Tree>
                                            </div>
                                            <div style={{color: '#f5222d',display:_this.state.isAreaRequired=='true'?'none':'block'}}>请选择负责区域!</div>
                                        </FormItem>
                                    </Col>
                                    <Col xxl={{span:24}}>
                                        <FormItem label='区域划分参考' labelCol={{span:2}} wrapperCol={{span:21}}>
                                            <ZonalTable></ZonalTable>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        </div>
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