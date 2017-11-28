import React, { Component } from 'react';

import AddMap from './components/AddMap';
import Utils from './utils';
import Store from './store';
import './styles.scss';


class App extends Component {

  componentWillMount() {
    Store.registerSocket();
    this.setState(Store.getCurrentState());
  }

  componentDidMount() {
    this.handleAuth();
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  render() {
    console.log('render', this.state)
    let user = 'New user'
    if (this.state.user) {
      user = this.state.user.name;
    }
    return (
      <div>
        <h1>Welcome to Ratataskr!</h1>
        <p><br/>
          <a className="button" href="/auth/google" onClick={this.handleAuth}>Login With Google</a>
        </p>
        <p>User: {user}</p>
        <AddMap socket={this.state.socket}/>
        <p>Maps: </p>
      </div>
    );
  }

  handleAuth() {
    Utils.authenticate(this.state.socket, this.state.app)
  }
  //when state object change is emitted, resets state so that changes can be filtered to appropriate components
   onChange = () => {
     this.setState(Store.getCurrentState());
   }
}

export default App;
