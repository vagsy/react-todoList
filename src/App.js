import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';

// 定义一个 React 组件
// class App extends React.Component {
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      inputValue: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this); // 提升代码执行性能
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleBtnClick() {
    // this.setState({
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ''
    // });
    this.setState((prevState) => ({ // prevState 修改数据之前的数据
      list: [...prevState.list, prevState.inputValue],
      inputValue: ''
    }));
  }

  handleInputChange(e) {
    // this.setState({
    //   inputValue: e.target.value
    // });

    const value = e.target.value;
    // this.setState(() => {
    //   return {
    //     inputValue: value
    //   }
    // });
    this.setState(() => ({
      inputValue: value
    }))
  }

  handleDelete(index) {
    // immutable
    // state 不允许我们做任何的改变

    // const list = [...this.state.list]; // list 拷贝
    // list.splice(index, 1);
    // this.setState({
    //   list
    // });
    this.setState((prevState) => {
      const list = [...prevState.list];
      list.splice(index, 1);
      return { list };
    });
  }

  getTodoItems() {
    return (
      this.state.list.map((item, index) => {
        // 父组件通过属性的形式向子组件传递参数
        // return <TodoItem key={index} content={item} index={index} delete={this.handleDelete.bind(this)} />
        return (
          <TodoItem
            key={index}
            index={index}
            content={item}
            delete={this.handleDelete}
          />
        )
      })
    );
  }

  render() {
    // jsx 语法
    return (
      // <div className="App">
      // <React.Fragment>
      <Fragment>
        <label htmlFor="insertArea">输入内容</label>
        {/* <input value={this.state.inputValue} type="text" onChange={this.handleInputChange.bind(this)} /> */}
        <input id="insertArea" value={this.state.inputValue} type="text" onChange={this.handleInputChange} />
        {/* <button onClick={this.handleBtnClick.bind(this)}>add</button> */}
        {/* <button style={{background: 'red'}} onClick={this.handleBtnClick}>add</button> */}
        <button className='red-btn' onClick={this.handleBtnClick}>add</button>
        <ul>
          {/* {
            this.state.list.map((item, index) => {
              // 父组件通过属性的形式向子组件传递参数
              // return <TodoItem key={index} content={item} index={index} delete={this.handleDelete.bind(this)} />
              return (
                <TodoItem
                  key={index}
                  index={index}
                  content={item}
                  delete={this.handleDelete}
                />
              )
            })
          } */}
          { this.getTodoItems() }
        </ul>
      {/* </React.Fragment> */}
      </Fragment>
      // </div>
    );
  }
}

export default App;