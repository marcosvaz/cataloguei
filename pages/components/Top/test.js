import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Top from './index';

it('Deve renderizar um "botão" de topo', () => {
  const { getByText } = render(<Top />);
  expect(getByText('Topo')).toBeInTheDocument();
});