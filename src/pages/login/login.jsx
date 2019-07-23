import React,{Component} from 'react'
import { Form, Icon, Input, Button ,message } from 'antd';
import {Redirect} from 'react-router-dom'

import storageUtil from '../../Utils/storageUtil';
import memotyUtils from '../../Utils/memotyUtils'
import './login.less'
import logo from '../../assets/images/logo.png'
import {reqLogin} from '../../api/index'         //引入接口请求函数 分别暴露要用大括号


const Item = Form.Item;

 class  Login extends Component{

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields( async(err,{username,password}) => {
          if(!err){
          const result= await reqLogin(username,password)
          if(result.status===0){
              const user = result.data;
              //保存到local中一
              // localStorage.setItem('user_key',JSON.stringify(user))
              //保存到local中二 
              // storageUtil.saveUser(user)
              //保存到内存中三
                memotyUtils.user=user
                storageUtil.saveUser(user)
                console.log(storageUtil.saveUser)
              //跳转到管理界面
              this.props.history.replace('/')
              message.success('登陆成功！')  
          }else{   //文档有失败的msg
                message.error(result.msg)
          }
            // alert(`发送请求成功,username=${username},password=${password}`)
          } else{
            alert("验证失败")
          }     
        })
       
      };
      //统一表单验证
      validatePwd =(rule,value,callback)=>{
        value = value.trim();
        if(!value) {
          callback('密码必须输入')
        } else if (value.length<4) {
          callback('密码长度不能小于4位')
        } else if (value.length>12) {
          callback('密码长度不能大于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          callback('密码必须是英文、数字或下划线组成')
        } else {
          callback() // 验证通过
        }
      }
    render(){
      
      // const user = JSON.parse(localStorage.getItem('user_key')|| "{ }" );
      const user = memotyUtils.user
      if(user._id){
        return <Redirect to="/"/>
    }
      const form = this.props.form;
      const {getFieldDecorator} =form;

        return( <div className='login'>
            <div className='login-header'>
                <img src={logo} alt="logo"/>
                <h1>后台管理系统</h1>
            </div>
            <div className='login-content'>
                <h1>用户登录</h1>
    <Form onSubmit={this.handleSubmit} className="login-form">
        <Item>
          {

            //包装表单标签 form 使Login组件具有form属性
            getFieldDecorator('username',{
              
              initialValue:'',
              rules:[
               
              ]
            }

            )(<Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />)
          }
            
        </Item>
         <Form.Item>
              {
                getFieldDecorator('password', {
                  initialValue: '', // 初始值
                  rules: [
                    { validator: this.validatePwd}
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
              
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登 陆</Button>
            </Form.Item>
      </Form>
     
            </div>
        </div>
      
      ) 
      }
}
export default Form.create()(Login);