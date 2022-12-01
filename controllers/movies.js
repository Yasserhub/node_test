import { v4 as uuid } from "uuid";

let movies = [];

export const getMovies = (req, res) => {
  if (movies.length === 0) res.send(`There is no any movie in the database`);
  else res.send(movies);
};

export const createMovie = (req, res) => {
  const movie = req.body;
  const newMovie = {
    id: uuid(),
    title: movie.title,
    director: movie.director,
    release_date: movie.release_date,
  };
  if (!newMovie.title || !newMovie.director || !newMovie.release_date) {
    return res.status(401).json({
      msg: "Please do not leave any these fields title, director and release_date EMPTY",
    });
  }

  movies.push(newMovie);
  res.send(
    `Movie with the title: ${movie.title} and id: ${newMovie.id} was added to the database`
  );
};

export const getMovie = (req, res) => {
  const { id } = req.params;
  const foundMovie = movies.find((movie) => movie.id === id);
  if (foundMovie) {
    res.json(movies.filter((movie) => movie.id === id));
  } else {
    res
      .status(401)
      .json({ msg: `No movie founded with the following id: ${id} ` });
  }
};

export const deleteMovie = (req, res) => {
  const { id } = req.params;
  const found = movies.some((movie) => movie.id === id);
  if (found) {
    movies = movies.filter((movie) => movie.id !== id);
    res.send(`Movie with the id ${id} deleted from the database`);
  } else {
    res.status(401).json({ msg: `No movie found with following the id ${id}` });
  }
};

export const updateMovie = (req, res) => {
  const { id } = req.params;
  const { title, director, release_date } = req.body;

  const movie = movies.find((movie) => movie.id === id);

  if (movie) {
    if (title) movie.title = title;
    if (director) movie.director = director;
    if (release_date) movie.release_date = release_date;

    res.send(`Movie with the id ${id} has been updated`);
  } else {
    res.status(401).json({ msg: `No movie found with following the id ${id}` });
  }
};
