import moment from 'moment';

export const castNames = (cast) => {
  if (cast) {
    let names = `${cast.map(person => (`${person.name}`))}`;
    let manipulatedNames = names.replace(/,/g, ', ');
    return manipulatedNames;
  }
}

export const directorName = (crew) => {
  if (crew) {
    let name = `${crew.find(person => person.job === 'Director')?.name}`;
    if (name === "undefined") {
      return null;
    }
    return name;
  }
}

export const movieGenres = (movieGenres) => {
  if (movieGenres) {
    let names = `${movieGenres.map(genre => (`${genre.name}`))}`;
    let manipulatedNames = names.replace(/,/g, ', ');
    return manipulatedNames;
  }
}

export const time = (minutes) => {
  if (minutes) {
    let h = minutes / 60 | 0;
    let m = minutes % 60 | 0;
    let formated = moment.utc().hours(h).minutes(m).format('h:m');
    let time = `${formated.replace(':', 'h ')}m`;
    return time;
  }
}

export const releaseDate = (release_date) => {
  if (release_date) {
    let release = release_date.split('-')[0];
    return release;
  }
}

export const handleLike = (like, id, setLike) => {
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

export const validateLike = (id, setLike) => {
  if (localStorage.getItem('favorites')) {
    localStorage.getItem('favorites').replace(/,$/, '').split(',').includes(id.toString()) &&
    setLike(true);
  } else {
    setLike(false)
  }
}