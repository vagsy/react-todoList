import React, { Component } from 'react';

// class TodoItem extends React.Component {
class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  // 子组件如果想和父组件通信，子组件要调用父组件传递过来的方法
  handleDelete() {
    const { index } = this.props;
    this.props.delete(index);
  }

  render() {
    const { content } = this.props;
    return (
      // 子组件通过 props 的形式来接收到父组件传递过来的参数
      // <li onClick={this.handleDelete.bind(this)}>{ this.props.content }</li>
      <li onClick={this.handleDelete}>{ content }</li>
    )
  }
}

export default TodoItem;