import GenresList from '../../components/MoviesList/GenresList';
import { Status } from '../../store/Slice/Movies';
import { useAppSelector } from '../../store/store';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
import styles from './Home.module.css';

const override = css`
	display: block;
	margin: 0 auto;
	border-color: #ffffff;
`;
const Home = () => {
	const { movies } = useAppSelector((data) => data);
	if (movies.status === Status.LOADING) {
		return (
			<div className={styles.homeContainer} data-testid="home">
				<ClipLoader color="#ffffff" loading={true} css={override} size={150} />
			</div>
		);
	}
	return (
		<div className={styles.homeContainer} data-testid="home">
			{movies.data?.map((genere, id) => (
				<GenresList generes={genere} id={id} key={id} />
			))}
		</div>
	);
};

export default Home;
