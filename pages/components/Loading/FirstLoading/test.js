import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import FirstLoading from './index';

it('Deve renderizar um "loading" com uma mensagem', () => {
  const { getByText } = render(<FirstLoading />);
  expect(getByText('Olá! Seja bem vindo(a)!')).toBeInTheDocument();
});