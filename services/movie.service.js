import axios from '../config/axios';

class MovieService {
  getPopular = async () => {
    return new Promise((resolve, reject) => {
      axios.get('/movie/popular', {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          language: 'pt-BR'
        }
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  getTrending = async () => {
    return new Promise((resolve, reject) => {
      axios.get('/trending/all/day', {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          language: 'pt-BR'
        }
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  getTopRated = async () => {
    return new Promise((resolve, reject) => {
      axios.get('/movie/top_rated', {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          language: 'pt-BR'
        }
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  search = async (query) => {
    return new Promise((resolve, reject) => {
      axios.get(`/search/movie`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          language: 'pt-BR',
          query
        }
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getDetails = async (movie_id) => {
    return new Promise((resolve, reject) => {
      axios.get(`/movie/${movie_id}`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          language: 'pt-BR'
        }
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  getGenres = async () => {
    return new Promise((resolve, reject) => {
      axios.get(`/genre/movie/list`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          language: 'pt-BR'
        }
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  
  getCredits = async (movie_id) => {
    return new Promise((resolve, reject) => {
      axios.get(`/movie/${movie_id}/credits`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          language: 'pt-BR'
        }
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  getRecommendations = async (movie_id) => {
    return new Promise((resolve, reject) => {
      axios.get(`/movie/${movie_id}/recommendations`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          language: 'pt-BR'
        }
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  getSimilar = async (movie_id) => {
    return new Promise((resolve, reject) => {
      axios.get(`/movie/${movie_id}/similar`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          language: 'pt-BR'
        }
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
};

export default new MovieService();