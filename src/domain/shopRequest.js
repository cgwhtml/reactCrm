import {HttpRequest} from '../utils/js/common'
import domain from './domain';
import axios from 'axios';

// 门店管理
export  const shopList = (pageCur,pageSize) => {
  axios.get(domain.shopList,{
      params:{
          pageCur:pageCur,
          pageSize:pageSize
      }
  }).then(res=>{
    if(res.data.result && res.data.result.data){
      res.data.result.data.map(item=>{
          item.joinShopRegion=item.joinShopRegion.map(items=>{
              return items.region    
          }).join(",")
          item.isDeleteName=item.isDelete==0?'未删除':'已删除'
      })
      return res.data.result;
    }
  });
  return res.data.result;
}
export  const userList = (pageCur,pageSize) => {
  // return fetch( `/system/user/role/list?pageCur=${pageCur}${pageSize ? `&pageSize=${pageSize}` : ''}`, {
  //   method: 'get',
  // })
}