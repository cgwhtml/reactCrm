import React , {Component} from 'react';
import { Tree,Modal} from 'antd';
import {HttpRequest} from '../../utils/js/common';

const TreeNode = Tree.TreeNode;
const confirm = Modal.confirm;

class TowableTree extends Component{
    constructor(props){
        super(props);
        this.state={
            gData:this.props.gdata,
            sysTree:this.props.gdata.id===1000?"sysAreaTree":"subDepartment"
        }
    }
    //区域树
    getTree=(values)=>{
        const searchDelete=this.props.searchDelete;
        const searchValues=values?values:''
        HttpRequest.getRequest(
            {
                url: this.props.urlTree,
                params:Object.assign({parentId:this.props.gdata.id,searchDelete:searchDelete},searchValues),
            },
            res=>{
                this.setState({
                    gData:res,
                })
            }
        )
    }
    componentWillMount(){
       this.getTree(); 
    }
    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
          return;
        };
    }
    componentDidMount(){
        this.props.onRef(this)
    }
    renderAreaTreeNodes = (data)=>{
        if(Object.keys(data[0]).length===0 ){
            return
         }
        return data.map((item)=>{
            if(item[this.state.sysTree] && item[this.state.sysTree].length){
                return(
                    <TreeNode   title={item.isDelete==1?<span style={{ color: 'red' }}>{item.name}&nbsp;&nbsp;&nbsp;已删除</span>:item.name} key={item.id}   dataRef={item}>
                        {this.renderAreaTreeNodes(item[this.state.sysTree])}
                    </TreeNode>
                )
            }
            return <TreeNode title={item.isDelete==1?<span style={{ color: 'red' }}>{item.name}&nbsp;&nbsp;&nbsp;已删除</span>:item.name} key={item.id}  dataRef={item} />
        })
    }
    onDrop = (info) => {
        const _this=this;
        const dropKey = info.node.props.eventKey;//目标ID
        const dragKey = info.dragNode.props.eventKey;//移动id
        const dropPos = info.node.props.pos.split('-');//目标ID的位置
        const dragPos = info.dropPosition;//移动ID的位置
        const dropPosition =dragPos-Number(dropPos[dropPos.length - 1]);//移动id的位置-目标ID的位置
        let position=''
        if(dropPosition>0){
            position=1
        }else if(dropPosition<0){
            position=-1
        }else{
            position=0
        }
        // const loop = (data, key, callback) => {
        //     data.forEach((item, index, arr) => {
        //       if (item.id === key) {
        //         return callback(item, index, arr);
        //       }
        //       if (item[this.state.sysTree]) {
        //         return loop(item[this.state.sysTree], key, callback);
        //       }
        //     });
        // };
        confirm({
            title: '提示',
            content: '是否将该部门移动到指定位置？',
            onOk() {
                HttpRequest.postRequest({
                    url:_this.props.urlDrag,
                    data:{sourceId:dragKey,targetId:dropKey,operateType:position}
                    },
                    result=>{
                        Modal.success({
                            title: '确定',
                            content: `移动成功！`,
                            onOk:()=>{
                                _this.getTree(); 
                            }
                        });
                })
            },
            onCancel() {},
        });
        // const data = [this.state.gData]
        // // Find dragObject
        // let dragObj;
        // loop(data, dragKey, (item, index, arr) => {
        //     arr.splice(index, 1);
        //     dragObj = item;
        // });
        // if (!info.dropToGap) {
        //     // Drop on the content
        //     loop(data, dropKey, (item) => {
        //       item.children = item.children || [];
        //       // where to insert 示例添加到尾部，可以是随意位置
        //       item.children.push(dragObj);
        //     });
        //   }else if (
        //     (info.node.props.children || []).length > 0 // Has children
        //     && info.node.props.expanded // Is expanded
        //     && dropPosition === 1 // On the bottom gap
        //   ) {
        //     loop(data, dropKey, (item) => {
        //       item.children = item.children || [];
        //       // where to insert 示例添加到尾部，可以是随意位置
        //       item.children.unshift(dragObj);
        //     });
        //   } else {
        //     let ar;
        //     let i;
        //     loop(data, dropKey, (item, index, arr) => {
        //       ar = arr;
        //       i = index;
        //     });
        //     if (dropPosition === -1) {
        //       ar.splice(i, 0, dragObj);
        //     } else {
        //       ar.splice(i + 1, 0, dragObj);
        //     }
        // }
        // this.setState({
        //     gData:data[0],
        // });
    }
    render(){
        const _this=this;
        return(
            <Tree
                className="draggable-tree"
                draggable
                defaultExpandAll={true}
                onDragEnter={_this.onDragEnter}
                onDrop={_this.onDrop}
                onDragEnd={_this.onDragEnd}
                onSelect={this.props.handleAreaTreeSelect}
            >
                {this.renderAreaTreeNodes([_this.state.gData])}
            </Tree>
        )
    }
}

export default TowableTree;