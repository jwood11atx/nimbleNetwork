import 'react-native';
import React from 'react';
import Contacts from '../lib/components/Contacts.js';
import renderer from 'react-test-renderer';
import {expect, assert} from 'chai';
import {shallow} from 'enzyme';
import Jest from 'jest';

describe('Contacts', () => {
  it('should render as a view', () => {
    const wrapper = shallow(<Contacts />)
    assert.equal(wrapper.type(), 'View')
  })
  it('renders one contact when only one contact exists in firebase', () => {
    const wrapper = shallow(<Contacts />)
    expect(wrapper.find('TouchableHighlight')).to.have.length(1)
  })
  it('has a sign in button that can be clicked', () => {
    let onClick = sinon.spy()
    const wrapper = mount(<Contacts />)
    wrapper.find('TouchableHighlight').simulate('change')
    expect(onClick).to.have.property('callCount', 1)
  })
})
