import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';

import AddPetForm from '../AddPetForm/AddPetForm'
import PetList from '../PetList/PetList'

class App extends Component {

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_OWNERS'})
    this.props.dispatch({type: 'FETCH_PETS'})
  }
  
  render() {
    return (
      <div className="App">
        <h1>Pets & Owners</h1>
        <AddPetForm />
        <PetList />
      </div>
    );
  }
}

export default connect()(App);
