import React, { Component } from "react";
import { Card, Button, Table, Radio, Modal } from "antd";
import dayjs from 'dayjs';
import { connect } from 'react-redux';

import AddRoleForm from "./add-role-form";
import UpdateRoleForm from "./update-role-form";
import { getListRolesGory,addRolesGory } from '../../api'
import store from '../../redux/store';
import { updataCategoryAsync } from '../../redux/action-creators/addData';


const RadioGroup = Radio.Group;

@connect(state => state,{updataCategoryAsync})
class Role extends Component {
  state = {
    value: "", //单选的默认值，也就是选中的某个角色的id值
    roles: [], //权限数组
    addRoleModalVisible: false, //是否展示创建角色的标识
    updateRoleModalVisible: false, //是否展示设置角色的标识
    isDisabled: true
  };

  columns = [
    {
      dataIndex: "_id",
      render: id => <Radio value={id} />
    },
    {
      title: "角色名称",
      dataIndex: "name"
    },
    {
      title: "创建时间",
      dataIndex: "createTime"
    },
    {
      title: "授权时间",
      dataIndex: "authTime"
    },
    {
      title: "授权人",
      dataIndex: "authName"
    }
  ];
 
  onRadioChange = e => {
    this.setState({
      value: e.target.value,
      isDisabled: false
    });
  };

  switchModal = (key, value) => {
    return () => {
      this.setState({ [key]: value });
    };
  };

  //创建角色的回调函数
  addRole = () => {
    this.addRoleForm.props.form.validateFields(async (err,values) => {
      if (!err) {
        const {name} = values
        if (name) {
          await addRolesGory(name).then(
            (a) => {
              //刷新页面
              this.setState({
                roles: [...this.state.roles,a]
              })
            }
          )
        }
        //关闭弹框 and 
        this.setState({
          addRoleModalVisible: false,
        })
        //清空弹框
        this.addRoleForm.props.form.resetFields();
      }
    });
  };
  
  //设置角色权限的回调函数
  updateRole = () => {
    this.updateRoleForm.props.form.validateFields(async (err,values) => {
      if (!err) {
        const { menus } = values
        const authName = store.getState().user.user.username
        const roleId = this.state.value
        await this.props.updataCategoryAsync({menus,roleId,authName})
        //清空列表
        this.updateRoleForm.props.form.resetFields()
        //隐藏对话框
        this.setState({
          updateRoleModalVisible: false,
          roles: [...this.state.roles]
        })
      }
    })
  };


  //获取角色列表
  componentDidMount () {
    this.getRoles()
  }
  //获取角色列表的函数
  getRoles = async () => {
    await getListRolesGory().then(
      (res) => {
        res.map( (item) => {
          if (item.authTime) {
            item.authTime = dayjs(item.authTime).format('YYYY/MM/DD HH:mm:ss')
          }
          item.createTime = dayjs(item.createTime).format('YYYY/MM/DD HH:mm:ss')
        })
        this.setState({
          roles: res
        })
      }
    )
  }



  render() {
    const {
      roles, //所有角色数据
      value, //选中角色的_id
      isDisabled,
      addRoleModalVisible,
      updateRoleModalVisible
    } = this.state;

    const role = roles.find( role => role._id === value)

    return (
      <Card
        title={
          <div>
            <Button
              type="primary"
              onClick={this.switchModal("addRoleModalVisible", true)}
            >
              创建角色
            </Button>{" "}
            &nbsp;&nbsp;
            <Button
              type="primary"
              disabled={isDisabled}
              onClick={this.switchModal("updateRoleModalVisible", true)}
            >
              设置角色权限
            </Button>
          </div>
        }
      >
        <RadioGroup
          onChange={this.onRadioChange}
          value={value}
          style={{ width: "100%" }}
        >
          <Table
            columns={this.columns}
            dataSource={roles}
            bordered
            rowKey="_id"
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "15", "20"],
              showQuickJumper: true
            }}
          />
        </RadioGroup>

        <Modal
          title="创建角色"
          visible={addRoleModalVisible}
          onOk={this.addRole}
          onCancel={this.switchModal("addRoleModalVisible", false)}
        >
          <AddRoleForm
            wrappedComponentRef={form => (this.addRoleForm = form)}
          />
        </Modal>

        <Modal
          title="设置角色权限"
          visible={updateRoleModalVisible}
          onOk={this.updateRole}
          onCancel={this.switchModal("updateRoleModalVisible", false)}
          mask={true}
        >
          <UpdateRoleForm
            wrappedComponentRef={form => (this.updateRoleForm = form)}
            role={role}
          />
        </Modal>
      </Card>
    );
  }
}

export default Role;
