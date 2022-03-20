import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/index'

// export default function configureStore(initialState) {
//    return createStore(reducer, initialState)
// }

const store = createStore(reducers, applyMiddleware(thunk))

export default store
