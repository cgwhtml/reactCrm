import React , {Component} from 'react';
import axios from 'axios';
import Qs from 'qs'

//获取穿梭框左边的name值
class TransferLeft extends Component{
    static getName(keys,mockData){
        let name=[];
        keys.map((key)=>{
            mockData.map((item)=>{
                if(key==item.id){
                    name.push(item.name);
                }
            });
        });
        return name;
    }
}

//axios
class HttpRequest extends  Component{
    static getRequest(obj,callback){
        /**
            obj参数为一个对象
            obj={
                url:'请求地址',
                method :'请求类型',
                data:'请求数据-对象格式',(POST、PUT或者PATCH)
                params:'发送请求的查询参数对象'(GET)
            }
         callback:'回调函数'
         * */
        axios({
            method: 'get',
            url: obj.url,
            params: obj.params
        })
            .then((res)=>{
                let data=res.data
                if(data.error==0){
                    let result=data.result;
                    callback(result);
                }
            });
    }
    static postRequest(obj,callback){
        /**
         obj参数为一个对象
         obj={
                url:'请求地址',
                method :'请求类型',
                data:'请求数据-对象格式',(POST、PUT或者PATCH)
                params:'发送请求的查询参数对象'(GET)
            }
         callback:'回调函数'
         * */
        axios({
            headers: {
                'deviceCode': 'A95ZEF1-47B5-AC90BF3'
            },
            method: 'post',
            url: obj.url,
            data: Qs.stringify(obj.data)
        })
            .then((res)=>{
                let data=res.data;
                if(data.error==0){
                    let result=data.result;
                    callback(result);
                }
            });
    }
}


export {TransferLeft,HttpRequest} ;







