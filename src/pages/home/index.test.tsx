import React from 'react';
import Home from '.';
import { render } from '../../tests/customRender';

describe('Home', () => {
  it('should render the home page', () => {
    const { getByText } = render(<Home />);

    expect(getByText('React boilerplate')).toBeInTheDocument();
  });
});
