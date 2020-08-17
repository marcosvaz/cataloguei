import Head from 'next/head';
import React, {useState, useEffect} from 'react';
import { useRouter} from 'next/router';

import MovieService from '../../services/movie.service';

import Header from '../components/Header';
import Film from '../components/Film';
import Button from '../components/Button';
import NoData from '../components/NoData';

import { castNames, directorName, movieGenres, releaseDate, time, handleLike, validateLike } from '../../config/functions';

/**
 * Page of film details
 */
export default function Info() {
  const router = useRouter();
  const {id} = router.query;

  const [like, setLike] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState({});

  const [film, setFilm] = useState({});
  const [credits, setCredits] = useState({});
  const [genres, setGenres] = useState([]);

  const [recommended, setRecommended] = useState({});

  const getDetails = async () => {
    try {
      const result = await MovieService.getDetails(id);
      setFilm(result);
    } catch (error) {
      console.log(error);
    }
  }

  const getCredits = async () => {
    try {
      const result = await MovieService.getCredits(id);
      setCredits(result);
    } catch (error) {
      console.log(error);
    }
  }

  const getGenres = async () => {
    try {
      const {genres} = await MovieService.getGenres();
      setGenres(genres);
    } catch (error) {
      console.log(error);
    }
  }

  const getRecommendations = async () => {
    try {
      const { results } = await MovieService.getRecommendations(id);
      setRecommended(results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(id) {
      getDetails();
      getCredits();
      getGenres();
      getRecommendations();

      validateLike(id, setLike);
    }
  }, [id])

  return (
    <div className="container details" style={{ paddingTop: '10rem' }}>
      <Head>
        <link rel="icon" href="/logo.svg" />
        <title>Cataloguei | {film.title}</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap" rel="stylesheet" />
      </Head>
      <Header searchText={searchText} setSearchText={setSearchText} setSearchResult={setSearchResult} />
      {
        (searchText.length > 0) ?
        <div className="films--search">
          <h3>Você está buscando por: “{searchText}”</h3>
          {
            searchResult.length > 0 ?
            <div className="films--search__posters">
              {
                searchResult.map(film => (
                  <Film key={film.id} id={film.id} title={film.title} poster_path={film.poster_path} setSearchText={setSearchText} />
                ))
              }
            </div> 
            :
            <NoData />
          }
        </div> :
        (film && credits && genres && recommended) &&
        <>
          <div className="main">
            <div className="film__spotlight">  
              <img
                src={`https://image.tmdb.org/t/p/original/${film.poster_path}`}
                alt={film.title}
              />
              <div className="spotlight__bottom">
                { 
                  like &&
                  <img src={`/assets/images/favorite.svg`} alt="Adicionar aos favoritos" />
                }
              </div>
            </div>
            <div className="film__details">
              <div className="film__details--numbers">
                <h1>{film.title}</h1>
                <div className="details__numbers">
                  <ul>
                    <li>{time(film.runtime) || 'Duração não encontrada'}</li>
                    •
                    <li>{releaseDate(film.release_date) || 'Data de lançamento não encontrada'}</li>
                    •
                    <li>{film.vote_average || '?'}/10</li>
                  </ul>
                </div>
              </div>
              <div className="details__info">
                <span>Gêneros</span>
                <p>{movieGenres(film.genres) || 'Sem informações'}</p>
              </div>
              <div className="details__info">
                <span>Sinopse</span>
                <p>{film.overview || 'Sem informações'}</p>
              </div>
              <div className="details__info">
                <span>Elenco</span>
                <p>{castNames(credits.cast) || 'Sem informações'}</p>
              </div>
              <div className="details__info">
                <span>Direção</span>
                <p>{directorName(credits.crew) || 'Sem informações'}</p>
              </div>
            </div>
          </div>
          {
            recommended.length > 0 &&
            <div className="films--recommended">
              <h2>Recomendados</h2>
              <div className="films--recommended__posters">
                {
                  recommended.map(film => (
                    <Film key={film.id} id={film.id} title={film.title} poster_path={film.poster_path} setSearchText={setSearchText} />
                  ))
                }
              </div>
            </div>
          }
          <div className="button--float">
            <Button 
              outline={like} 
              onClick={() => handleLike(like, id, setLike)}>
                {`${like ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}`}
                <img src={`/assets/images/favorite${!like ? '_dark' : '' }.svg`} />
            </Button>
          </div>
        </>
      }
    </div>
  );
}