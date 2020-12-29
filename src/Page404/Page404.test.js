import React from 'react';
import { shallow } from 'enzyme';
import Page404 from './Page404';

describe('<Page404 />', () => {
  test('renders', () => {
    const wrapper = shallow(<Page404 />);
    expect(wrapper).toMatchSnapshot();
  });
});
