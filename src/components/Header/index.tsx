import axios from 'axios';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { genereMovies, setMoviesData } from '../../store/Slice/Movies';
import { useAppDispatch, useAppSelector } from '../../store/store';
import styles from './Header.module.css';
import { ReactComponent as SearchIcon } from './Search.svg';
import _ from 'lodash';

const Header = () => {
	const [search, setSearch] = useState<string>('');
	const dispatch = useAppDispatch();
	const { movies } = useAppSelector((data) => data);
	const location = useLocation();
	const history = useHistory();
	const handleSubmit = async (
		event: React.KeyboardEvent<HTMLInputElement>,
		value: string
	) => {
		event?.preventDefault();
		const response = await axios.get(`/movies?q=${value.toLowerCase().trim()}`);
		if (location.pathname !== '/') {
			history.push('/');
		}

		const resultMovies =
			movies.generes && genereMovies(movies.generes, response.data.movies);
		dispatch(setMoviesData(resultMovies));
	};

	const delayedQuery = useCallback(
		_.debounce((e) => handleSubmit(e, e.target.value), 300),
		[]
	);
	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
		delayedQuery(event);
	};

	return (
		<div className={styles.headerContainer}>
			<div className={styles.logo}>
				<span>Wookie</span>
				<span>Moovies</span>
			</div>
			<div className={styles.search}>
				<SearchIcon className={styles.icon} />
				<input
					type="text"
					autoComplete="off"
					placeholder="Search movies..."
					onChange={onChange}
					value={search}
				/>
			</div>
		</div>
	);
};

export default Header;
