import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './assets/styles/App.css';

import { Navbar, Footer } from './components';
import {
  Admin,
  Customer,
  Landing,
  Login,
  Loading,
  PageNotFound,
} from './pages';
import { UserService } from './services';
import { AdminRoute, CustomerRoute, LoginRoute } from './utils';
import { getUser } from './utils/store';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      user: getUser(),
    };
  }

  componentDidMount() {
    UserService.getAllUsers().then((res) => {
      const { success, result } = res.data;
      if (success) {
        this.setState({ users: result });
      } else {
        console.log('Failed to get the Users from the Database');
      }
    });
  }

  render() {
    const { user, users } = this.state;
    console.log(user);

    return (
      <Suspense fallback={<Loading />}>
        <Router>
          <div className="app">
            <Switch>
              {/* No Navbar for the Login Page */}
              <Route path="/login" component={() => <></>} />
              {/* With Navbar for all the other pages */}
              <Route path="/" component={Navbar} />
            </Switch>
            <div id="main">
              <Switch>
                <Route exact path="/" component={Landing} />
                <AdminRoute
                  path="/admin"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  component={(props) => <Admin {...props} users={users} />}
                />
                <CustomerRoute path="/customer" component={Customer} />
                <LoginRoute path="/login" component={Login} />
                <Route component={PageNotFound} />
              </Switch>
            </div>
            <Switch>
              {/* No Footer for the Login Page */}
              <Route path="/login" component={() => <></>} />
              {/* With Footer for all the other pages */}
              <Route path="/" component={Footer} />
            </Switch>
          </div>
        </Router>
      </Suspense>
    );
  }
}
