import React, {useState} from 'react';
import { useRouter} from 'next/router';

import Header from '../components/Header';

export default function Info() {
  const router = useRouter();
  const {id} = router.query;

  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState({});

  return (
    <>
      <Header searchText={searchText} setSearchText={setSearchText} />
      <div>
        <div>
          <h1>Homem de Ferro 3</h1>
        </div>
      </div>
    </>
  );
}