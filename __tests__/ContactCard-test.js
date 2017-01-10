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
})
