import React, { Component } from 'react';
import {Card,Table,Select,Input,Button,Icon, message} from 'antd';
import { reqGetProducts,goodsStateGory,searchGoodsGory } from '../../api/index';
import './index.less';

export default class Product extends Component {

  state = {
    products:[], //文本内容
    total: 0, //文本长度
    status: '',
    searchType: 'productName', //搜索状态
    nowValue: '', //当前搜索框的内容
    searchValue: '', //搜索内容
    current: 1
  }

  columns = [
    {
      title: '商品名称',
      dataIndex: 'name'
    },
    {
      title: '商品描述',
      dataIndex: 'desc'
    },
    {
      title: '价格',
      dataIndex: 'price'
    },
    {
      title: '状态',
      render: (item) => {
        return <div>
          <Button type="primary" onClick={this.goodsState(item)}>
            {item.status === 1 ? '上架' : '下架'}
          </Button>
          {item.status === 1 ? '已下架' : '已上架'}
        </div>
      }
    },
    {
      title: '操作',
      render: (goods) => {
        return <div>
          <Button type="link" onClick={this.GoodsDetails(goods)}>详情</Button>
          <Button type="link" onClick={this.Modify(goods)}>修改</Button>
        </div>
      }
    },
  ]

  //更新状态
  goodsState = (item) => {
    const status = 3-item.status
    const productId = item._id
    return () => {
      goodsStateGory({status,productId}).then( () => {
        message.success('数据更新成功')
        this.setState({
          products: this.state.products.map( (i) => {
            if (i._id === productId) {
              return {...i,status}
            }
            return i
          })
        })        
      })
    }
  }
  //商品详情
  GoodsDetails = (goods) => {
    return () => {
      this.props.history.push('/product/detail',goods)
    }
  }
   //修改商品
   Modify = (goods) => {
    return () => {
      this.props.history.push('/product/saveupdate',goods)
    }
  }
  //添加商品
  showAddCategoryForm = () => {
    this.props.history.push('/product/add')
  }

  //发送Ajax请求当前页面数据
  getProducts = async (pageNum,pageSize) => {
    this.setState({
      current: pageNum
    })
    
    const { searchValue,searchType } = this.state
    if (searchValue) {
      await searchGoodsGory({searchType,searchValue,pageNum,pageSize})
      .then( (res) => {
        const { total,list } = res
        this.setState({
          products:list,
          total: total
        })
      })
    } else{
      const result = await reqGetProducts(pageNum,pageSize)
      this.setState({
        products: result.list,
        total: result.total
      })
    }   
  }

  //组件挂载完毕，发送Ajax请求
  componentDidMount() {
    this.getProducts(1,3)
  }

  //改变搜索状态
  selectChange = (e) => {
    this.setState({
      searchType: e
    })
  }
  //搜索框内容
  inputChange = (e) => {
    this.setState({
      nowValue: e.target.value.trim()
    })
  }
  //搜索框按钮
  searchBtn = async () => {

    await this.setState({
      searchValue: this.state.nowValue
    })

    const pageNum = 1,pageSize = 3
    const { searchType,searchValue } = this.state
    await searchGoodsGory({searchType,searchValue,pageNum,pageSize})
    .then( (res) => {
      const { total,list } = res
      this.setState({
        products:list,
        total: total,
        current: 1
      })
    })
  }

  render() {
    const {products,total,searchType,current} = this.state
    //展示数据方式
    return (
      <Card
        title={
          <div>
            <Select value={searchType} onChange={this.selectChange}>
              <Select.Option value="productName">根据商品名称</Select.Option>
              <Select.Option value="productDesc">根据商品描述</Select.Option>
            </Select>
            <Input placeholder="关键字" className="search-input" onChange={this.inputChange} />
            <Button type="primary" onClick={this.searchBtn}>搜素</Button>
          </div>
        }
        extra={
          <Button type="primary" onClick={this.showAddCategoryForm}>
            <Icon type="plus"/>
            添加商品
          </Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={products}
          bordered
          rowKey="_id"
          pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ['3','6','9','12'],
              defaultPageSize: 3,
              total,
              onChange: this.getProducts,  //按钮
              onShowSizeChange: this.getProducts,  //长度
              current
            }}
         />
      </Card>
    )
  }
}
