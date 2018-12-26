  /**区域管理**/
  const areaDomain ={
    areaTreeList:'/system/area/tree', //获取区域树
    areaDetail:'/system/area/detail', //获取某个区域详情
    areaRegionList:'/system/area/region/list', //获取某个区域绑定的行政区划
    dragArea:'/system/area/move/to', //移动区域树上的节点
    areaEdit:'/system/area/addOrUpdate', //新增区域
    areaDelete:'/system/area/operate/deletion', //删除区域
    areaRegion:'/system/area/getNoSelectRegion', //获取区域中未被绑定的region
  }
  export default areaDomain;