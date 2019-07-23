//暴露所有接口
import ajax from './ajax'
import jsonp from 'jsonp'

import { message } from 'antd';
 
const BASE=''

export const reqLogin =(username,password)=> (
    // ajax(
    // {
    //     method:"post",
    //     url:BASE+"/login",
    //     // data:{
    //     //     username,
    //     //     password
    //     // }
    //     data:qs.stringify({username,password})
    // }
    ajax.post(BASE+"/login",{username,password})
// )
)
 
// const name="admin"
// const pwd="admin"

// reqLogin(name,pwd).then(response=>{
   
//     const result = response
//     console.log("请求成功了",result)
// },error=>{
//     alert("请求失败了",error.message)
// })
export const reqWeather = (city)=>{
    return new Promise((resolve,reject)=>{  //执行器函数：用来执行内部任务--发送请求
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(error,data)=>{
            if(!error&&data.error===0){ //成功的
                const{dayPictureUrl, weather}=data.results[0].weather_data[0]
                resolve({dayPictureUrl, weather})
            }else{
                message.error('获取天气信息失败！！')// 不需要返回错误 直接处理显示
            }
        })
    })
     
}
export const reqCategorys =()=>ajax(BASE+'/manage/category/list')

//添加分类
export const reqAddCategory = (categoryName)=>ajax.post(BASE+'/manage/category/add',{
    categoryName
})
//修改分类
export const reqUpdateCategory = ({categoryId,categoryName})=>ajax.post(BASE+'/manage/category/update',{
    categoryId,
    categoryName
})
export const reqPruducts = (pageNum,pageSize)=>ajax( BASE + '/manager/product/list',{
    params:{  //包含所有query参数的对象
        pageNum,
        pageSize
    }
})