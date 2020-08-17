import React, {useState, useEffect} from 'react';
import Link from 'next/link';

/**
 * Film component
 * @param id film id
 * @param title film title
 * @param poster_path film poster path
 */
const Film = ({id, title, poster_path, setSearchText}) => {
  const [favorites, setFavorites] = useState([]);
  const [like, setLike] = useState(false);

  const handleLike = () => {
    if(!like){
      setLike(true);

      if(localStorage.getItem('favorites')){
        localStorage.setItem('favorites', `${localStorage.getItem('favorites')}${id},`);
      } else {
        localStorage.setItem('favorites', `${id},`);
      }

    } else {
      setLike(false);
      
      if(localStorage.getItem('favorites').replace(/,$/, '').split(',').length > 1){
        localStorage.setItem('favorites', localStorage.getItem('favorites').replace(`${id},`, ''));
      } else {
        localStorage.removeItem('favorites');
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem('favorites')){
      localStorage.getItem('favorites').replace(/,$/, '').split(',').includes(id.toString()) &&
      setLike(true);

      setFavorites(localStorage.getItem('favorites').replace(/,$/, '').split(','));
    } else {
      setLike(false)
    }
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
            <div className="film__like" onClick={() => handleLike()}>
              <div className="film__bottom">
                <span>
                  {
                    !like ? 'Adicionar' : 'Remover'
                  }
                </span>
              </div>
              <img className={`film__favorite ${like ? 'active' : ''}`} src={`/assets/images/favorite${!like ? '_disabled' : ''}.svg`} alt="Adicionar aos favoritos" />
            </div>
          </div>: null
        }
      </>
    );
}

export default Film;