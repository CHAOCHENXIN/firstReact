import React, { Component } from "react";
import { Form, Input, Select } from "antd";
import { getListRolesGory } from '../../../api';

const Item = Form.Item;
const Option = Select.Option;

@Form.create()
class AddUserForm extends Component {

  state = {
    zongName: []
  }

  componentDidMount () {
    getListRolesGory().then( (res) => {
      this.setState({
        zongName: res.map( (item) => {
          return item.name
        })
      })
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
        <Item label="用户名">
          {getFieldDecorator("username",{
          })(<Input placeholder="请输入用户名" />)}
        </Item>
        <Item label="密码">
          {getFieldDecorator("password")(
            <Input placeholder="请输入密码" type="password" />
          )}
        </Item>
        <Item label="手机号">
          {getFieldDecorator("phone")(<Input placeholder="请输入手机号" />)}
        </Item>
        <Item label="邮箱">
          {getFieldDecorator("email")(<Input placeholder="请输入邮箱" />)}
        </Item>
        <Item label="角色">
          {getFieldDecorator("roleId")(
            <Select placeholder="请选择分类">
              {this.state.zongName.map( (item,index) => {
                return <Option value={index} key={index}>{item}</Option>
              })}
            </Select>
          )}
        </Item>
      </Form>
    );
  }
}

export default AddUserForm;
