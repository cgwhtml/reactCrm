import React , { Component } from 'react';
import { Switch,Route } from 'react-router-dom';
import Loadable from 'react-loadable';

const MyLoadingComponent = ({ isLoading, error }) => {
    if (isLoading) {
        return <div>Loading...</div>
    }
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>
    }
    else {
        return null;
    }
};

 /***            主页             **/
const Index = Loadable({
    loader: () => import('../components/index/index'),
    loading: MyLoadingComponent
});
 /***            门店管理             **/
//列表
const ShopList = Loadable({
    loader: () => import('../components/shop/ShopList'),
    loading: MyLoadingComponent
});
const ShopEdit = Loadable({
    loader: () => import('../components/shop/ShopEdit'),
    loading: MyLoadingComponent
});


/***            用户管理             **/
//列表
const UserList = Loadable({
    loader: () => import('../components/user/UserList'),
    loading: MyLoadingComponent
});
// 修改
const UserEdit = Loadable({
    loader: () => import('../components/user/UserEdit'),
    loading: MyLoadingComponent
});

/***            法人机构管理             **/
const OrgList = Loadable({
    loader: () => import('../components/corporation/OrgList'),
    loading: MyLoadingComponent
});

/***            组织机构管理             **/
const DeptList = Loadable({
    loader: () => import('../components/department/deptList'),
    loading: MyLoadingComponent
});
/***            区域管理             **/
const AreaList = Loadable({
    loader: () => import('../components/area/areaList'),
    loading: MyLoadingComponent
});

const routes=[
    { path :'/',component:Index,exact:true},
    { path :'/shopList',component:ShopList,exact:true},
    { path :'/shopEdit/:id?',component:ShopEdit},

    { path :'/userList',component:UserList,exact:true},
    { path :'/userEdit/:operateType/:id?',component:UserEdit},

    { path :'/orgList',component:OrgList,exact:true},

    { path :'/deptList',component:DeptList,exact:true},
    { path :'/areaList',component:AreaList,exact:true},
    { path :'*',component:Index,},
];

class MainRoutes extends Component{
    render(){
        return(
            <Switch>
                {
                    routes.map(route=>(
                        <Route key={route.path} path={route.path} component={route.component} exact={route.exact} />
                    ))
                }
            </Switch>
        )
    }
}
export default MainRoutes;