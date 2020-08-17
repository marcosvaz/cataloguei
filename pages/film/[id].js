import Head from 'next/head';
import React, {useState, useEffect} from 'react';
import { useRouter} from 'next/router';
import moment from 'moment';

import MovieService from '../../services/movie.service';

import Header from '../components/Header';
import Film from '../components/Film';
import Button from '../components/Button';

/**
 * Page of film details
 */
export default function Info() {
  const router = useRouter();
  const {id} = router.query;

  const [like, setLike] = useState(false);
  const [favorites, setFavorites] = useState([]);

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

  const castNames = (cast) => {
    if(cast){
      let names = `${cast.map(person => (`${person.name}`))}`;
      let manipulatedNames = names.replace(/,/g, ', ');
      return manipulatedNames;
    }
  }

  const directorName = (crew) => {
    if(crew){
      let name = `${crew.find(person => person.job === 'Director')?.name}`;
      if(name === "undefined"){
        return null;
      }
      return name;
    }
  }

  const movieGenres = (movieGenres) => {
    if(movieGenres){
      let names = `${movieGenres.map(genre => (`${genre.name}`))}`;
      let manipulatedNames = names.replace(/,/g, ', ');
      return manipulatedNames;
    }
  }

  const time = (minutes) => {
    if(minutes){
      let h = minutes / 60 | 0;
      let m = minutes % 60 | 0;
      let formated = moment.utc().hours(h).minutes(m).format('h:m');
      let time = `${formated.replace(':', 'h ')}m`;
      return time;
    }
  }

  const releaseDate = (release_date) => {
    if(release_date){
      let release = release_date.split('-')[0];
      return release;
    }
  }

  const handleLike = () => {
    if (!like) {
      setLike(true);

      if (localStorage.getItem('favorites')) {
        localStorage.setItem('favorites', `${localStorage.getItem('favorites')}${id},`);
      } else {
        localStorage.setItem('favorites', `${id},`);
      }

    } else {
      setLike(false);

      if (localStorage.getItem('favorites').replace(/,$/, '').split(',').length > 1) {
        localStorage.setItem('favorites', localStorage.getItem('favorites').replace(`${id},`, ''));
      } else {
        localStorage.removeItem('favorites');
      }
    }
  }

  useEffect(() => {
    if(id) {
      getDetails();
      getCredits();
      getGenres();
      getRecommendations();

      if (localStorage.getItem('favorites')) {
        if (localStorage.getItem('favorites').replace(/,$/, '').split(',').includes(id.toString())){
          setLike(true);
        } else {
          setLike(false);
        }

        setFavorites(localStorage.getItem('favorites').replace(/,$/, '').split(','));
      } else {
        setLike(false)
      }
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
        (searchText.length > 0 && searchResult.length > 0) ?
        <div className="films--search">
          <h3>Você está buscando por: “{searchText}”</h3>
          <div className="films--search__posters">
            {
              searchResult.map(film => (
                <Film key={id} id={id} title={film.title} poster_path={film.poster_path} setSearchText={setSearchText} />
              ))
            }
          </div>
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
              onClick={() => handleLike()}>
                {`${like ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}`}
                <img src={`/assets/images/favorite${!like ? '_dark' : '' }.svg`} />
            </Button>
          </div>
        </>
      }
    </div>
  );
}