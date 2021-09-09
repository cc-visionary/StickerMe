/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import countriesCity from '../../utils/countries.json';

import '../../assets/styles/pages/customer/Order.css';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import { CharacterService, ContactService, OrderService } from '../../services';
import {
  getCharacterToken,
  removeLocalCharacterDetails,
  removeLocalCharacter,
  removeLocalPoses,
  getCharacter,
  getCharacterDetails,
  getPoses,
  getUser,
} from '../../utils/store';

const Order = (props) => {
  const countries = Object.keys(countriesCity);
  const [cities, setCities] = useState([...new Set(countriesCity.Philippines)]);

  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [country, setCountry] = useState('Philippines');
  const [city, setCity] = useState('Manila');
  const [zipcode, setzipcode] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [fnError, setFNError] = useState(null);
  const [lnError, setLNError] = useState(null);
  const [a1Error, setA1Error] = useState(null);
  const [ppError, setPPError] = useState(null);
  const [pError, setPError] = useState(null);
  const [zError, setZError] = useState(null);

  const validateFields = () => {
    let valid = true;
    const reName = /(?=.*[\d\W_])/;
    if (firstName === '') {
      setFNError('First Name is required');
      valid = false;
    } else if (reName.test(firstName)) {
      setFNError('Only uppercase and lower case letters are allowed');
      valid = false;
    } else {
      setFNError(null);
    }
    if (lastName === '') {
      setLNError('Last Name is required');
      valid = false;
    } else if (reName.test(lastName)) {
      setLNError('Only uppercase and lower case letters are allowed');
      valid = false;
    } else {
      setLNError(null);
    }
    if (address1 === '') {
      setA1Error('Address Line 1 is required');
      valid = false;
    } else {
      setA1Error(null);
    }
    if (phone === '') {
      setPError('Phone is required');
      valid = false;
    } else {
      setPError(null);
    }
    const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (paypalEmail === '') {
      setPPError('Paypal Email is required');
      valid = false;
    } else if (!reEmail.test(paypalEmail)) {
      setPPError('Invalid email format');
      valid = false;
    } else {
      setPPError(null);
    }
    const reDigits = /\b[\d]+\b/;
    if (phone === '') {
      setPError('Phone Number is required');
      valid = false;
    } else if (phone[0] !== '0' && phone[1] !== '9') {
      setPError('Phone Number must be start with 09');
      valid = false;
    } else if (!reDigits.test(phone)) {
      setPError('Phone Number can only contain digits');
      valid = false;
    } else if (phone.length !== 11) {
      setPError('Phone Number must be 11 digits');
      valid = false;
    } else {
      setPError(null);
    }
    if (zipcode === '') {
      setZError('Zip Code is required');
      valid = false;
    } else if (!reDigits.test(zipcode)) {
      setZError('Zip Code can only contain digits');
      valid = false;
    } else {
      setZError(null);
    }
    return valid;
  };

  const onChangeCountry = (val) => {
    setCountry(val);
    setCities([...new Set(countriesCity[val])]);
    setCity(countriesCity[val][0]);
  };

  const onBack = () => {
    props.history.push('/customer/characters/edit-name-description');
  };

  const onOrder = () => {
    if (validateFields()) {
      const charDetails = {
        ...getCharacter(),
        ...getCharacterDetails(),
      };
      const character = {
        ...charDetails,
        poses: getPoses(),
        username: getUser().uname,
      };
      const contact = {
        username: character.username,
        firstName,
        lastName,
        phone,
        address1,
        address2,
        city,
        country,
        zipcode,
        paypalEmail,
      };
      const order = {
        username: contact.username,
        contact,
        character,
        totalPrice: 5 * charDetails.quantities.reduce((a, b) => a + b),
        additionalNotes,
      };
      console.log(order);

      if (window.confirm('Do you wish to save this character for future use?')) {
        CharacterService.addCharacter(character)
          .then(() => {
            toast.success('Character was successfully added to the database');
            if (window.confirm('Do you wish to save this contact details for future use?')) {
              ContactService.addContact(contact)
                .then(() => {
                  toast.success('Contact was successfully added to the database');
                  OrderService.addOrder(order)
                    .then(() => {
                      removeLocalCharacter();
                      removeLocalPoses();
                      removeLocalCharacterDetails();
                      toast.success('Character was ordered successfully');
                      props.history.push('/customer/characters');
                    })
                    .catch((err) => {
                      const { error } = err.response.data;
                      console.log(error);
                    });
                })
                .catch((err) => {
                  const { error } = err.response.data;
                  console.log(error);
                });
            } else {
              OrderService.addOrder(order)
                .then(() => {
                  removeLocalCharacter();
                  removeLocalPoses();
                  removeLocalCharacterDetails();
                  toast.success('Character was ordered successfully');
                  props.history.push('/customer/characters');
                })
                .catch((err) => {
                  const { error } = err.response.data;
                  console.log(error);
                });
            }
          })
          .catch((err) => {
            const { error } = err.response.data;
            console.log(error);
          });
      } else if (window.confirm('Do you wish to save this contact details for future use?')) {
        ContactService.addContact(contact)
          .then(() => {
            toast.success('Character was successfully added to the database');
            OrderService.addOrder(order)
              .then(() => {
                removeLocalCharacter();
                removeLocalPoses();
                removeLocalCharacterDetails();
                toast.success('Character was ordered successfully');
                props.history.push('/customer/characters');
              })
              .catch((err) => {
                const { error } = err.response.data;
                console.log(error);
              });
          })
          .catch((err) => {
            const { error } = err.response.data;
            console.log(error);
          });
      } else {
        OrderService.addOrder(order)
          .then(() => {
            removeLocalCharacter();
            removeLocalPoses();
            removeLocalCharacterDetails();
            toast.success('Character was ordered successfully');
            props.history.push('/customer/characters');
          })
          .catch((err) => {
            const { error } = err.response.data;
            console.log(error);
          });
      }
    }
  };

  const onSelectContact = (val) => {
    if (val === 'Add New Contact') {
      setFirstName('');
      setLastName('');
      setPhone('');
      setPaypalEmail('');
      setAddress1('');
      setAddress2('');
      setCountry('Philippines');
      setCity('Manila');
      setzipcode('');
      setAdditionalNotes('');
    } else {
      const index = contacts.map((c) => `${c.firstName} ${c.lastName}`).indexOf(val);
      const currContact = contacts[index];
      setFirstName(currContact.firstName);
      setLastName(currContact.lastName);
      setPhone(currContact.phone);
      setPaypalEmail(currContact.paypalEmail);
      setAddress1(currContact.address1);
      setAddress2(currContact.address2);
      setCountry(currContact.country);
      setCity(currContact.city);
      setzipcode(currContact.zipcode);
      setAdditionalNotes(currContact.additionalNotes);
    }
    setCurrentContact(val);
  };

  useEffect(() => {
    ContactService.getContactsByUsername(getUser().uname).then((res) => {
      const { result } = res.data;

      setContacts([...result]);
      onSelectContact('Add New Contact');
    });
  }, []);

  return getCharacterToken() && getCharacterDetails() && getPoses() ? (
    <div id="order-character">
      <div className="container">
        <div className="title-bar">
          <span className="title-text">Order</span>
        </div>
        <div className="contact-select">
          <FormSelect title="Contact" inputValue={currentContact} onChange={onSelectContact} options={[...contacts.map((c) => `${c.firstName} ${c.lastName}`), 'Add New Contact']} required />
        </div>
        <div className="container-inner">
          <div className="left-form">
            <FormInput title="First Name" inputValue={firstName} onChange={setFirstName} error={fnError} required />
            <FormInput title="Last Name" inputValue={lastName} onChange={setLastName} error={lnError} required />
            <FormInput title="Paypal Email" inputValue={paypalEmail} onChange={setPaypalEmail} error={ppError} required />
            <FormInput title="Phone Number" inputValue={phone} onChange={setPhone} error={pError} required />
            <FormInput title="Address Line 1" inputValue={address1} onChange={setAddress1} error={a1Error} required />
            <FormInput title="Address Line 2" inputValue={address2} onChange={setAddress2} />
            <FormSelect title="Country" inputValue={country} onChange={(val) => onChangeCountry(val)} options={countries} required />
            <FormSelect title="City" inputValue={city} onChange={setCity} options={cities} required />
            <FormInput title="Zip Code" inputValue={zipcode} onChange={setzipcode} error={zError} required />
          </div>
          <div className="right-form">
            <p>Additional Instructions</p>
            <textarea value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} name="additional-instructions" />
          </div>
        </div>
      </div>
      <div className="buttons">
        <button className="back-button" type="button" onClick={onBack}>
          <span />
          Back
        </button>
        <button className="order-button" type="button" onClick={onOrder}>
          <span />
          Order
        </button>
      </div>
    </div>
  ) : <Redirect to="/customer/characters/edit-character" />;
};

export default Order;
