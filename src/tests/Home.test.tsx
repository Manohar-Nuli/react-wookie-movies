import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Home from '../pages/Home/index';
import GenresList from '../components/MoviesList/GenresList';
import { BrowserRouter } from 'react-router-dom';

const data = [
	{
		backdrop:
			'https://wookie.codesubmit.io/static/backdrops/d6822b7b-48bb-4b78-ad5e-9ba04c517ec8.jpg',
		cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
		classification: '13+',
		director: 'Christopher Nolan',
		genres: ['Action', 'Crime', 'Drama'],
		id: 'd6822b7b-48bb-4b78-ad5e-9ba04c517ec8',
		imdb_rating: 9,
		length: '2h 32min',
		overview:
			'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.',
		poster:
			'https://wookie.codesubmit.io/static/posters/d6822b7b-48bb-4b78-ad5e-9ba04c517ec8.jpg',
		released_on: '2008-07-16T00:00:00',
		slug: 'the-dark-knight-2008',
		title: 'The Dark Knight',
	},
];

afterEach(cleanup);

describe('Testing Home Page', () => {
	it('Render Home Component without fail', async () => {
		await render(
			<Provider store={store}>
				<Home />
			</Provider>
		);
		expect(screen.getByTestId('home')).toBeInTheDocument();
	});

	it('Render GenresList Component with movies', async () => {
		await render(
			<BrowserRouter>
				<Provider store={store}>
					<GenresList id={1} generes={{ name: 'Genere1', movies: data }} />
				</Provider>
			</BrowserRouter>
		);
		// asserts if the genre heading is loaded onto the screen.
		expect(
			screen.getByRole('heading', { name: 'Genere1' })
		).toBeInTheDocument();
		// asserts if movies list container is loaded onto the screen.
		expect(screen.getByTestId('moviesList')).toBeInTheDocument();
		// asserts if the movie posters are loaded onto the screen.
		expect(screen.getByRole('img')).toBeInTheDocument();
	});
});
