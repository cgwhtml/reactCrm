import React from 'react'
import isomorphicFetch from 'isomorphic-fetch'

function waitTimeout (timeout) {
  return new Promise(
    (resolve, reject) => {
      timeout > 0 && setTimeout(reject, timeout, 'connection timed out')
    }
  )
}

const fetch = ( api = '', request = {}, options = {}) => {
  const {
    original = false,
    printCatchError = true,
    showErrorMessage = true,
    timeout = 0, // 为0时不设制timeout
  } = options
  const url = [api]

  // mode 属性用来决定是否允许跨域请求，以及哪些 response 属性可读
  // same-origin: 同源策略，如果一个请求是跨域的，那么返回一个简单的 error
  // no-cors: default，允许来自 CDN 的脚本、其他域的图片和其他一些跨域资源，但是首先有个前提条件，就是请求的 method 只能是"HEAD"，"GET"或者"POST"
  // cors: 通常用作跨域请求来从第三方提供的API获取数据。这个模式遵守 CORS 协议。
  request.mode = request.mode || 'cors'
  request.credentials = request.credentials || 'include' // Fetch 请求默认是不带 cookie 的，需要设置 fetch(url, {credentials: 'include'})
  // https://segmentfault.com/a/1190000006095018
  // 需要注意的是，如果要发送 Cookie，Access-Control-Allow-Origin 就不能设为*，必须指定明确的、与请求网页一致的域名。同时，Cookie 依然遵循同源政策，只有用服务器域名设置的 Cookie才会上传，其他域名的 Cookie 并不会上传，且原网页代码中的 document.cookie 也无法读取服务器域名下的 Cookie。

  request.headers = Object.assign({}, {
    'Accept': '*/*', // application/json, text/plain, */*
    'Content-Type': 'application/json; charset=UTF-8', // 'application/x-www-form-urlencoded; charset=UTF-8', multipart/form-data, application/json, text/plain
  }, request.headers)
  if (request.headers['Content-Type'] === 'multipart/form-data-import') {
    delete request.headers['Content-Type']
  }


  // 包装一层 promise 做全局消息处理
  const result = new Promise((resolve, reject) => {
    const p = isomorphicFetch(url.join(''), request)

    if (original) {
      // 返回原始的 promise 结果
      p.then(res => resolve(res)).catch(err => reject(err))
    } else {
      p
        .then(res => res.json())
        .then(json => {
          if (!json.success && showErrorMessage) {

            // Notice.danger({
            //   title: `${api}`,
            //   children: (
            //     <div>
            //       <p dangerouslySetInnerHTML={{ __html: `Message: ${json.message}` }}></p>
            //     </div>
            //   ),
            // })
          }

          resolve(json)
        })
        .catch(err => {
          if (printCatchError) {
            console.log(err)
          }

          reject(err)
        })
    }
  })

  return Promise.race([result, waitTimeout(timeout)])
  //Promise.race  promise的用法，  result，waitTimeout这是俩个promise，Promise.race是2个promise结果，哪个结果返回的快就使用哪个promise的返回结果。  结合起来就是做超时处理，如果规定时间result没有返回，就会执行waitTimeout，接口请求超时
}

export default fetch
