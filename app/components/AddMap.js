import React, { Component } from 'react';

import '../styles.scss';

class AddMap extends Component {
  constructor(props) {
  super(props);
  this.state = {
    mapTitle: '',
  };
}

  handleInput(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  newMap(event){
    event.preventDefault();
    let title = this.state.mapTitle;
    this.props.socket.emit('maps::create', {title: title, coordinatesRange: [0,0] }, (error, data) => {
      console.log('new map', data)
      if (error) {
        console.error(error)
      }
    })
  }

  render() {
    return (
      <form onSubmit={this.newMap.bind(this)}>
        <label>
          Map title:
          <input type='text' name='mapTitle' value={this.state.value} onChange={this.handleInput.bind(this)} />
        </label>
        <input type='submit' value='Submit' />
      </form>
    );
  }
}

export default AddMap;
