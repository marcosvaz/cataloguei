import React, {useState} from 'react';
import { useRouter} from 'next/router';

import Header from '../components/Header';

import * as Styled from './styles';

export default function Info() {
  const router = useRouter();
  const {id} = router.query;

  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState({});

  return (
    <>
      <Header searchText={searchText} setSearchText={setSearchText} />
      <Styled.Container>
        <Styled.Content>
          <h1>Homem de Ferro 3</h1>
        </Styled.Content>
      </Styled.Container>
    </>
  );
}