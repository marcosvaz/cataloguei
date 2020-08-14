import Head from 'next/head';
import {useState, useEffect} from 'react';

import MovieService from '../services/movie.service';

import FirstLoading from './components/Loading/FirstLoading';
import Film from './components/Film';
import Header from './components/Header';

/**
 * Home page
 */
export default function Home() {
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

  useEffect(() => {
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

  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/logo.svg" />
        <title>Cataloguei</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <Header searchText={searchText} setSearchText={setSearchText} setSearchResult={setSearchResult} />

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
