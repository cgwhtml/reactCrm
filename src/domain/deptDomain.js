  /**组织机构管理**/
  const title='';
  const areaDomain ={
    deptTreeList:title+'/system/department/tree', //获取组织机构树
    deptDetail:title+'/system/department/detail', //获取某个组织详情
    dragDept:title+'/system/department/move/to', //移动部门树上的节点
    deptEdit:title+'/system/department/addOrUpdate', //新增或更新某个组织机构
    deptDelete:title+'/system/department/operate/deletion', //删除某个组织机构
  }
  export default areaDomain;