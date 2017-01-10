import 'react-native';
import React from 'react';
import NimbleNetwork from '../lib/components/NimbleNetwork.js';
import renderer from 'react-test-renderer';
import {expect} from 'chai';
// import {shallow} from 'enzyme';
// import Jest from 'jest';

// Note: test renderer must be required after react-native.

it('It renders', () => {
  const tree = renderer.create(
    <NimbleNetwork />
  ).toJSON();
  console.log(tree);
  expect(tree).toMatchSnapshot();
});
