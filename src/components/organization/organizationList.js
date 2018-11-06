import React , {Component} from 'react';

import BreadcrumbItems from '../layouts/BreadcrumbItems';

//组织机构管理
const itemText = {
    item1: '主页',
    item2: '系统管理',
    item3: '组织机构管理'
};

class OrganizationManage extends Component{
    render(){
        return(
            <div>
                <BreadcrumbItems itemText={itemText}></BreadcrumbItems>
                <div className='main-content'>
                </div>
            </div>
        )
    }
}
export default OrganizationManage;