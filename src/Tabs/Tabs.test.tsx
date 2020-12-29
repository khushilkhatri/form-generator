import React from 'react';
import { shallow } from 'enzyme';
import Tabs from './Tabs';

describe('<Tabs />', () => {
  test('renders', () => {
    const wrapper = shallow(<Tabs />);
    expect(wrapper).toMatchSnapshot();
  });
});
