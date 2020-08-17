import {useState} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Header from './components/Header';
import Button from './components/Button';

const Custom404 = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState({});
  const router = useRouter();

  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/logo.svg" />
        <title>Cataloguei</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <Header searchText={searchText} setSearchText={setSearchText} setSearchResult={setSearchResult} />

      <div className="content not_found">
        <img src="/assets/images/not_found.svg" alt="" />
        <span>
          Ops, parece que você caiu em outra dimensão... ou só não encontrou nada mesmo.
        </span>
        <Button onClick={() => router.push('/')}>Ir para a página inicial</Button>
      </div>
    </div>
  );
}

export default Custom404;