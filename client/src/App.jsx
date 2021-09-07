import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { toast } from 'react-toastify';

// import { AdminNavbar, CustomerNavbar, Footer } from './components';
import { PublicNavbar, AdminNavbar, CustomerNavbar } from './components';
import {
  AdminHome,
  AdminLocked,
  AdminOrders,
  Users,
  EditFeatures,
  Characters,
  Checkout,
  Contacts,
  CustomerHome,
  Profile,
  CustomerLocked,
  CustomerOrders,
  EditCharacter,
  EditSelectPose,
  EditNameDescription,
  Order,
  Landing,
  Login,
  Signup,
  Loading,
  PageNotFound,
} from './pages';
import {
  AdminRoute,
  CustomerRoute,
  LockedRoute,
  PublicRoute,
} from './utils';

import './assets/styles/App.css';

// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
import {
  getCharacter, getCharacterDetails, getPoses, getUser,
} from './utils/store';

// toast-configuration method,
// it is compulsory method.
toast.configure();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log([
      getUser() != null,
      getCharacter() != null,
      getPoses() != null,
      getCharacterDetails() != null,
    ]);
    return (
      <Suspense fallback={<Loading />}>
        <Router>
          <div className="app">
            <Switch>
              <Route path="/customer" component={CustomerNavbar} />
              <Route path="/admin" component={AdminNavbar} />
              <Route path="/" component={PublicNavbar} />
            </Switch>
            <div id="main">
              <Switch>
                <LockedRoute path="/customer/locked" component={CustomerLocked} />
                <LockedRoute path="/admin/locked" component={AdminLocked} />
                <AdminRoute path="/admin/users" component={Users} />
                <AdminRoute path="/admin/features" component={EditFeatures} />
                <AdminRoute path="/admin/orders" component={AdminOrders} />
                <AdminRoute path="/admin" component={AdminHome} />
                <CustomerRoute path="/customer/characters/edit-character" component={EditCharacter} />
                <CustomerRoute path="/customer/characters/edit-select-pose" component={EditSelectPose} />
                <CustomerRoute path="/customer/characters/edit-name-description" component={EditNameDescription} />
                <CustomerRoute path="/customer/characters/order" component={Order} />
                <CustomerRoute path="/customer/characters" component={Characters} />
                <CustomerRoute path="/customer/profile" component={Profile} />
                <CustomerRoute path="/customer/contacts" component={Contacts} />
                <CustomerRoute path="/customer/orders" component={CustomerOrders} />
                <CustomerRoute path="/customer/checkout" component={Checkout} />
                <CustomerRoute path="/customer" component={CustomerHome} />
                <PublicRoute exact path="/" component={Landing} />
                <PublicRoute path="/login" component={Login} />
                <PublicRoute path="/signup" component={Signup} />
                <PublicRoute component={PageNotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Suspense>
    );
  }
}
