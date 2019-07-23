import React,{Component} from 'react'
import {Link ,withRouter} from 'react-router-dom'
import './index.less'
import logo from '../../assets/images/logo.png'
import { Menu, Icon } from 'antd';
import MenuList from '../../config/menuconfig'
const { SubMenu } = Menu;

 class Leftnav  extends Component{

        
        getMenuNodes2 = (MenuList)=>{
                //请求的路径
            const  path = this.props.location.pathname;

            return MenuList.reduce((pre,item)=>{

                if(!item.children){
                    pre.push(
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                            </Link>
                         </Menu.Item>
                    )
                }else{
                    /*
                      判断当前的item的可以是否是我需要的key
                      可查找item的所有children中的cItem的key，看是否有一个跟请求的path匹配
                    */ 
                   const cItem = item.children.find(cItem=>cItem.key === path)
                   if(cItem){
                    this.openKey = item.key
                   }else{

                   }
                   


                    pre.push(
                        <SubMenu key={item.key} 
                        title={
                                <span>
                                    <Icon type={item.icon} />
                                    <span>{item.title}</span>
                                </span>
                            }
                        >
                    {
                        this. getMenuNodes2(item.children)
                    }
                 </SubMenu> 
                    )
                }

                return pre
            },[])
        }


//         getMenuNodes = (MenuList)=>{
           
//             return MenuList.map(item=>{
//                 if(!item.children){
//                     return (
//                         <Menu.Item key={item.key}>
//                     <Link to={item.key}>
//                     <Icon type={item.icon} />
//                     <span>{item.title}</span>
//                     </Link>
//                 </Menu.Item> 
//                     )
//                 }
// else
//                {return(
                
//                     <SubMenu key={item.key} 
//                             title={
//                                     <span>
//                                         <Icon type={item.icon} />
//                                         <span>{item.title}</span>
//                                     </span>
//                                 }
//                             >
//                         {
//                             this. getMenuNodes(item.children)
//                         }
//                      </SubMenu> 
               
//                  )  }
//             }
//             )

//         }

        /**
         * 第一次runder（）之前只执行一次
         * 
         */
        componentWillMount(){
                this.menuNodes = this.getMenuNodes2(MenuList);
        }

    render(){
        //渲染2次标签  后面需要这个渲染标签 --是同步执行
        // const menuNodes = this.getMenuNodes2(MenuList)
        const selectKey  = this.props.location.pathname;
      /**defaultSelectedKeys 默认第一次登陆选中但是当第二次跳转回来时就不会选中
       * selectedKeys 每一次都默认选中当前更新后的key
       */
        return (
            <div className="left-nav">
               <Link to="/home" className='left-nav-link'>
                   <img src={logo} alt='logo'/>
                   <h1>硅谷后台</h1>
               </Link>
                   
               <Menu mode="inline" theme="dark" selectedKeys={[selectKey ]} 
                    defaultOpenKeys={[this.openKey]}
               >
                   {
                           this.menuNodes
                   }       
                </Menu>
                    </div>
        )
    }
}
//想外暴露 使用 高阶组件withRouter() 来包装非路由组件 向非路由组件 Leftnav 传递
  //  history/location/match   使Leftnav 可以操作路由的相关语法
export default withRouter(Leftnav);