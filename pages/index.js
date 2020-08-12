import Head from 'next/head';
import Link from 'next/link';
import {useState, useEffect} from 'react';

import MovieService from '../services/movie.service';

import FirstLoading from './components/Loading/FirstLoading';
import Film from './components/Film';
import Header from './components/Header/Desktop';

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [scroll, setScroll] = useState(0);

  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState({});

  const [loading, setLoading] = useState(true);

  const [popular, setPopular] = useState({});
  const [trending, setTrending] = useState({});
  const [topRated, setTopRated] = useState({});

  const getPopularMovie = async () => {
    try {
      const { results } = await MovieService.getPopular();
      setPopular(results);
    }
    catch (error) {
      console.log(error);
    }
  }

  const getTrending = async () => {
    try {
      const { results } = await MovieService.getTrending();
      setTrending(results);
    }
    catch (error) {
      console.log(error);
    }
  }

  const getTopRated = async () => {
    try {
      const { results } = await MovieService.getTopRated();
      setTopRated(results);
    }
    catch (error) {
      console.log(error);
    }
  }

  const search = async (query) => {
    try {
      const { results } = await MovieService.search(query);
      setSearchResult(results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    getPopularMovie();
    getTrending();
    getTopRated();
  }, []);

  useEffect(() => {
    if (popular.length > 0 && trending.length > 0 && topRated.length > 0) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [popular, trending, topRated]);

  useEffect(() => {
    searchText.length > 0 &&
    search(searchText)
  }, [searchText]);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScroll(position);
  }

  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/logo.svg" />
        <title>Cataloguei</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap" rel="stylesheet"></link>
      </Head>

      <header>
        <img src="./logo.svg" alt="Cataloguei" />
        <div className="header__menu--mobile">
          <img src={menu ? "./assets/images/close.svg" : "./assets/images/menu.svg"} alt="Menu" onClick={() => setMenu(!menu)} />
        </div>
        <Header searchText={searchText} setSearchText={setSearchText} />
      </header>

      <div className={menu ? "menu" : "menu--hidden"}>
        <ul>
          <li onClick={() => setMenu(!menu)}><Link href="/"><a>Página Inicial</a></Link></li>
          <li className="disabled">Filmes</li>
          <ul className="subfields">
            <li><Link href="/"><a>Populares</a></Link></li>
            <li><Link href="/"><a>Tendência</a></Link></li>
            <li><Link href="/"><a>Melhor avaliados</a></Link></li>
          </ul>
          <li><Link href="/"><a>Meus Favoritos</a></Link></li>
          <li><Link href="/"><a>Pesquisar</a></Link></li>
        </ul>
      </div>

      { loading ? <FirstLoading /> :
        <div className="content">
          <div className="films">
          {
            (searchText.length > 0 && searchResult.length > 0) ? 
            <div className="films--search">
              <h3>Você está buscando por: “{searchText}”</h3>
              <div className="films--search__posters">
                {
                  searchResult.map(film => (
                    <Film key={film.id} id={film.id} title={film.title} poster_path={film.poster_path} />
                  ))
                }
              </div>
            </div>
            :
            <>
              <div className="films--popular">
                <h2>Populares</h2>
                <div className="films--popular__posters">
                  {
                    popular.map(film => (
                      <Film key={film.id} id={film.id} title={film.title} poster_path={film.poster_path} />
                    ))
                  }
                </div>
              </div>
              <div className="films--tendence">
                <h2>Tendência</h2>
                <div className="films--tendence__posters">
                  {
                    trending.map(film => (
                      <Film key={film.id} id={film.id} title={film.title} poster_path={film.poster_path} />
                    ))
                  }
                </div>
              </div>
              <div className="films--best_avaliations">
                <h2>Melhor avaliados</h2>
                <div className="films--best_avaliations__posters">
                  {
                    topRated.map(film => (
                      <Film key={film.id} id={film.id} title={film.title} poster_path={film.poster_path} />
                    ))
                  }
                </div>
              </div>
            </>
          }
          </div>
        </div>
      }
    </div>
  )
}
