import React, { Component } from 'react';

import '../styles.scss';

class AddMap extends Component {
  constructor(props) {
  super(props);
  this.state = { };
}

  newMap(){
    this.props.socket.emit('maps::create', {title:'New from Component', coordinatesRange: [0,0] }, (error, data) => {
      console.log('new map', data)
      if (error) {
        console.error(error)
      }
    })
  }

  render() {
    return (
      <a onClick={this.newMap.bind(this)}>Add new map</a>
    );
  }
}

export default AddMap;
