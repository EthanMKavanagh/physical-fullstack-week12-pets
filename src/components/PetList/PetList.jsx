import React, {Component} from 'react';
import {connect} from 'react-redux';

class PetList extends Component {

  render() {
    return (
      <ul>
        { 
          this.props.pets.map( item =>  
            <li key={item.id}>Pet:{ item.pet_name } Owner: {item.owner_name}</li>) 
        }
      </ul>
    )
  }
}

const putReduxStateOnProps = (reduxState) => {
  return {
    pets : reduxState.pets
  }
}

export default connect(putReduxStateOnProps)(PetList);