import React, { Component } from "react";
import { Form, Input, Tree } from "antd";
import menus from '../../../components/home/shux'


const Item = Form.Item;
const { TreeNode } = Tree;

const treeData = [
  {
    title: '平台权限',
    key: 0,
    children: menus.map( (item) => {
      if (item.child) {
        return {
          title: item.value,
          key: item.path,
          children: item.child.map( (childItem) => {
            return {
              title: childItem.value,
              key: childItem.path
            }
          })
        }
      } else {
        return {
          title: item.value,
          key: item.path
        }
      }
    })
  }
]

@Form.create()
class UpdateRoleForm extends Component {
  state = {
    expandedKeys: [],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: []
  };

  onCheck = checkedKeys => {
    this.setState({ checkedKeys });
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });

  render() {
    const { form:{getFieldDecorator},role:{name,menus} } = this.props;

    return (
      <Form>
        <Item label="角色名称">
          {getFieldDecorator("name", {
            initialValue: name
          })(<Input placeholder="请输入角色名称" disabled />)}
        </Item>
        <Item>
          {getFieldDecorator("menus",{
            trigger: "onCheck", //事件触发时，收集子节点的值
            valuePropName: 'checkedKeys', //子节点的值的属性
            initialValue: menus
          })(
            <Tree
            checkable
            onCheck={this.onCheck}
            defaultExpandAll={true}
          >
            {this.renderTreeNodes(treeData)}
          </Tree>
          )}
        </Item>
      </Form>
    );
  }
}

export default UpdateRoleForm;
