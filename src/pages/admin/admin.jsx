import React,{Component} from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import { Layout } from 'antd';

import memotyUtils from '../../Utils/memotyUtils'
import LeftNav from '../../component/left-nav'
import Header from '../../component/header'
import Home from '../home/home'

import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Category from '../category/category'
// import storageUtil from '../../Utils/storageUtil';
const {Footer, Sider, Content } = Layout;


export default class  Admin extends Component{
    render(){
        //第一种 获取本地储存
    //    const user = JSON.parse(localStorage.getItem('user_key')|| "{ }" );
        //第二种 获取本地储存
    // const user = storageUtil.getUser()
    const user = memotyUtils.user 
        if(!user._id){
            return <Redirect to="/login"/>
        }
        return (
            <Layout style={{height:"100%"}}>
                <Sider><LeftNav/></Sider>
                    <Layout>
                        <Header>Header</Header>  
                        <Content>
                            <Switch style={{margin:"20px"}}>
                                <Route path='/home' component={Home}/>
                                <Route path='/category' component={Category}/>
                                <Route path='/product' component={Product}/>
                                <Route path='/user' component={User}/>
                                <Route path='/role' component={Role}/>
                                <Route path="/charts/bar" component={Bar}/>
                                <Route path="/charts/pie" component={Pie}/>
                                <Route path="/charts/line" component={Line}/>
                                <Redirect to='/home'/>
                            </Switch>  
                        </Content>
                        <Footer style={{textAlign:"center",color:"rgba(75,65,15,0.5)"}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                    </Layout>
            </Layout>
        )
    }
}