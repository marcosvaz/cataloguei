import Head from 'next/head';
import React, {useState, useEffect} from 'react';
import { useRouter} from 'next/router';

import MovieService from '../../services/movie.service';

import Header from '../components/Header';
import Film from '../components/Film';

/**
 * Page of film details
 */
export default function Info() {
  const router = useRouter();
  const {id} = router.query;

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
      console.log(results);
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
      let name = `${crew.find(person => person.job === 'Director').name}`;
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

  useEffect(() => {
    if(id) {
      getDetails();
      getCredits();
      getGenres();
      getRecommendations();
    }
  }, [id])

  return (
    <div style={{ paddingTop: '10rem', background: 'var(--color-dark)' }}>
      <Head>
        <link rel="icon" href="/logo.svg" />
        <title>Cataloguei | {film.title}</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap" rel="stylesheet" />
      </Head>
      <Header searchText={searchText} setSearchText={setSearchText} />
      {
        (film && credits && genres) &&
        <>
          <img
            src={`https://image.tmdb.org/t/p/original/${film.poster_path}`}
            alt={film.title}
            style={{ height: '100%', maxHeight: 'calc(100vh - 10rem)' }}
          />
          <div style={{ margin: '0 2rem' }}>
            <h1 style={{ color: '#FFF', margin: '0', fontFamily: 'Montserrat', fontWeight: '400', fontSize: '3.2rem' }}>{film.title}</h1>
            <div style={{ display: 'flex' }}>
              <ul style={{ padding: '0', listStyle: 'none', display: 'flex',  }}>
                <li style={{ marginRight: '1rem' }}>{film.runtime}</li>
                •
                <li style={{ margin: '0 1rem' }}>{film.release_date}</li>
                •
                <li style={{ marginLeft: '1rem' }}>{film.vote_average}/10</li>
              </ul>
            </div>
            <div>
              <span>Gêneros</span>
              <p>{movieGenres(film.genres)}</p>
            </div>
            <div>
              <span>Sinopse</span>
              <p>{film.overview}</p>
            </div>
            <div>
              <span>Elenco</span>
              <p>{castNames(credits.cast)}</p>
            </div>
            <div>
              <span>Direção</span>
              <p>{directorName(credits.crew)}</p>
            </div>
          </div>
          {
            recommended.length > 0 &&
            <div className="films--recommended">
              <h2>Recomendados</h2>
              <div className="films--recommended__posters">
                {
                  recommended.map(film => (
                    <Film key={film.id} id={film.id} title={film.title} poster_path={film.poster_path} />
                  ))
                }
              </div>
            </div>
          }
        </>
      }
    </div>
  );
}