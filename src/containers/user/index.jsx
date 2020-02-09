import React, { Component } from "react";
import { Card, Button, Table, Modal,message } from "antd";
import dayjs from "dayjs";

import AddUserForm from "./add-user-form";
import UpdateUserForm from "./update-user-form";
import { getListUser,addUser,delUserGory,getListRolesGory,modifyUserGory } from '../../api';
import Modify from './modify';

class User extends Component {
  state = {
    users: [], //用户数组
    addUserModalVisible: false, //是否展示创建用户的标识
    updateUserModalVisible: false, //是否展示更新用户的标识
    zongName: [],
    visible: false,
    username: ''
  };

  columns = [
    {
      title: "用户名",
      dataIndex: "username"
    },
    {
      title: "邮箱",
      dataIndex: "email"
    },
    {
      title: "电话",
      dataIndex: "phone"
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
      render: time => dayjs(time).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      title: "所属角色",
      dataIndex: "roleId"
    },
    {
      title: "操作",
      render: user => {
        return (
          <div>
            <Button type="link" onClick={() => {this.modifyUser(user)}}>
              修改
            </Button>
            <Button type="link" onClick={() => {this.delUser(user)}}>
              删除
            </Button>
          </div>
        );
      }
    }
  ];

  componentDidMount () {
    getListRolesGory().then( (res) => {
      this.setState({
        zongName: res.map( (item) => {
          return item.name
        })
      })
    })

    getListUser().then(
      (res) => {
        this.setState({
          users: res
        })
      }
    )
  }

  //修改密码
  modifyUser = (user) => {
    const { username } = user
    
    this.setState({
      visible: true,
      username
    });    
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.modifyfrom.props.form.validateFields(async (err,values) => {
      if (!err) {
        const {password,okpassword} = values
        if (password === okpassword) {
          const {username} = this.state
          modifyUserGory({username,password})
        }
      }
    })

    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  //删除用户名
  delUser = (user) => {
    delUserGory(user.username)
    this.state.users.forEach( (item,index) => {
      if (user.username === item.username) {
        const aaa = [...this.state.users]
        aaa.splice(index,1)
        this.setState({
          users: aaa
        })
      }
    })
  }

  // 创建用户的回调函数
  addUser = () => {
    this.addUserForm.props.form.validateFields(async (err,values) => {
      if (!err) {
        const {username,password,phone,email,roleId} = values
        
        if (username||password||phone||email||roleId) {
          const a = this.state.zongName[roleId]
          addUser({username,password,phone,email,a})
          .then( (res) => {
            this.setState({
              users: [...this.state.users,res]
            })
          })
          //关闭弹框 and 
          this.setState({
            addUserModalVisible: false,
          })
          //清空弹框
          this.addUserForm.props.form.resetFields();
          
        } else {
          message.error('请完善个人信息');
        }
      }      
    })
  };

  // 更新用户的回调函数
  updateUser = () => {};

  switchModal = (key, value) => {
    return () => {
      this.setState({
        [key]: value
      });
    };
  };

  render() {
    const { users, addUserModalVisible, updateUserModalVisible } = this.state;

    return (
      <Card
        title={
          <Button
            type="primary"
            onClick={this.switchModal("addUserModalVisible", true)}
          >
            创建用户
          </Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={users}
          bordered
          rowKey="_id"
          pagination={{
            defaultPageSize: 15,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15", "20"],
            showQuickJumper: true
          }}
        />

        <Modal
          title="创建用户"
          visible={addUserModalVisible}
          onOk={this.addUser}
          onCancel={this.switchModal("addUserModalVisible", false)}
        >
          <AddUserForm
            wrappedComponentRef={form => (this.addUserForm = form)}
          />
        </Modal>

        <Modal
          title="更新用户"
          visible={updateUserModalVisible}
          onOk={this.updateUser}
          onCancel={this.switchModal("updateUserModalVisible", false)}
        >
          <UpdateUserForm
            wrappedComponentRef={form => (this.updateUserForm = form)}
          />
        </Modal>
        
        <Modal
          title="修改密码"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Modify 
            wrappedComponentRef={form => (this.modifyfrom = form)}
          />
        </Modal>
      </Card>
    );
  }
}
export default User;
