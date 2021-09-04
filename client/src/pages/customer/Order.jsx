import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import '../../assets/styles/pages/customer/Order.css';
import FormInput from '../../components/FormInput';
import FormSelect from '../../components/FormSelect';
import {
  getCharacterToken, removeLocalCharacterDetails, removeLocalCharacter, removeLocalPoses,
} from '../../utils/store';

const Order = (props) => {
  const countries = ['Philippines', 'United Stated of America'];
  const cities = ['Manila', 'Quezon'];
  const provinces = ['Province 1', 'Province 2'];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [province, setProvince] = useState(null);
  const [zipCode, setZipCode] = useState('');

  const [fnError, setFNError] = useState(null);
  const [lnError, setLNError] = useState(null);
  const [a1Error, setA1Error] = useState(null);
  const [ctrError, setCTRError] = useState(null);
  const [ctyError, setCTYError] = useState(null);
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
    if (province === '') {
      setPError('Province is required');
      valid = false;
    } else {
      setPError(null);
    }
    if (zipCode === '') {
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
      removeLocalCharacter();
      removeLocalPoses();
      removeLocalCharacterDetails();
      props.history.push('/customer/orders');
    }
  };

  return getCharacterToken() ? (
    <div id="order-character">
      <div className="container">
        <div className="title-bar">
          <span className="title-text">Order</span>
        </div>
        <div className="container-inner">
          <div className="left-form">
            <FormInput title="First Name" inputValue={firstName} onChange={setFirstName} error={fnError} required />
            <FormInput title="Last Name" inputValue={lastName} onChange={setLastName} error={lnError} required />
            <FormInput title="Address Line 1" inputValue={address1} onChange={setAddress1} error={a1Error} required />
            <FormInput title="Address Line 2" inputValue={address2} onChange={setAddress2} />
            <FormSelect title="Country" inputValue={country} onChange={setCountry} options={countries} error={ctrError} required />
            <FormSelect title="City" inputValue={city} onChange={setCity} options={cities} error={ctyError} required />
            <FormSelect title="Province" inputValue={province} onChange={setProvince} options={provinces} error={pError} required />
            <FormInput title="Zip Code" inputValue={zipCode} onChange={setZipCode} error={zError} required />
          </div>
          <div className="right-form">
            <p>Additional Instructions</p>
            <textarea name="additional-instructions" />
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
