import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Header from './index';

it('Deve renderizar o logo', () => {
  const { getByAltText } = render(<Header searchText={''} setSearchText={() => {}} setSearchResult={() => {}} />);
  expect(getByAltText('Cataloguei')).toBeInTheDocument();
});

it('Deve renderizar o botão de menu', () => {
  const { getByAltText } = render(<Header searchText={''} setSearchText={() => { }} setSearchResult={() => { }} />);
  expect(getByAltText('Menu')).toBeInTheDocument();
});
