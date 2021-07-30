import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./assets/styles/App.css";

import { Navbar, Footer } from "./components";
import { Admin, User, Landing, Login, PageNotFound } from "./pages";
import { UserService } from "./services";
import { AdminRoute, UserRoute, LoginRoute } from "./utils";
import { removeUserSession } from "./utils/common";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    UserService.getLogin().then((res) => {
      const { success } = res.data;
      if (!success) removeUserSession();
    });
    UserService.getAllUsers().then((res) => {
      const { success, result } = res.data;
      if (success) {
        this.setState({ users: result });
      } else {
        console.log("Failed to get the Users from the Database");
      }
    });
  }

  render() {
    const { users } = this.state;

    return (
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
              <UserRoute path="/user" component={User} />
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
    );
  }
}
