import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./assets/styles/App.css";

import { Navbar, Footer } from "./components";
import { Admin, PageNotFound } from "./pages";
import { UserService } from './services';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userType: "admin",
      users: [],
    };
  }

  componentDidMount = () => {
    UserService.getAllUsers().then((res) => {
      this.setState({ users: res.data });
    })
  }; 

  render() {
    const { userType, users } = this.state;

    return (
      <Router>
        <div className="app">
          <Navbar />
          <div id="main">
            {userType === "admin" ? (
              <Switch>
                <Route exact path="/" component={() => <Admin users={users} />} />
                <Route component={PageNotFound} />
              </Switch>
            ) : (
              <></>
            )}
            {userType === "user" ? (
              <Switch>
                <Route exact path="/" component={() => <h1>User Page Content</h1>} />
                <Route component={PageNotFound} />
              </Switch>
            ) : (
              <></>
            )}
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}
