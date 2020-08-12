import React, {useState} from 'react';

// import * as S from './styles';

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
      <li className="active">Página Inicial</li>
      <li>Filmes</li>
      <li>Meus Favoritos</li>
      <div className="search">
        {
          searchBar &&
          <input
            type="text"
            placeholder="Digite aqui sua busca"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            onKeyDown={(e) => e.keyCode === 13 && handleSearch()}
          />
        }
        <img src="/assets/images/search.svg" alt="Search" onClick={() => handleSearch()} />
      </div>
    </ul>
  );
}

export default Header;