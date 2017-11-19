import React, { Component } from 'react';

import AddMap from './components/AddMap';
import Utils from './utils';
import Store from './store';
import './styles.scss';


class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    // name: currentUser.name,
    maps: []
  };
}

  componentWillMount() {
    Store.registerSocket();
    this.setState(Store.getCurrentState());
    console.log('state', this.state)
  }

  // componentDidMount() {
  //   console.log('this', this)
  //   // Store.addChangeListener(this.onChange);
  // }
  //
  // componentWillUnmount() {
  //   Store.removeChangeListener(this.onChange);
  // }

  render() {
    return (
      <div>
        <h1>Welcome to Ratataskr!</h1>
        <p><br/>
          <a className="button" href="/auth/google" onClick={Utils.authenticate(this.state.socket, this.state.app)}>Login With Google</a>
        </p>
        <p>User: {this.state.user}</p>
        <AddMap socket={this.state.socket}/>
        <p>Maps: {this.state.maps}</p>
      </div>
    );
  }
}

export default App;
