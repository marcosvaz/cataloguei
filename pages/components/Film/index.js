import React, {useState} from 'react';

/**
 * Film component
 * @param id film id
 * @param title film title
 * @param poster_path film poster path
 */
const Film = ({id, title, poster_path}) => {
    const [isFavorite, setFavorite] = useState(false);

    console.log(id);

    return (
      <>
        {
          poster_path ?
          <div className="film">
            <img className="film__poster" src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt={title} />
            <div className="film__like" onClick={() => setFavorite(!isFavorite)}>
              <div className="film__bottom">
                <span>
                  {
                    !isFavorite ? 'Adicionar' : 'Remover'
                  }
                </span>
              </div>
              <img className={`film__favorite ${isFavorite ? 'active' : ''}`} src={`/assets/images/favorite${!isFavorite ? '_disabled' : ''}.svg`} alt="Adicionar aos favoritos" />
            </div>
          </div> : null
        }
      </>
    );
}

export default Film;