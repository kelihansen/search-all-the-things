import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
jest.mock('../../services/ch-api.js');
import ItemDetail from './ItemDetail';

describe('ItemDetail', () => {
  let wrapper;

  beforeAll(() => {
    const mockHistory = { match: { params: { id: 1 } } };
    wrapper = shallow(<ItemDetail objectID="" history={mockHistory}/>);
  });

  it('renders as designed', () => {
    wrapper.setProps({ id: '12345678' });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('has an image, a heading, two paragraphs, and a link', () => {
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('h3')).toHaveLength(1);
    expect(wrapper.find('p')).toHaveLength(2);
    expect(wrapper.find('a')).toHaveLength(1);
  });

});
