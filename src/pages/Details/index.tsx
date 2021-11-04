import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import MovieDetails from '../../components/MovieDetails';
import { useAppSelector } from '../../store/store';
import { MovieProps } from '../../utils/types';
import styles from './Details.module.css';
interface DetailsProps {
	slug: string;
}

const Details = () => {
	const { slug } = useParams<DetailsProps>();
	const { movies } = useAppSelector((state) => state);
	const [currentMovie, setMovie] = useState<MovieProps>();

	useEffect(() => {
		movies.data?.map((genere) =>
			genere.movies.filter((movie) => movie.slug === slug && setMovie(movie))
		);
	}, [slug, movies]);

	return (
		<div className={styles.detailsContainer} data-testid="details">
			<img src={currentMovie?.poster} alt={currentMovie?.title} />
			{currentMovie && <MovieDetails movieData={currentMovie} />}
		</div>
	);
};

export default Details;
