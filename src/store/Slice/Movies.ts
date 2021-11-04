import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { GenreWithMovies, MovieProps } from "../../utils/types";

export enum Status {
  LOADING = "LOADING",
  FULLFILLED = "FULLFILED",
  REJECTED = "REJECTED",
}

interface initialStateProps {
  data: GenreWithMovies[] | undefined;
  status: Status;
  generes: string[] | undefined;
  error: string | null;
}
const initialState: initialStateProps = {
  data: undefined,
  generes: undefined,
  status: Status.LOADING,
  error: null,
};

export function genereMovies(generesArray: string[], movies: MovieProps[]) {
  const moviesWithGenere: GenreWithMovies[] = generesArray.map(
    (genre: string) => {
      const moviesForGenre = movies.filter((movie: MovieProps) =>
        movie.genres.includes(genre)
      );
      return {
        name: genre,
        movies: moviesForGenre,
      };
    }
  );
  return moviesWithGenere;
}

export const getMovies = createAsyncThunk("movies/getMovies", async () => {
  const response = await axios.get("/movies");

  const generes: string[] = Array.from(
    new Set(response.data.movies.flatMap((movie: MovieProps) => movie.genres))
  );
  const MoviesList = genereMovies(generes, response.data.movies);

  if (response.status !== 200) {
    return {
      message: "Failed to fetch movies.",
    };
  }
  return {
    generes,
    moviesWithGenere: MoviesList,
  };
});

const userSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMoviesData: (state, { payload }) => {
      state = { ...state, data: payload };
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(getMovies.fulfilled, (state, { payload }) => {
      state.data = payload.moviesWithGenere;
      state.generes = payload.generes;
      state.status = Status.FULLFILLED;
    });
    builder.addCase(getMovies.rejected, (state, { payload }: any) => {
      if (payload) state.error = payload.message;
      state.status = Status.REJECTED;
    });
  },
});

export default userSlice.reducer;

export const { setMoviesData } = userSlice.actions;
