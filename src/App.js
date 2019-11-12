import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  state = {
    on: false,
    input: '',
    mainColor: 'blue',
    lifeCycle: '',
  }

  componentDidMount() {
    this.setState({ lifeCycle: 'componentDidMount'})
  }
  componentWillReceiveProps() {
    this.setState({ lifeCycle: 'componentWillReceiveProps'})
  }
  handleStrings(str) {
    if (str === 'Hello World') {
      return true
    } else {
      return false
    }

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <h1>Welcome to React</h1>
          <h3 className={this.state.mainColor}>Everyone is welcome!</h3>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React Now!
          </a>
          <p className='button-state'>{this.state.on ? 'Yes!': 'No!'}</p>
          <button onClick={() => this.setState({ on: true })}>Click</button>
          <h2>{this.state.input}</h2>
          <input onChange={(e) => this.setState({ input: e.currentTarget.value })}/>
          <p className='lifeCycle'>{this.state.lifeCycle}</p>
        </header>
      </div>
    );
  }
}

export class Link extends Component {
  render() {
    return this.props.hide ? null : <a href={this.props.address}>Click</a>
  }
}

export default App;
