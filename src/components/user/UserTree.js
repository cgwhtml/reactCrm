
import React , {Component} from 'react';
import { Form, Row, Col, Input, Button, Select, Icon, Tree, TreeSelect,AutoComplete,Radio   } from 'antd';

import {ModalBox , MasterBrand, NotMainBrand} from './ModalBox'

const FormItem = Form.Item;
const { TextArea } = Input;

const data={};

class mainBrandArea extends Component{
    constructor(props){
        super(props);
        this.state={
            id:1675,
            isBrandRequired:'true',
            masterName:'',//主品牌
            masterTree:'',//主品牌和区域
            masterData:'',//选中的品牌
        }
    }

    // 主品牌 获取获取品牌数据
    gainMasterData=(name)=>{
        let lists=[],_this=this;
        let masterName=[],masterId=[];
        name.map(item=>{
            item.level='1000';
            item.isLeaf=0;
            lists.push([item]);
            masterName.push(item.name);
            masterId.push(item.id);
        })
        this.setState({
            masterData:name,
            masterName:masterName,
            masterTree:lists.map(item=>{
                return item.map(count=>{
                    let areaTree=_this.state.areaTree;
                    areaTree.parentIds=count.id;
                    count.sysAreaTree=[areaTree];
                    return  count;
                })
            }),
        });
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

    //主品牌树 勾选复选框触发
    handleMasterTreeCheck = (checkedKeys, info)=>{
        const _this=this;
    }

    render(){
        const _this=this;
        return(
            <div>
                <Col xxl={{span:24}}>
                    <FormItem label='主品牌' labelCol={{span:2}} wrapperCol={{span:21}} className='required'>
                        <TextArea placeholder="请选择品牌" value={_this.state.masterName.join('/')} style={{ width: 300,marginRight:15 }} autosize disabled />
                        <Button onClick={_this.handleMasterBox}>品牌分配</Button>
                        <MasterBrand ref="getMasterButton" id={_this.state.id}  filterModalData={this.gainMasterData.bind(this)}></MasterBrand>
                    </FormItem>
                </Col>
                <Col xxl={{span:24}}>
                    <FormItem label='主品牌和区域' labelCol={{span:2}} wrapperCol={{span:21}} className='required' >
                        <div className='scrollbar'>
                            {
                                _this.state.masterTree.map((item,index)=>{
                                    let brandId= _this.state.masterData.map((n=>{return n.id}));
                                    let defaultCheckedTree= data.mainBrandAreaInfos;
                                    let defaultMasterCheckedKeys=[];
                                    for(let checkedKey in defaultCheckedTree){
                                        if(checkedKey==brandId[index]){
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
                                            defaultCheckedKeys={defaultMasterCheckedKeys}
                                            onCheck={_this.handleMasterTreeCheck}
                                        >
                                            {_this.renderTreeNodes(item)}
                                        </Tree>
                                    )
                                })
                            }
                        </div>
                        <div style={{color: '#f5222d',display:_this.state.isBrandRequired=='true'?'none':'block'}}>请选择主品牌和区域!</div>
                    </FormItem>
                </Col>
            </div>
        )
    }
}

export { mainBrandArea }