  /**门店管理**/
  const title='';
  const userDomain ={
        /**用户管理**/
        userList:title+'/system/user/list', //4.42.查询一个用户的所有角色信息

        departmentTreeList:title+'/system/department/tree', //所属部门下拉框
    
        roleSearchList:title+'/system/role/simple/like', //模糊查询角色列表
    
        shopSearchList:title+'/system/shop/name/like', //模糊查询角色列表
    
        userDelete:title+'/system/user/operate/deletion', //删除用户
    
        userLock:title+'/system/user/operate/lock', //锁定用户
    
        roles:title+'/system/user/roles', //4.42.查询一个用户的所有角色信息

        allRole:title+'/system/role/all/roles', //4.42.查询全部角色信息
    
        brand:title+'/system/user/binding/brand',//4.43.查询一个用户的所有绑定品牌
    
        tree:title+'/system/area/tree',//区域树
    
        addOrUpdate:title+'/system/user/addOrUpdate',//4.44.新增用户
    
        departmentTree:title+'/system/department/tree',//所属部门
    
        userId:title+'/system/user/id',//4.48.获取用户的唯一自增序列
    
        userDetail:title+'/system/user/detail',//4.46.查询某个用户详情
    
        userZonal:title+'/system/user/zonal',//4.49.区域划分参考接口
    
        passInit:title+'/system/user/init/pass',//重置密码
  }
  export default userDomain;