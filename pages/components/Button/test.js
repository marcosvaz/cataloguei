import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

import Button from './index';

it('Deve renderizar o botão com o texto "Button"', () => {
  const { getByText } = render(<Button>Button</Button>);
  expect(getByText('Button')).toBeInTheDocument();
});

it('Deve possuir a classe "button" e a "outline"', () => {
  const { getByText } = render(<Button outline>Button</Button>);
  expect(getByText('Button')).toHaveClass('button');
  expect(getByText('Button')).toHaveClass('outline');
});

it('Deve realizar a função', () => {
  const component = renderer.create(
    <Button onClick={() => console.assert('Botão', 'Função')}>Button</Button>
  )
  let tree = component.toJSON();
  tree.props.onClick();
});