import React from 'react';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Calculator from './Calculator';
import Control from '../components/Control';
import Result from '../components/Result';

Enzyme.configure({ adapter: new Adapter() });

describe('Calculator', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((error) => [error, setState]);

  beforeEach(() => {
    wrapper = Enzyme.shallow(<Calculator />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Render Calculator Component.', () => {});

  it('Renders 19x Control components in Calculator.', () => {
    expect(wrapper.find(Control).length).toEqual(19);
  });

  it("Control at 16th position has title '0'.", () => {
    const zeroButton = wrapper.find(Control).at(16);
    expect(zeroButton.prop('title')).toEqual('0');
  });

//   it('Calculations: Cannot divide by 0.', () => {
//     const zeroButton = wrapper.find(Control).at(16);
//     const divisionButton = wrapper.find(Control).at(3);
//     const threeButton = wrapper.find(Control).at(14);
//     const equalityButton = wrapper.find(Control).at(18);
//     const result = wrapper.find(Result).at(0);

//     threeButton.props().onClick();
//     divisionButton.props().onClick();
//     zeroButton.props().onClick();
//     equalityButton.props().onClick();
//     // equalityButton.simulate('click');

//     expect(result.prop('error')).toEqual('Cannot divide by 0!');
//   });
});
