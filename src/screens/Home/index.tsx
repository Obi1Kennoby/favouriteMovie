import * as React from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native'

import styles from './styles'
import { getMovies, Movie, ReduxState, updateMovie } from '../../state'
import { connect } from 'react-redux'

import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
import ListItem from './components/ListItem'

if (__DEV__) {
  // tslint:disable-next-line
  console.trace = Reactotron.log
  Reactotron.configure() // controls connection & communication settings
    .useReactNative({}) // add all built-in react native plugins
    .use(reactotronRedux())
    .connect() // let's connect!
}

interface Props {
  dispatch
  movies: Movie[]
}

interface State {
  movieName: string
  ratings: string
  duration: string
  searchText: string
}

const mapStateToProps = (state: ReduxState) => {
  return {
    movies: getMovies(state),
  }
}

class HomeView extends React.PureComponent<Props, State> {
  state: State = {
    movieName: '',
    ratings: '',
    duration: '',
    searchText: '',
  }

  getMinutes(time: string) {
    const lastChar = time.slice(time.length - 1)
    if (lastChar === 'h') {
      return parseFloat(time.slice(0, -1)) * 60
    } else if (lastChar === 'm') {
      return parseInt(time.slice(0, -1), 10)
    }

    throw new Error('Invalid time format')
  }

  get isSubmitEnabled() {
    const { movieName, duration, ratings } = this.state
    return movieName && duration && ratings
  }

  renderField(title: string, input: string, textChangedHandle: (text: string) => void) {
    return (
      <View style={styles.field}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          style={styles.input}
          placeholder={title}
          value={input}
          onChangeText={textChangedHandle}
        />
      </View>
    )
  }

  onMovieNameChanged = (movieName: string) => {
    this.setState({ movieName })
  }

  onRatingsChanged = (ratings: string) => {
    this.setState({ ratings })
  }

  onDurationChanged = (duration: string) => {
    this.setState({ duration })
  }

  onSearchTextChanged = (searchText: string) => {
    this.setState({ searchText })
  }

  submit = () => {
    const { movieName, duration, ratings } = this.state
    try {
      this.props.dispatch(
        updateMovie({ name: movieName, duration: this.getMinutes(duration), ratings }),
      )
    } catch (e) {
      alert(e)
    }
  }

  renderItem = ({ item }) => {
    return <ListItem cells={[item.name, item.ratings, item.duration + 'm']} />
  }

  renderHeader = () => (
    <ListItem textStyle={styles.title} cells={['Movie Name', 'Ratings', 'Duration']} />
  )

  render() {
    const { movieName, ratings, duration, searchText } = this.state

    const movies =
      searchText.length < 2
        ? this.props.movies
        : this.props.movies.filter(movie => movie.name.startsWith(searchText))

    return (
      <KeyboardAvoidingView style={styles.page} behavior="padding" enabled>
        {this.renderField('Movie Name', movieName, this.onMovieNameChanged)}
        {this.renderField('Ratings', ratings, this.onRatingsChanged)}
        {this.renderField('Duration', duration, this.onDurationChanged)}
        <View style={styles.submitButton}>
          <Button
            title={'Submit'}
            onPress={this.submit}
            disabled={!this.isSubmitEnabled}
          />
        </View>
        {this.renderField('Search', searchText, this.onSearchTextChanged)}
        {this.renderHeader()}
        {movies.length > 0 ? (
          <FlatList
            contentContainerStyle={styles.tableStyle}
            keyExtractor={m => m.name}
            data={movies.sort((a, b) => b.duration - a.duration)}
            renderItem={this.renderItem}
          />
        ) : (
          <Text style={styles.messageText}>No Result Found</Text>
        )}
      </KeyboardAvoidingView>
    )
  }
}

export default connect(mapStateToProps)(HomeView)
