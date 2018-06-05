import React from 'react';
import { /* shallow, */ mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
jest.mock('../../services/ch-api.js');
import ItemDetail from './ItemDetail';

describe('ItemDetail', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<ItemDetail objectID="12345678"/>);
  });

  it('renders an image, title, two paragraphs, and a link after mounting with an object id', () => {
    console.log(wrapper.html());
  });

});
