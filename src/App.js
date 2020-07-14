import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Productlist from './components/Productlist';
import Cart from './components/cart';
import Details from './components//Details';
import Default from './components/Default';
import Modal from './components/Modal'

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route path={'/cart'} component={Cart} />
          <Route path={'/details'} component={Details} />
          <Route exact path={'/'} component={Productlist} />
          <Route component={Default} />
        </Switch>
        <Modal />
      </React.Fragment>
    );
  }
}

export default App;
