
const title='http://localhost:8088';
const domain = {
    /**门店管理**/
    shopList:title+'/system/shop/list', //查询门店列表

    shopDelete:title+'/system/shop/delORecover', //删除门店

    /**用户管理**/
    userList:title+'/system/user/list', //4.42.查询一个用户的所有角色信息
};
export default domain;