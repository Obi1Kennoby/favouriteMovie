import * as React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import HomeView from './screens/Home'

import { store } from './state/store'
// iPhone X safe area (top and bottom color)
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default class Setup extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Provider store={store}>
          <HomeView />
        </Provider>
      </SafeAreaView>
    )
  }
}
