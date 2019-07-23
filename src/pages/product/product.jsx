import React,{Component} from 'react'
import {Card,Select,Input,Icon,Table,Button} from 'antd'
import {reqPruducts} from '../../api'
import LinkButton from '../../component/link-button'



export default class Product  extends Component{
    state={
        loading:false,
        total:0,
        products:[
            {
                "status": 1,
                "imgs": [
                    "image-1559402396338.jpg"
                ],
                "_id": "5ca9e05db49ef916541160cd",
                "name": "联想ThinkPad 翼4809",
                "desc": "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
                "price": 65999,
                "categoryId": "5ca9db9fb49ef916541160cc",
                "detail": "<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span> 222</p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">99999</span></p>\n",
                "__v": 0
            },
            {
                "status": 1,
                "imgs": [
                    "image-1559402448049.jpg",
                    "image-1559402450480.jpg"
                ],
                "_id": "5ca9e414b49ef916541160ce",
                "name": "华硕(ASUS) 飞行堡垒",
                "desc": "15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)",
                "price": 6799,
                "categoryId": "5ca9db8ab49ef916541160cb",
                "detail": "<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">华硕(ASUS) 飞行堡垒6 15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)火陨红黑</span>&nbsp;</p>\n<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">【4.6-4.7号华硕集体放价，大牌够品质！】1T+256G高速存储组合！超窄边框视野无阻，强劲散热一键启动！</span>&nbsp;</p>\n",
                "__v": 0
            },
            {
                "status": 2,
                "imgs": [
                    "image-1559402436395.jpg"
                ],
                "_id": "5ca9e4b7b49ef916541160cf",
                "name": "你不知道的JS（上卷）",
                "desc": "图灵程序设计丛书： [You Don't Know JS:Scope & Closures] JavaScript开发经典入门图书 打通JavaScript的任督二脉",
                "price": 35,
                "categoryId": "5ca9d6c9b49ef916541160bc",
                "detail": "<p style=\"text-align:start;\"><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">图灵程序设计丛书：你不知道的JavaScript（上卷）</span> <span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\"><strong>[You Don't Know JS:Scope &amp; Closures]</strong></span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(227,57,60);background-color: rgb(255,255,255);font-size: 12px;\">JavaScript开发经典入门图书 打通JavaScript的任督二脉 领略语言内部的绝美风光</span>&nbsp;</p>\n",
                "__v": 0
            }
        ]

    }
    initColums =()=>{
        this.columns = [
            {
                title:"商品名称",
                dataIndex:"name",
            },{
                title:"商品描述",
                dataIndex:"desc",
            },{
                title:"价格",
                dataIndex:"price",
                render:(price)=>'¥'+ price
            },{
                title:"状态",
                width:100,
                dataIndex:"status",
                render:(status)=>{
                    let btnText='下架'
                    let text = '  在售'
                    if(status === 2){
                        btnText = '上架'
                        text='已下架'
                    }
                   return(
                    <span>
                    <button>{btnText}</button><br/>
                    <span>{text}</span>
                   </span>
                   )
                }
            },{
                title:"操作",
                render:(price)=>(
                    <span>
                        <LinkButton>详情</LinkButton>
                        <LinkButton>修改</LinkButton>
                    </span>
                )
            }
        ]

    }
    componentWillMount(){
        this.initColums()
    }
    getProducts = async (pageNum)=>{
      const result =  await reqPruducts(pageNum,2)
      if(result.status === 0){ //说明是data数据
            const {total,list} = result.data
            this.setState({
                products:list,
                total
            })

      }

    }
    componentDidMount(){
        this.getProducts(1)
    }
    render(){
        const {loading,products,total} = this.state;
        const title=(
            <span>
                <Select style={{width:"200px"}} value="2">
                    <option value='1'>按名称搜索</option>
                    <option value="2">按描述搜索</option>
                </Select>
                <Input style={{width:"200px",margin:"0 10px" }} placeholder="请输入关键字"/>
                <Button type="primary">搜索</Button>
            </span>
        )
        const  extra=(
            <Button type="primary">
                <Icon type="plus">
                    添加商品
                </Icon>
            </Button>
        )
        return (
           <Card title={title} extra={extra}>
                 <Table
                    bordered
                    loading={loading}
                    rowkey="_id"
                    columns={this.columns}   //列
                    dataSource={products}  //数据源
                    pagination={{total,defaultPageSize:2,showQuickJumper:true,onChange:this.getProducts}}
                />
           </Card>
        )
    }
}