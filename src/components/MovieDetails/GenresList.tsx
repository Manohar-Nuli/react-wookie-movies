import React, { FC } from "react";
import { GenreWithMovies } from "../../utils/types";
import MoviesList from "../MoviesList";
import styles from "./MovieDetail.module.css";

interface GeneresListProps {
  generes: GenreWithMovies;
  id: number;
}
const GenresList: FC<GeneresListProps> = ({ generes, id }) => {
  if (generes.movies.length === 0) {
    return null;
  }
  return (
    <div key={id}>
      <h2 className={styles.genereTitle}>{generes.name}</h2>
      <MoviesList movies={generes.movies} />
    </div>
  );
};

export default GenresList;
