  /**区域管理**/
  const title='';
  const areaDomain ={
    // areaTreeList:title+'/system/area/tree', //获取区域树
    areaDetail:title+'/system/area/detail', //获取某个区域详情
    dragArea:title+'/system/area/move/to', //移动区域树上的节点
    areaEdit:title+'/system/area/addOrUpdate', //新增区域
    areaDelete:title+'/system/area/operate/deletion', //删除区域
    areaRegion:title+'/system/area/getNoSelectRegion', //获取区域中未被绑定的region
  }
  export default areaDomain;