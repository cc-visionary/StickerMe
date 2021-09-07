/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';

import '../../assets/styles/pages/customer/Characters.css';
import { ContactService } from '../../services';
import { getUser } from '../../utils/store';

class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
    };
  }

  componentDidMount() {
    ContactService.getContactsByUsername(getUser().uname)
      .then((res) => {
        const { result } = res.data;
        console.log(result);
        this.setState({ contacts: result });
      })
      .catch((err) => {
        const { error } = err.response.data;
        console.log(error);
      });
  }

  onDeleteContact(contact) {
    const { contacts } = this.state;

    ContactService.deleteContact(contact._id)
      .then(() => {
        this.setState({ contacts: contacts.filter((c) => c._id !== contact._id) });
      })
      .catch((err) => {
        const { error } = err.response.data;
        console.log(error);
      });
  }

  render() {
    const { contacts } = this.state;

    return (
      <div id="contacts-page">
        <h1>Contacts Page</h1>
        {contacts.map((c) => (
          <div>
            {c.firstName}
            {' '}
            {c.lastName}
            {' '}
            -
            {' '}
            {c.phone}
            <button type="button" onClick={() => this.onDeleteContact(c)}>DELETE</button>
          </div>
        ))}
      </div>
    );
  }
}

export default Contacts;
