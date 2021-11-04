import React, { FC } from 'react';
import { MovieProps } from '../../utils/types';
import styles from './MoviesList.module.css';
import { Link } from 'react-router-dom';
interface MovieListProps {
	movies: MovieProps[];
}
const MoviesList: FC<MovieListProps> = ({ movies }) => {
	return (
		<div className={styles.moviesList} data-testid="moviesList">
			{movies.map((movie, id) => (
				<Link to={`/detail/${movie.slug}`} key={id}>
					<img
						src={movie.backdrop}
						alt={movie.title}
						className={styles.movie}
					/>
				</Link>
			))}
		</div>
	);
};

export default MoviesList;
