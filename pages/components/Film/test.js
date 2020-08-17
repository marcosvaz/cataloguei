import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

import Film from './index';

it('Deve renderizar um poster de um filme com as propriedades passadas', () => {
  const { getByAltText } = render(<Film id={605116} title={`Power`} poster_path={`/38teDX74nsxkv2ysWvNT5EPXQ9E.jpg`} setSearchText={() => { }} />);
  expect(getByAltText('Power')).toBeInTheDocument();
});

it('Texto de adicionar aos favoritos', () => {
  const { getByText } = render(<Film id={605116} title={`Power`} poster_path={`/38teDX74nsxkv2ysWvNT5EPXQ9E.jpg`} setSearchText={() => { }} />);
  expect(getByText('Adicionar')).toBeInTheDocument();
});

it('Botão de adicionar aos favoritos', () => {
  const { getByAltText } = render(<Film id={605116} title={`Power`} poster_path={`/38teDX74nsxkv2ysWvNT5EPXQ9E.jpg`} setSearchText={() => { }} />);
  expect(getByAltText('Adicionar aos favoritos')).toBeInTheDocument();
});

it('Não renderizar sem poster', () => {
  const component = renderer.create(
    <Film id={605116} title={`Power`} setSearchText={() => { }} />
  )
  let tree = component.toJSON();
  expect(tree).toBeNull();
});