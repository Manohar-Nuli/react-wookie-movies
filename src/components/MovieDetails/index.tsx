import { FC } from 'react';
import { getYearFromDate } from '../../utils/common';
import { MovieProps } from '../../utils/types';
import styles from './MovieDetail.module.css';
import { RatingView } from './RatingView';

interface MovieDetailProps {
	movieData: MovieProps;
}
const MovieDetails: FC<MovieDetailProps> = ({ movieData }) => {
	return (
		<div>
			<div className={styles.title} data-testid="titleContainer">
				<h2>{movieData?.title}</h2>
				<RatingView
					data-testid="ratingLib"
					ratingValue={movieData.imdb_rating}
					size={30}
					className="foo"
				/>
			</div>
			<div className={styles.info}>
				<span data-testid="released">
					{getYearFromDate(movieData.released_on)}
				</span>
				<span> | </span>
				<span data-testid="length">{movieData.length}</span>
				<span> | </span>
				<span data-testid="director">{movieData.director}</span>
			</div>
			<span className={styles.info} data-testid="cast">
				Cast: {movieData.cast.join(', ')}
			</span>
			<p data-testid="paragraph">Movie Description: {movieData.overview}</p>
		</div>
	);
};

export default MovieDetails;
