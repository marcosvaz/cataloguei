import Link from 'next/link';
import React, {useState, useEffect} from 'react';

/** 
 * Header Desktop component
 * @param searchText search text
 * @param setSearchText setter of search text
*/
const Header = ({ searchText, setSearchText }) => {
  const [searchBar, setSearchBar] = useState(false);

  const handleSearch = () => {
    if (searchBar === true) {
      console.log('pesquisa');
    } else {
      setSearchBar(true);
    }
  }

  return (
    <ul className="header__menu--desktop">

      <li className="active" onClick={() => setSearchText('')}><Link href="/" passHref><a>Página Inicial</a></Link></li>
      <div className="search">
        {
          searchBar ?
          <>
            <input
              className="search__input"
              type="text"
              placeholder="Digite aqui sua busca"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              onKeyDown={(e) => e.keyCode === 13 && handleSearch()}
            />
            <img src="/assets/images/close.svg" alt="Close" onClick={() => {setSearchBar(false); setSearchText('')}} />
          </> :
          <img src="/assets/images/search.svg" alt="Search" onClick={() => handleSearch()} />
        }
      </div>
    </ul>
  );
}

export default Header;