import React, {Component} from 'react';
import {connect} from 'react-redux';

class AddPetForm extends Component {

  state = {
    name : '',
    owner_id : 0,
  }

  handleOwnerChange = (event) => {
    console.log(event.target.value);
    this.setState({
      owner_id : event.target.value,
    })
  } 

  handlePetNameChange = (event) => {
    this.setState({
      name: event.target.value,
    })
  }

  handleClick = () => {
    console.log(this.state)
    this.props.dispatch({type: 'ADD_PET', payload: this.state});
  }

  render() {
    return (
      <div>
        <h2>Add Pet</h2>
        <input onChange={this.handlePetNameChange} />
        
        {/* drop down with owner names */}
        <select value={this.state.owner_id} onChange={this.handleOwnerChange}>
            <option disabled value="0">Pick One!</option>
          {this.props.owners.map( owner => {
            return (
              <option key={owner.id} value={owner.id}>{owner.name}</option>
            )
          })}
        </select>

        <button onClick={this.handleClick}>Add pet!</button>
      </div>
    )
  }
}

const putReduxStateOnProps = (reduxState) => {
  return {
    owners : reduxState.owners,
  }
}

export default connect(putReduxStateOnProps)(AddPetForm);