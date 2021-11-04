import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Details from '../pages/Details/index';
import { BrowserRouter } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails';

const data = {
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
		'Batman raises the stakes in his war on crime. With the help of Lt.',
	poster:
		'https://wookie.codesubmit.io/static/posters/d6822b7b-48bb-4b78-ad5e-9ba04c517ec8.jpg',
	released_on: '2008-07-16T00:00:00',
	slug: 'the-dark-knight-2008',
	title: 'The Dark Knight',
};

afterEach(cleanup);

describe('Testing Details Page', () => {
	it('Renders Details Component', async () => {
		await render(
			<BrowserRouter>
				<Provider store={store}>
					<Details />
				</Provider>
			</BrowserRouter>
		);

		// asserts that if details container is loaded onto the screen.
		expect(screen.getByTestId('details')).toBeInTheDocument();

		// asserts that if movie poster is loaded onto the screen.
		expect(screen.getByRole('img')).toBeInTheDocument();
	});
	it('Renders MovieDetails Component', async () => {
		await render(
			<BrowserRouter>
				<Provider store={store}>
					<MovieDetails movieData={data} />
				</Provider>
			</BrowserRouter>
		);

		// asserts that if title is loaded onto the screen.
		expect(screen.getByTestId('titleContainer')).toBeInTheDocument();

		// asserts that if the title loaded is from the data.
		expect(
			screen.getByRole('heading', { name: 'The Dark Knight' })
		).toBeInTheDocument();

		// asserts that if other details are loaded onto the screen.
		expect(screen.getByTestId('released')).toBeInTheDocument();
		expect(screen.getByTestId('length')).toBeInTheDocument();
		expect(screen.getByTestId('director')).toBeInTheDocument();
		expect(screen.getByTestId('cast')).toBeInTheDocument();
		expect(screen.getByTestId('paragraph')).toBeInTheDocument();
	});
});
