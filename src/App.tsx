
import './App.css'
import type Movie from "./features/movies/models/movie.model.ts";
import DisplayMovies from "./features/movies/components/DisplayMovies.tsx";

function App() {
    const movie: Movie = {
        id: 1,
        title: 'Sinners',
        poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Sinners_%282025_film%29_poster.jpg/250px-Sinners_%282025_film%29_poster.jpg'
    }
  return (
    <>
        <DisplayMovies movie={movie} />
    </>
  )
}

export default App
