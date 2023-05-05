import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import fileReducer from './fileReducer'
import uploadReducer from './uploadReducer'
import userReducer from './userReducer'

const rootReducers = combineReducers({
  user: userReducer,
  files: fileReducer,
  upload: uploadReducer,
})

export const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)))
