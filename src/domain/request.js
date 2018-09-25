import fetch from '../utils/js/fetch'

// const title='http://localhost:8088';
// 删除用户管理
export  const shopList = (pageCur,pageSize) => {
    return fetch( `/system/shop/list?pageCur=${pageCur}${pageSize ? `&pageSize=${pageSize}` : ''}`, {
      method: 'get',
    })
  }
// const domain = {

//     /**门店管理**/
//     roles:title+'/system/user/roles', //4.42.查询一个用户的所有角色信息

//     /**用户管理**/
// };
// export default domain;