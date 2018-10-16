import {Component} from 'react';
import axios from 'axios';
import Qs from 'qs'
import domain from '../../domain/domain'

//获取穿梭框左边的name值
class TransferLeft extends Component{
    static getName(keys,mockData,type){
        let name=[];
        type=type || '';
        if(keys){
            keys.map((key)=>{
                mockData.map((item)=>{
                    if(key==item.id){
                        if(type==='role'){
                            name.push({isPurchase:item.isPurchase,isArea:item.isArea,isShop:item.isShop,name:item.name,id:item.id});
                        }else{
                            name.push({name:item.name,id:item.id});
                        }

                    }
                });
            });
        }

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
            params: obj.params || ''
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

    static uploadRequest(param,callback){
        let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }
        axios.post(domain.uploadImg, param, config)
        .then(res => {
            let data=res.data;
            if(data.error==0){
                let result=data.result;
                callback(result);
            }
        })
    }
}

//校验
class Check extends Component{
    static  idCard(rule, value, callback){
        let code=value;
        let city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",
            22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",
            36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",
            50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",
            64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        let tip;

        if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
            tip = "身份证号格式错误";
        }

        else if(!city[code.substr(0,2)]){
            tip = "身份证地址编码错误";
        }
        else{
            //18位身份证需要验证最后一位校验位
            if(code.length == 18){
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                let factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                //校验位
                let parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                let sum = 0;
                let ai = 0;
                let wi = 0;
                for (let i = 0; i < 17; i++)
                {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                let last = parity[sum % 11];
                if(parity[sum % 11] != code[17]){
                    tip = "身份证校验位错误";
                }
            }
        }
        callback(tip); // 校验通过
    }
}

//获取url的参数
class GetQueryString extends Component{
    static getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r != null) return unescape(decodeURI(r[2]));
        return null;
    }
}

export {TransferLeft,HttpRequest,Check,GetQueryString} ;







