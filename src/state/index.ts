import { combineReducers } from 'redux'

// SELECTORS
export const getMovies = (state: ReduxState): Movie[] => state.movies

// SHAPE
export interface Movie {
  name: string
  duration: number
  ratings: string
}

// ACTIONS
const PUT_MOVIE = 'PUT_MOVIE'

// ACTION CREATORS
const putMovieToStore = (movie: Movie) => ({ type: PUT_MOVIE, payload: { movie } })

// THUNK
export function updateMovie(movie: Movie) {
  return async dispatch => {
    // pretend that we send it by REST API
    dispatch(putMovieToStore(movie))
  }
}

// REDUCER
function movies(state: Movie[] = [], action): Movie[] {
  switch (action.type) {
    case PUT_MOVIE:
      if (state.findIndex(e => e.name === action.payload.movie.name) > -1) {
        return state.map(e =>
          e.name === action.payload.movie.name ? action.payload.movie : e,
        )
      } else {
        return state.concat(action.payload.movie)
      }
    default:
      return state
  }
}

export interface ReduxState {
  movies: Movie[]
}

const appReducer = combineReducers({
  movies,
})

export default appReducer
