  // export const getMovies = () => {
  //   return fetch(
  //     `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  //   ).then((response) => {
  //     if (!response.ok) {
  //       throw new Error(response.json().message);
  //     }
  //     return response.json();
  //   })
  //   .catch((error) => {
  //     throw error
  //   });
  // };

  //Pagination - Open
  export const getMoviePages = (args) => {      
    return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${args.queryKey[1]}`)    
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  //Pagination - Close
  
  export const getMovie = (args) => {
    console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getGenres = async () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" + process.env.REACT_APP_TMDB_KEY + "&language=en-US"
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }     
      //console.log(response.json())      
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getLanguages = () => {
    return fetch(
      "https://api.themoviedb.org/3/configuration/languages?api_key=" + process.env.REACT_APP_TMDB_KEY
    )
      .then((response) => response.json())
      .then((json) => json);
      //console.log(response.json())   
  };

  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getMovieReviews = (id) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };

  export const getUpcomingMovies = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.json().message);
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  };

  export const getTopRatedMovies = () => {
    return fetch(          
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=true&page=1`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.json().message);
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  };

  // Movies Search by Keywords
  export const getMovieByKeyWord = (args) => {
    console.log(args)
    const [, idPart] = args.queryKey;
    const { query } = idPart
    console.log(args.queryKey.query)    
    return fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${query}&page=1&include_adult=false`)      
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  // Movies Search by Keywords

    export const getSimilarMovies = (args) => {
      console.log(args)
      const [, idPart] = args.queryKey;
      const { query } = idPart
      console.log(args.queryKey.query)    
      return fetch(        
        `https://api.themoviedb.org/3/movie/${query}/similar?api_key=${process.env.REACT_APP_TMDB_KEY}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.json().message);
        }
        return response.json();
      })
      .catch((error) => {
        throw error
     });
    };
  

    export const getVideo = (movieId) => {
      console.log("TMDB API" + "http://api.themoviedb.org/3/movie/"+movieId+"/videos?api_key=" + process.env.REACT_APP_TMDB_KEY)
      return fetch(
        "http://api.themoviedb.org/3/movie/"+movieId+"/videos?api_key=" + process.env.REACT_APP_TMDB_KEY        
      )
        .then((response) => response.json())
        .then((json) => json);
        //console.log(response.json())   
    };
    
      // Movies Search by Critera List
    export const getSearchMovies = (args) => {
      // console.log(`genres=${args.queryKey[1].generid}`)
      // console.log(`language=${args.queryKey[1].lang}`)
      // console.log(`year=${args.queryKey[1].year}`)
      // console.log(`sort_by=${args.queryKey[1].sort}`)
      console.log(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&with_genres=${args.queryKey[1].generid}&language=${args.queryKey[1].lang}&year=${args.queryKey[1].year}&sort_by=$${args.queryKey[1].sort}&include_adult=false&include_video=false&page=1`)
      return fetch(        
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&with_genres=${args.queryKey[1].generid}&language=${args.queryKey[1].lang}&year=${args.queryKey[1].year}&sort_by=${args.queryKey[1].sort}&include_adult=false&include_video=false&page=1`
        )
        
        
      
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.json().message);
        }
        return response.json();
      })
      .catch((error) => {
        throw error
    });
    };
  // Movies Search by Keywords