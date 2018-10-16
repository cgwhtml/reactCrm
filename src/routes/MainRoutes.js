import React , { Component } from 'react';
import { Switch,Route,BrowserRouter } from 'react-router-dom';
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


const Index = Loadable({
    loader: () => import('../components/layouts/layout'),
    loading: MyLoadingComponent
});
 /***            门店管理             **/
//列表
const Manage = Loadable({
    loader: () => import('../components/shop/Manage'),
    loading: MyLoadingComponent
});
const editAddShop = Loadable({
    loader: () => import('../components/shop/editAddShop'),
    loading: MyLoadingComponent
});


/***            用户管理             **/
//列表
const UserControl = Loadable({
    loader: () => import('../components/user/UserControl'),
    loading: MyLoadingComponent
});
// 修改
const WrappedModify = Loadable({
    loader: () => import('../components/user/Modify'),
    loading: MyLoadingComponent
});

const routes=[
    // { path :'/',component:Index,exact:true},
    // { path :'/system',component:Index},
    { path :'/',component:Manage,exact:true},
    { path :'/userControl',component:UserControl},
    { path :'/editAddShop',component:editAddShop},
    { path :'/modify',component:WrappedModify,}
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