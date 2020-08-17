import React, {useState, useEffect} from 'react';
import Link from 'next/link';

import { handleLike, validateLike } from '../../../config/functions';

/**
 * Film component
 * @param id film id
 * @param title film title
 * @param poster_path film poster path
 */
const Film = ({id, title, poster_path, setSearchText}) => {
  const [like, setLike] = useState(false);

  useEffect(() => {
    validateLike(id, setLike);
  }, [id])

  return (
    <>
      {
        poster_path ?
        <div className="film">
          <Link href="/film/[id]" as={`/film/${id}`}>
            <a onClick={() => setSearchText('')}>
              <img className="film__poster" src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt={title} />
            </a>
          </Link>
          <div className="film__like" onClick={() => handleLike(like, id, setLike)}>
            <div className="film__bottom">
              <span>
                {
                  !like ? 'Adicionar' : 'Remover'
                }
              </span>
            </div>
            <img className={`film__favorite ${like ? 'active' : ''}`} src={`/assets/images/favorite${!like ? '_disabled' : ''}.svg`} alt={!like ? 'Adicionar aos favoritos' : 'Remover dos favoritos'} />
          </div>
        </div>: null
      }
    </>
  );
}

export default Film;