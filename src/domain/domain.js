
const title='http://localhost:8088';
const domain = {
    // 图片上传
    uploadImg:title+'/system/upload/pic',//图片上传

    /**门店管理**/
    shopList:title+'/system/shop/list', //查询门店列表

    shopDetail:title+'/system/shop/detail',//查询门店详情

    shopDelete:title+'/system/shop/delORecover', //删除门店
    
    areaList:title+'/system/region/lists', //省市县下拉

    shopTypeList:title+'/system/code/accurate', //门店类型
    
    companyList:title+'/system/organization/name/like', //公司名称

    shopUserList:title+'/system/user/inShop', //查询门店用户

    shopMangerList:title+'/system/user/name/like', //查询区域经理
    
    addShop:title+'/system/shop/addOrUpdate', //新增门店

    /**用户管理**/
    userList:title+'/system/user/list', //4.42.查询一个用户的所有角色信息

    departmentTreeList:title+'/system/department/tree', //所属部门下拉框

    roleSearchList:title+'/system/role/simple/like', //模糊查询角色列表

    shopSearchList:title+'/system/shop/name/like', //模糊查询角色列表

    userDelete:title+'/system/user/operate/deletion', //删除用户

    userLock:title+'/system/user/operate/lock', //锁定用户

};
export default domain;