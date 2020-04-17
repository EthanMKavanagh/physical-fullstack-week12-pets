import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  //Watch for actions, trigger other sagas
  yield takeEvery('FETCH_OWNERS', fetchOwners)
  yield takeEvery('FETCH_PETS', fetchPets)
  yield takeEvery('ADD_PET', addPet)
}

function* fetchOwners() {
  // Trigger our get, and then send to redux
  //yield is like a step in the process
  try {
    let ownersResponse = yield axios.get('/api/owners');
    yield put({type: 'SET_OWNERS', payload: ownersResponse.data })
  } catch(err) {
    console.log(err)
  }
   
}

function* fetchPets() {
  // Trigger our get, and then send to redux
  //yield is like a step in the process
  try {
    let petsResponse = yield axios.get('/api/pets');
    yield put({type: 'SET_PETS', payload: petsResponse.data })
  } catch(err) {
    console.log(err)
  }
   
}

function* addPet(action) {
  yield axios.post('/api/pets', action.payload)
  yield put ({type: 'FETCH_PETS'})
}

const owners = (state = [], action) => {
  // Watch for set_owners, and then save the data
  switch (action.type) {
    case 'SET_OWNERS':
      return action.payload;
    default:
      return state
  }
}

const pets = (state = [], action) => {
  // Watch for set_owners, and then save the data
  switch (action.type) {
    case 'SET_PETS':
      return action.payload;
    default:
      return state
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

const storeInstance = createStore(
  combineReducers({
    owners,
    pets
  }),
  applyMiddleware(sagaMiddleware, logger)
)

sagaMiddleware.run(rootSaga);


ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
