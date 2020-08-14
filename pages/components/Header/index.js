import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import MovieService from '../../../services/movie.service';

import HeaderDesktop from './Desktop';

/**
 * Header component
 * @param searchText search text
 * @param setSearchText setter of search text
 * @param setSearchResult setter of search results
 */
const Header = ({searchText, setSearchText, setSearchResult}) => {
  const [menu, setMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const search = async (query) => {
      try {
        const { results } = await MovieService.search(query);
        setSearchResult(results);
      } catch (error) {
        console.log(error);
      }
    }

    searchText.length > 0 &&
      search(searchText)
  }, [searchText]);

  const sendToHome = () => {
    setMenu(!menu);
    router.push('/');
  }

  return (
    <>
      <header>
        <img src="/assets/logo.svg" alt="Cataloguei" />
        <div className="header__menu--mobile">
          <img src={menu ? "/assets/images/close.svg" : "/assets/images/menu.svg"} alt="Menu" onClick={() => setMenu(!menu)} />
        </div>
        <HeaderDesktop searchText={searchText} setSearchText={setSearchText} />
      </header>

      <div className={menu ? "menu" : "menu--hidden"}>
        <ul>
          <li onClick={() => sendToHome()}><Link href="/"><a>Página Inicial</a></Link></li>
          <li><Link href="/favorites"><a>Meus Favoritos</a></Link></li>
          <li><Link href="/"><a>Pesquisar</a></Link></li>
        </ul>
      </div>
    </>
  );
}

export default Header;