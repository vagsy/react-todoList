import React, { Component, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Test from './Test';
import TodoItem from './TodoItem';
import axios from 'axios';

// 定义一个 React 组件
// class App extends React.Component {
class App extends Component {

  constructor(props) {
    super(props);

    // 当组件的 state 或者 props 发生改变的时候，render 函数就会重新执行
    this.state = {
      show: true,
      list: [],
      inputValue: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this); // 提升代码执行性能
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleBtnClick() {
    // this.setState({
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ''
    // });
    // this.setState 是异步函数
    this.setState((prevState) => ({ // prevState 修改数据之前的数据
      list: [...prevState.list, prevState.inputValue],
      inputValue: ''
    }), () => {
      console.log(this.ul.querySelectorAll('li').length);
    });
    // console.log(this.ul.querySelectorAll('li').length); // 运行靠前
  }

  handleInputChange(e) {
    // this.setState({
    //   inputValue: e.target.value
    // });

    // const value = e.target.value;
    // this.setState(() => {
    //   return {
    //     inputValue: value
    //   }
    // });
    const value = this.input.value;
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


  handleToggle() {
    this.setState(() => ({
      show: !this.state.show
    }));
  }

  getTodoItems() {
    return (
      this.state.list.map((item, index) => {
        // 父组件通过属性的形式向子组件传递参数
        // return <TodoItem key={index} content={item} index={index} delete={this.handleDelete.bind(this)} />
        return (
          <TransitionGroup>
            <CSSTransition
              timeout={1000}
              classNames='fade'
              unmountOnExit
              onEntered={(el) => {el.style.color='blue'}}
              appear={true}
              key={index}
            >
              <TodoItem
                index={index}
                content={item}
                delete={this.handleDelete}
              />
            </CSSTransition>
          </TransitionGroup>
        )
      })
    );
  }

  // 在组件即将被挂载到页面的时刻自动执行
  componentWillMount() {
    console.log('componentWillMount');
  }

  // render 函数会被反复的执行
  render() {
    console.log('render')
    // jsx 语法
    return (
      // <div className="App">
      // <React.Fragment>
      <Fragment>
        <label htmlFor="insertArea">输入内容</label>
        {/* <input value={this.state.inputValue} type="text" onChange={this.handleInputChange.bind(this)} /> */}
        <input
          id="insertArea"
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          ref={(input) => {this.input = input}}
        />
        {/* <button onClick={this.handleBtnClick.bind(this)}>add</button> */}
        {/* <button style={{background: 'red'}} onClick={this.handleBtnClick}>add</button> */}
        <button className='red-btn' onClick={this.handleBtnClick}>add</button>
        <ul ref={(ul) => {this.ul = ul}}>
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
        <Test content={this.state.inputValue} />
        <div className={this.state.show ? 'show' : 'hide'}>Element</div>
        <button onClick={this.handleToggle}>toggle</button>
        <CSSTransition
          in={this.state.show}
          timeout={1000}
          classNames='fade'
          unmountOnExit
          onEntered={(el) => {el.style.color='blue'}}
          appear={true}
        >
          <div>CSSTransition</div>
        </CSSTransition>
        {/* <button onClick={this.CSSTransitionToggle}>CSSTransitionToggle</button> */}
      {/* </React.Fragment> */}
      </Fragment>
      // </div> 
    );
  }

  // 组件被挂载到页面之后，自动被执行
  componentDidMount() {
    console.log('componentDidMount');
    axios.get('/api/todolist')
      .then((res) => {
        this.setState(() => ({
          list: [...res.data]
        }));
      })
      .catch(() => {
        // alert('error')
      });
  }

  // 组件被更新之前，它会自动被执行
  shouldComponentUpdate() { // 组件需要更新？
    console.log('shouldComponentUpdate');
    return true;
  }

  // 组件被更新之前，它会自动执行，但是它在 shouldComponentUpdate 之后被执行
  // 如果 shouldComponentUpdate 返回 true 它才执行
  // 如果返回 false ,这个函数就不执行了
  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  // 组件更新完成之后，它会被执行
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }
}

export default App;