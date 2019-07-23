import React,{Component} from 'react'
import {Card,Button,Icon,Table, message,Modal} from 'antd'
import LinkButton from '../../component/link-button';
import { reqCategorys,reqUpdateCategory, reqAddCategory } from '../../api';
import AddUpdateForm from './add-update-form'

export default class Category  extends Component{
     state = {
         categorys:[],
         loading:false,
         showStatus:0,   //0代表不显示，1代表显示添加，2 代表显示修改
     }  

        //初始化所有table列信息的所有数组
     initColums=()=>{
        this. columns = [
            {
            title: '分类的名称',
            dataIndex: 'name',
            // 回调函数 要的是渲染后反出的返回值 render的回调函数接收的是text的值传给name
            //   render: text => <a href="javascript:;">{text}</a>,   
            },
            {
            title: '操作',
            render:
            (category)=><LinkButton onClick={()=>{
                this.category =category; //缓存一下将category暴露到外面
                this.setState({showStatus:2})
            }}>修改分类</LinkButton>
            },
        ];
     }
        //异步获取分类列表更新显示
     getCategorys=async()=>{
      this.setState({loading:true})
      const result = await reqCategorys()
      this.setState({loading:false})
      if(result.status === 0){
           const categorys= result.data;
          this.setState({
            categorys
          })
      }else{
          message.error('获取失败')
      }
     }
     /**
      * 点击确定的回调
      */
     handleOk=() => {
        
        this.form.validateFields( async (err,values)=>{
            if(!err){
               
            const {categoryName} = values
            //发送添加分类的请求
            // const result = await reqAddCategory(categoryName)
            let result
            const {showStatus} =this.state
            if(showStatus === 1){ 
                 result = await reqAddCategory(categoryName)
            }else{
               
                const categoryId= this.category._id 
                 result =await reqUpdateCategory({categoryId,categoryName})
            }
            this.form.resetFields()
            this.setState({showStatus:0})
            const action = showStatus ===1 ? '添加':'修改'
            if(result.status === 0){
                this.getCategorys();
                message.success(action+'添加分类成功')
            }else {
                message.error(action+'添加分类失败')
            }

            }
        })
       
     }
      /**
         * 点击取消
         */
     handleCancel=()=>{
             this.form.resetFields();
            this.setState({
                showStatus: 0
             } )
     }

     componentWillMount(){
        this.initColums()
    }
     componentDidMount(){
            this.getCategorys()
    }

    render(){ 
        const {categorys,loading,showStatus } = this.state;
        const category = this.category || {} ;
        const extra=(
            <Button type="primary" onClick={()=>{this.setState({showStatus:1})}}>
                 <Icon type="plus"/>
                添加
            </Button>
         )
        return (
                <Card  extra={extra} style={{marginTop:"16px" ,height:"50%"}}>
             <Table
                rowKey="_id"
                bordered
                loading={loading}
                columns={this.columns}   //列
                dataSource={categorys}  //数据源
                pagination={{defaultPageSize:5,showQuickJumper:true}}
            />
             <Modal
                title={showStatus===1?"添加分类":"修改分类"}
                visible={showStatus !== 0}   //显示
                onOk={this.handleOk}  //点击确定
                onCancel={this.handleCancel}// 点击取消
                >
                <AddUpdateForm setForm={form => this.form =form } categoryName={category.name} /> 
                </Modal>
            </Card>
        )
    }
} 