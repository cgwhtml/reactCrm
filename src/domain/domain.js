
// const title='192.168.60.45:9002';
const title='';
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

    shopPhoto:title+'/system/shop/certificates',//查询门店照片

    addressList:title+'/system/shop/receivingAddress', //查询收货地址信息

    remittanceAccountList:title+'/system/shop/remittanceAccount', //查询回款账户信息

    invoiceInfoList:title+'/system/shop/invoiceInfo', //查询开票账户信息

    /**用户管理**/
    userList:title+'/system/user/list', //4.42.查询一个用户的所有角色信息

    departmentTreeList:title+'/system/department/tree', //所属部门下拉框

    roleSearchList:title+'/system/role/simple/like', //模糊查询角色列表

    shopSearchList:title+'/system/shop/name/like', //模糊查询角色列表

    userDelete:title+'/system/user/operate/deletion', //删除用户

    userLock:title+'/system/user/operate/lock', //锁定用户

    roles:title+'/system/user/roles', //4.42.查询一个用户的所有角色信息

    brand:title+'/system/user/binding/brand',//4.43.查询一个用户的所有绑定品牌

    tree:title+'/system/area/tree',//区域树

    addOrUpdate:title+'/system/user/addOrUpdate',//4.44.新增用户

    departmentTree:title+'/system/department/tree',//所属部门

    userId:title+'/system/user/id',//4.48.获取用户的唯一自增序列

    userDetail:title+'/system/user/detail',//4.46.查询某个用户详情

    userZonal:title+'/system/user/zonal',//4.49.区域划分参考接口

    passInit:title+'/system/user/init/pass',//重置密码

    /**查询**/
    shopName:title+'/system/shop/name/like',//4.71.查询门店名字包含关
};
export default domain;