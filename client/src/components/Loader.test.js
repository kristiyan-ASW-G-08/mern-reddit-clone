import React from 'react';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import Loader from './Loader';

describe('<Loader/>', () => {
  const { container } = render(<Loader />);
  it('snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
