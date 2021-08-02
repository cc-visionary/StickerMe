import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { toast } from "react-toastify";

import { Navbar, Footer } from "./components";
import {
  Admin,
  Customer,
  Landing,
  Login,
  Signup,
  Loading,
  PageNotFound,
} from "./pages";
import { AdminRoute, CustomerRoute, LoginRoute } from "./utils";
import { getUser } from "./utils/store";

import "./assets/styles/App.css";

// Import toastify css file
import "react-toastify/dist/ReactToastify.css";

// toast-configuration method,
// it is compulsory method.
toast.configure();

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: getUser(),
    };
  }

  render() {
    const { user } = this.state;
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
                <AdminRoute path="/admin" component={Admin} />
                <CustomerRoute path="/customer" component={Customer} />
                <LoginRoute path="/login" component={Login} />
                <LoginRoute path="/signup" component={Signup} />
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
