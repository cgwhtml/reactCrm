import React , {Component} from 'react';

import BreadcrumbItems from '../layouts/BreadcrumbItems';

//首页
const itemText = {
    item1: '主页',
    item2: '系统管理',
    item3: '首页'
};

class Index extends Component{
    render(){
        return(
            <div>
                <BreadcrumbItems itemText={itemText}></BreadcrumbItems>
                <div className='main-content'>
                    <p>欢迎使用权限管理</p>
                </div>
            </div>
        )
    }
}
export default Index;