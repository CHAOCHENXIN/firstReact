import axiosInstance from './request'

export const reqLogin = function (username,password) {
  return axiosInstance({
    method: 'POST',
    url: '/login',
    data: {
      username: username,
      password: password
    }
  })
}

//请求分类列表数据
export const reqGetCategories = function () {
  return axiosInstance({
    method: 'GET',
    url: '/category/get',
  })
}

//添加分类列表数据
export const reqAddCategory = function (categoryName) {
  return axiosInstance({
    method: 'POST',
    url: '/category/add',
    data: {
      categoryName: categoryName
    }
  })
}

//修改分类列表数据
export const requpdataCategory = function (categoryId,categoryName) {
  return axiosInstance({
    method: 'POST',
    url: '/category/update',
    data: {
      categoryId,
      categoryName
    }
  })
}

//删除分类列表数据
export const delCategory = function (categoryId) {
  return axiosInstance({
    method: 'POST',
    url: '/category/delete',
    data: {
      categoryId
    }
  })
}

export const reqGetProducts = function (pageNum,pageSize) {
  return axiosInstance({
    method: 'GET',
    url: '/product/list',
    params: {
      pageNum,
      pageSize
    }
  })
}

// 添加商品
export const addGoods = function ({name,desc,categoryId,price,detail}) {
  return axiosInstance({
    method: 'POST',
    url: '/product/add',
    data: {
      name,
      desc,
      categoryId,
      price,
      detail
    }
  })
}

//修改商品
export const modifyGoods = function ({productId,name,desc,categoryId,price,detail}) {
  return axiosInstance({
    method: 'POST',
    url: '/product/update',
    data: {
      productId,
      name,
      desc,
      categoryId,
      price,
      detail
    }
  })
}

//更新商品状态
export const goodsStateGory = function ({productId,status}) {
  return axiosInstance({
    method: 'POST',
    url: '/product/update/status',
    data: {
      productId,
      status
    }
  })
}

//搜索商品列表
export const searchGoodsGory = function ({searchType,searchValue,pageNum,pageSize}) {
  return axiosInstance({
    method: 'GET',
    url: '/product/search',
    params: {
      [searchType]: searchValue,
      pageNum,
      pageSize
    }
  })
}

//获取角色列表
export const getListRolesGory = function () {
  return axiosInstance({
    method: 'GET',
    url: '/role/get',
  })
}

//添加角色
export const addRolesGory = function (name) {
  return axiosInstance({
    method: 'POST',
    url: '/role/add',
    data: {
      name
    }
  })
}

//更新角色权限
export const changeRolesGory = function ({roleId,authName,menus}) {
  return axiosInstance({
    method: 'POST',
    url: '/role/update',
    data: {
      roleId,
      authName,
      menus
    }
  })
}

//获取用户列表
export const getListUser = function () {
  return axiosInstance({
    method: 'GET',
    url: '/user/get'
  })
}

//添加用户
export const addUser = function ({username,password,phone,email,a}) {
  console.log({username,password,phone,email,a});
  
  return axiosInstance({
    method: 'POST',
    url: '/user/add',
    data: {
      username,
      password,
      phone,
      email,
      roleId: a
    }
  })
}

//删除用户
export const delUserGory = function (username) {
  return axiosInstance({
    method: 'POST',
    url: '/user/delete',
    data: {
      username
    }
  })
}

//更新用户
export const modifyUserGory = function ({username,password}) {
  
  return axiosInstance({
    method: 'POST',
    url: '/user/update',
    data: {
      username,
      password
    }
  })
}