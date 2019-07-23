import React,{Component} from 'react'
import {Modal} from 'antd'
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuconfig'
import memotyUtils from '../../Utils/memotyUtils'
import storageUtil from '../../Utils/storageUtil'
import {formateDate} from '../../Utils/dateUtils'
import {reqWeather} from '../../api'
import LinkButton from '../../component/link-button'
import './index.less'


 class Header  extends Component{
     state = {
         currentTime:Date.now(),
         dayPictureUrl:'', // 天气图片
          weather:''  //天气文本
     }

    //退出登录
    logout=()=>{

            Modal.confirm({
                //配置对象
                content: '确认退出吗',
                onOk:()=> {
                  storageUtil.removeUser();
                  memotyUtils.user={};
                  //跳转登录界面
                  this.props.history.replace('/login')
                  
                },
                onCancel() {
                  console.log('取消');
                },
              })
    }
    getTitle = ()=>{
        let title ='';
        const path = this.props.location.pathname;
        menuList.forEach(item=>{
            if(item.key===path){
                title = item.title;
            }else if(item.children){
                const cItem = item.children.find(cItem=>cItem.key === path)
                if(cItem){
                    title =cItem.title
                }

            }
        })
       return title;

    }
    getWeather = async()=>{
       const {dayPictureUrl, weather} = await reqWeather('北京')
       this.setState( {dayPictureUrl, weather})
    }
    // 异步操作 更新时间
    componentDidMount(){
    this.setInter=    setInterval(()=>{
            this.setState({currentTime : Date.now()})
        },1000)
        this.getWeather();

    }
    
    componentWillUnmount(){
        
            clearInterval(this.setInter)
    }

    
    render(){
        const user = memotyUtils.user;
        const  title = this.getTitle();
        const { currentTime, dayPictureUrl, weather } = this.state;
        return (
            <div className="header">
               <div className="header-top">
                   欢迎，{user.username} &nbsp;&nbsp;
                   {/* <a href="javascript:;" onClick={this.logout}>退出</a> */}
                   <LinkButton onClick={this.logout}>退出</LinkButton>
               </div>
               <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span >{formateDate(currentTime)}</span>
                        <img src={dayPictureUrl} alt="weather"/>
                        <span>{weather}</span>
                    </div>
               </div>
            </div>
        )
    }
}
//包装函数 使Header变成一个路由组件 onOk函数中的this指向 Header 的实例
export default withRouter(Header);