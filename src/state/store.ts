// if(__DEV__) {
//   import('../ReactotronConfig').then(() => {
//     console.trace('Reactotron Configured')
//   })
// }

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import Reactotron from 'reactotron-react-native'

import rootReducer from './index'

let middleware = applyMiddleware(thunk)

middleware = compose(
  middleware,
  Reactotron.createEnhancer(),
)

export const store = createStore(rootReducer, middleware)
