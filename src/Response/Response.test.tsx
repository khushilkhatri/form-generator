import React from 'react';
import { shallow } from 'enzyme';
import Response from './Response';

describe('<Response />', () => {
  test('renders', () => {
    const wrapper = shallow(<Response />);
    expect(wrapper).toMatchSnapshot();
  });
});
