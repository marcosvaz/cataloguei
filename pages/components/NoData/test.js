import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import NoData from './index';

it('Deve renderizar um "loading" com uma mensagem', () => {
  const { getByText } = render(<NoData />);
  expect(getByText('Ops, parece que não encontramos o que você está buscando. Que tal tentarmos de novo?')).toBeInTheDocument();
});