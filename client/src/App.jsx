import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { toast } from 'react-toastify';

// import { AdminNavbar, CustomerNavbar, Footer } from './components';
import { AdminNavbar, CustomerNavbar } from './components';
import {
  Admin,
  Customer,
  Landing,
  Login,
  Signup,
  Loading,
  PageNotFound,
  AdminLocked,
} from './pages';
import { AdminRoute, CustomerRoute, LoginRoute } from './utils';

import './assets/styles/App.css';

// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';

// toast-configuration method,
// it is compulsory method.
toast.configure();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Suspense fallback={<Loading />}>
        <Router>
          <div className="app">
            <Switch>
              <Route path="/admin" component={AdminNavbar} />
              <Route path="/locked" component={AdminNavbar} />
              <Route path="/" component={CustomerNavbar} />
            </Switch>
            <div id="main">
              <Switch>
                <Route exact path="/" component={Landing} />
                <AdminRoute path="/admin/orders" component={() => <div>Orders</div>} />
                <AdminRoute path="/admin" component={Admin} />
                <CustomerRoute path="/customer" component={Customer} />
                <LoginRoute path="/login" component={Login} />
                <LoginRoute path="/signup" component={Signup} />
                <Route path="/admin-locked" component={AdminLocked} />
                <Route component={PageNotFound} />
              </Switch>
            </div>
            {/* <Switch>
              <Route path="/" component={Footer} />
            </Switch> */}
          </div>
        </Router>
      </Suspense>
    );
  }
}
