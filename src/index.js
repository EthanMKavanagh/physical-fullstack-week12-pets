import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* rootSaga() {
  yield takeEvery('FETCH_OWNERS', fetchOwners);
  yield takeEvery('FETCH_PETS', fetchPets);
  yield takeEvery('ADD_PET', addPet);
}

function* fetchOwners() {
  try {
    let ownersResponse = yield axios.get('/api/owners');
    yield put({type: 'SET_OWNERS', payload: ownersResponse.data });    
  } catch(err) {
    console.log(err);
  }
}


function* fetchPets() {
  try {
    let petsResponse = yield axios.get('/api/pets');
    yield put({type: 'SET_PETS', payload: petsResponse.data });
  } catch(err) {
    console.log(err);
  }
}


function* addPet(action) {
  try {
    yield axios.post('/api/pets', action.payload);
    yield put ({type: 'FETCH_PETS'});
  } catch(err) {
    console.log(err);
  }
}

const owners = (state = [], action) => {
  switch (action.type) {
    case 'SET_OWNERS':
      return action.payload;
    default:
      return state;
  }
}

const pets = (state = [], action) => {
  switch (action.type) {
    case 'SET_PETS':
      return action.payload;
    default:
      return state;
  }
}

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
