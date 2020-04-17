import React, {Component} from 'react';
import {connect} from 'react-redux';

class PetList extends Component {

  render() {
    return (
      <ul>
        { 
          this.props.pets.map( item =>  
            <li>Pet:{ item.pet_name } Owner: {item.owner_name}</li>) 
        }
      </ul>
    )
  }
}

const putReduxStateOnProps = (redux) => {
  return {
    pets : redux.pets
  }
}

export default connect(putReduxStateOnProps)(PetList);