  /**门店管理**/
  const title='';
  const shopDomain ={
    /**门店管理**/
    shopList:title+'/system/shop/list', //查询门店列表

    shopDetail:title+'/system/shop/detail',//查询门店详情

    shopDelete:title+'/system/shop/delORecover', //删除门店

    areaList:title+'/system/region/lists', //省市县下拉
    
    companyList:title+'/system/organization/name/like', //公司名称

    shopUserList:title+'/system/user/inShop', //查询门店用户

    shopMangerList:title+'/system/user/name/like', //查询区域经理
    
    addShop:title+'/system/shop/addOrUpdate', //新增门店

    shopPhoto:title+'/system/shop/certificates',//查询门店照片

    addressList:title+'/system/shop/receivingAddress', //查询收货地址信息

    remittanceAccountList:title+'/system/shop/remittanceAccount', //查询回款账户信息

    invoiceInfoList:title+'/system/shop/invoiceInfo', //查询开票账户信息
  }
  export default shopDomain;