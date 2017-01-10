import 'react-native';
import React from 'react';
import SignIn from '../lib/components/SignIn.js';
import renderer from 'react-test-renderer';
import {expect, assert} from 'chai';
import {shallow} from 'enzyme';
import Jest from 'jest';
import sinon from 'sinon';

describe('SignIn', () => {
  it('its state is an object', () => {
    wrapper = shallow(<SignIn />);
    assert.isObject(wrapper.state(), 'is an object');
  })
  it('has a sign in button that can be clicked', () => {
    let onClick = sinon.spy()
    const wrapper = mount(<SignIn />)
    wrapper.find('TouchableHighlight').simulate('change')
    expect(onClick).to.have.property('callCount', 1)
  })
    it('should change message state on onChange', () => {
    const wrapper = mount(<SignIn />);
    const input = wrapper.find('TextInput');
    input.simulate('change', {target: {value: 'bla'}});
    expect(wrapper.state('email')).to.equal('bla');
  })
})
