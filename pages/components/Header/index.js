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
  const [search, setSearch] = useState(false);
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
    setSearchText('');
    setMenu(!menu);
    router.push('/');
  }

  const handleMenu = () => {
    setMenu(!menu);
    !menu && setSearchText('');
  }

  return (
    <>
      <header>
        <Link href="/">
          <a><img src="/assets/logo.svg" alt="Cataloguei" /></a>
        </Link>
        <div className="header__menu--mobile">
          <img src={menu ? "/assets/images/close.svg" : "/assets/images/menu.svg"} alt="Menu" onClick={() => handleMenu()} />
        </div>
        <HeaderDesktop searchText={searchText} setSearchText={setSearchText} />
      </header>

      <div className={menu ? "menu" : "menu--hidden"}>
        <ul>
          <li onClick={() => sendToHome()}><Link href="/" passHref><a>Página Inicial</a></Link></li>
          <li onClick={() => setSearch(!search)}>Pesquisar</li>
          {
            search &&
            <li>
              <input
                className="search__input"
                type="text"
                placeholder="Digite aqui sua busca"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                onKeyDown={(e) => e.keyCode === 13 && setMenu(!menu)}
              />
            </li>
          }
        </ul>
      </div>
    </>
  );
}

export default Header;