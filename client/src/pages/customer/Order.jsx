/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  const countries = ['Philippines', 'United Stated of America'];
  const cities = ['Manila', 'Quezon'];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [zipcode, setzipcode] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [fnError, setFNError] = useState(null);
  const [lnError, setLNError] = useState(null);
  const [a1Error, setA1Error] = useState(null);
  const [ctrError, setCTRError] = useState(null);
  const [ctyError, setCTYError] = useState(null);
  const [ppError, setPPError] = useState(null);
  const [pError, setPError] = useState(null);
  const [zError, setZError] = useState(null);

  const validateFields = () => {
    let valid = true;
    if (firstName === '') {
      setFNError('First Name is required');
      valid = false;
    } else {
      setFNError(null);
    }
    if (lastName === '') {
      setLNError('Last Name is required');
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
    if (country === '') {
      setCTRError('Country is required');
      valid = false;
    } else {
      setCTRError(null);
    }
    if (city === '') {
      setCTYError('City is required');
      valid = false;
    } else {
      setCTYError(null);
    }
    if (phone === '') {
      setPError('Phone is required');
      valid = false;
    } else {
      setPError(null);
    }
    if (paypalEmail === '') {
      setPPError('Paypal Email is required');
      valid = false;
    }
    if (zipcode === '') {
      setZError('Zip Code is required');
      valid = false;
    } else {
      setZError(null);
    }
    return valid;
  };

  const onBack = () => {
    props.history.push('/customer/characters/edit-name-description');
  };

  const onOrder = () => {
    if (validateFields()) {
      const character = {
        ...getCharacter(),
        ...getCharacterDetails(),
        poses: getPoses(),
        username: getUser().uname,
        status: 'order',
      };

      CharacterService.addCharacter(character)
        .then((characterRes) => {
          const { result: characterResult } = characterRes.data;
          const contact = {
            username: getUser().uname,
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
          ContactService.addContact(contact)
            .then((contactRes) => {
              const { result: contactResult } = contactRes.data;
              const order = {
                username: contactResult.username,
                contactID: contactResult._id,
                characterID: characterResult._id,
                totalPrice: 5 * getPoses().length,
                date: new Date(),
                additionalNotes,
              };
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
        })
        .catch((err) => {
          const { error } = err.response.data;
          console.log(error);
        });
    }
  };

  return getCharacterToken() && getCharacterDetails() && getPoses() ? (
    <div id="order-character">
      <div className="container">
        <div className="title-bar">
          <span className="title-text">Order</span>
        </div>
        <div className="container-inner">
          <div className="left-form">
            <FormInput title="First Name" inputValue={firstName} onChange={setFirstName} error={fnError} required />
            <FormInput title="Last Name" inputValue={lastName} onChange={setLastName} error={lnError} required />
            <FormInput title="Paypal Email" inputValue={paypalEmail} onChange={setPaypalEmail} error={ppError} required />
            <FormInput title="Phone Number" inputValue={phone} onChange={setPhone} error={pError} required />
            <FormInput title="Address Line 1" inputValue={address1} onChange={setAddress1} error={a1Error} required />
            <FormInput title="Address Line 2" inputValue={address2} onChange={setAddress2} />
            <FormSelect title="Country" inputValue={country} onChange={setCountry} options={countries} error={ctrError} required />
            <FormSelect title="City" inputValue={city} onChange={setCity} options={cities} error={ctyError} required />
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
