
// const title='192.168.60.174:9002';
import orgDomain from './orgDomain';
import userDomain from './userDomain';
import shopDomain from './shopDomain';
import areaDomain from './areaDomain';
import deptDomain from './deptDomain';
import roleDomain from './roleDomain';
const title='';
const commonObj={
    // 公用接口
    routeApi:title+'/system/user/menuData',//路由
    uploadImg:title+'/system/upload/pic',//图片上传
    shopTypeList:title+'/system/code/accurate', //字典表接口
    shopName:title+'/system/shop/name/like',//4.71.查询门店名字包含关
}
const domain=Object.assign({},commonObj,orgDomain,userDomain,shopDomain,areaDomain,deptDomain)

export default domain;

export {roleDomain};