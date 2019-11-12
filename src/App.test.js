import React from 'react';
import ReactDOM from 'react-dom';
import App, { Link } from './App';
import { configure, shallow, mount, unmount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() })

// simple testing example
describe('<App />', () => {
  it('should contain 1 p element', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('.App-logo').exists()).toBe(true)
  })
  it('matches the snapshot', () => {
    const tree = shallow(<App />)
    expect(tree).toMatchSnapshot()
  })
  it('on button click change', () => {
    const wrapper = shallow(<App />)
    const button = wrapper.find('button')
    expect(wrapper.find('.button-state').text()).toBe('No!')
  })
  it('updates className with new State', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('.blue').length).toBe(1)
    expect(wrapper.find('.red').length).toBe(0)
    wrapper.setState({ mainColor: 'red'})
    expect(wrapper.find('.blue').length).toBe(0)
    expect(wrapper.find('.red').length).toBe(1)

  })
  it('on input change, title changes text', () => {
    const wrapper = shallow(<App />)
    const input = wrapper.find('input')
    expect(wrapper.find('h2').text()).toBe('')
    input.simulate('change', {currentTarget: { value: 'Tyler'}})
    expect(wrapper.find('h2').text()).toBe('Tyler')
  })
  it('calls componentDidMount', () => {
    jest.spyOn(App.prototype, 'componentDidMount') // allows us to mockout componentDidMount Method
    const wrapper = shallow(<App />)
    expect(App.prototype.componentDidMount.mock.calls.length).toBe(1)
    expect(wrapper.find('.lifeCycle').text()).toBe('componentDidMount')
  })
  it('setProps calls componentWillReceiveProps', () => {
    jest.spyOn(App.prototype, 'componentWillReceiveProps')
    const wrapper = shallow(<App />)
    wrapper.setProps({ hide: true })
    expect(App.prototype.componentWillReceiveProps.mock.calls.length).toBe(1)
    expect(wrapper.find('.lifeCycle').text()).toBe('componentWillReceiveProps')
  })
  it('handleStrings function returns correctly', () => {
    const wrapper = shallow(<App />)
    const trueReturn = wrapper.instance().handleStrings('Hello World')
    const falseReturn = wrapper.instance().handleStrings('')
    expect(trueReturn).toBe(true)
    expect(falseReturn).toBe(false)
  })
})


// testing props
describe('<Link />', () => {
  it('link component accepts address prop', () => {
    const wrapper = shallow(<Link address='www.google.com' />)
    expect(wrapper.instance().props.address).toBe('www.google.com')
  })
  it('a tag node renders href correctly', () => {
    const wrapper = shallow(<Link address='www.google.com' />)
    expect(wrapper.props().href).toBe('www.google.com')
  })
  it('returns null with true hide prop', () => {
    const wrapper = shallow(<Link hide={false} />)
    expect(wrapper.find('a').length).toBe(1)
    wrapper.setProps({ hide:true })
    expect(wrapper.get(0)).toBeNull()
  })
  // Sometimes our components use event handlers to update state. IN this lesson we'll work with
  // a component that uses an onClick and onCHangehandlers anduse Enzyme to test that
  // the conditinally rendered text updates subsequently
})

// testing fully rendered react components is ideal for react components that interact with
// DOM APIs or require React lifecycles or may require lifecycle methods

describe('<App /> mount rendering', () => {
  it('h1 contains correct text', () => {
    const wrapper = mount(<App />)
    expect(wrapper.find('h1').text()).toBe('Welcome to React')
    wrapper.unmount()
  })
  it('matches the snapshot', () => {
    const tree = mount(<App />)
    expect(toJson(tree)).toMatchSnapshot()
    tree.unmount()
  })
})

// Full dom-rendering requires that a dom api be available at the global scope.
// This means that we must run out tests in an environment that looks like a
// web browser environment. The recommended approach is to use a library called
// js-dom which is a headless browser implemented completely in JS. It's already
// installed with create-react-app
// In full rendering, tests can affect eachother if they are in the same dom
