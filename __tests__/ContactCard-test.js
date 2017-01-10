import 'react-native';
import React from 'react';
import ContactCard from '../lib/components/ContactCard.js';
import renderer from 'react-test-renderer';
import {expect, assert} from 'chai';
import {shallow, mount} from 'enzyme';
import Jest from 'jest';

describe('Contacts', () => {
  it('calls component did mount', () => {
    sinon.spy(ContactCard.prototype, 'componentDidMount')
    const wrapper = mount(<ContactCard />)
    expect (ContactCard.prototype.componentDidMount.calledOnce).to.equal(true)
  })
  it('has a sign in button that can be clicked', () => {
    let onClick = sinon.spy()
    const wrapper = mount(<ContactCard />)
    wrapper.find('TouchableHighlight').simulate('change')
    expect(onClick).to.have.property('callCount', 1)
  })
  it('should change message state on onChange', () => {
    const wrapper = mount(<ContactCard />);
    const input = wrapper.find('TextInput');
    input.simulate('change', {target: {value: 'name'}});
    expect(wrapper.state('name')).to.equal('name');
  })
})
