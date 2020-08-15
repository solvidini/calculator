import React from 'react';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Result from '../components/Result';

Enzyme.configure({ adapter: new Adapter() });

describe('Calculator', () => {
  let wrapper;
  const resultProps = {
    error: 'Cannot divide by 0!',
    n1: 5,
    n2: 0,
    result: 5,
    operation: 5,
  };

  beforeEach(() => {
    wrapper = Enzyme.shallow(<Result {...resultProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Text should come from error if error occurs.', () => {
    expect(wrapper.find('.calculator__operation').text()).toEqual(
      'Cannot divide by 0!'
    );
  });
});
