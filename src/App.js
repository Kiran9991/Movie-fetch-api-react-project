import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retry, setRetry] = useState(false);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null)
    try {
      const response = await fetch("https://swapi.dev/api/film/");

      if(!response.ok) {
        throw new Error('Something went wrong!');
      }

    const data = await response.json();

    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        titles: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });

    setMovies(transformedMovies);
    } catch(error) {
      setRetry(true)
      if(retry) {
        setError('...Retrying')
        setInterval(() => {
          fetchMoviesHandler();
          console.log('fetching movies')
        },50)
      }
      setError(error.message)
    }
    setIsLoading(false);
  }

  function cancelFethchMoviesHandler() {
    setRetry(false);
    console.log('canceled')
  }

  let content = <p>Found no movies.</p>;

  if(movies.length > 0) content = <MoviesList movies={movies} />;

  if(error) content = <p>{error}</p>

  if(isLoading) content = <p>Loading...</p>

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        <button onClick={cancelFethchMoviesHandler}>Cancel</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
