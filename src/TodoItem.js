import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  // 一个组件要从父组件接收参数
  // 只要父组件的 render 函数被重新执行了，子组件的这个生命周期函数就会被执行
  // 如果这个组件第一次存在于父组件中，不会执行
  // 如果这个组件之前已经存在于父组件中，才会执行
  componentWillReceiveProps() {
    console.log('child componentWillReceiveProps');
  }

  // 当这个组件即将被从页面中剔除的时候，会被执行
  componentWillUnmount() {
    console.log('child componentWillUnmount');
  }

  render() {
    const { content, test } = this.props;
    return (
      // 子组件通过 props 的形式来接收到父组件传递过来的参数
      // <li onClick={this.handleDelete.bind(this)}>{ this.props.content }</li>
      // <li onClick={this.handleDelete} dangerouslySetInnerHTML={{__html: content/}}></li>
      <li onClick={this.handleDelete.bind(this)}>{ test } - { content }</li>
    )
  }
}

TodoItem.propTypes = { // 属性校验
  test: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // 类型或
  delete: PropTypes.func,
  index: PropTypes.number
}

TodoItem.defaultProps = { // 属性默认值
  test: 'default test'
}

export default TodoItem;