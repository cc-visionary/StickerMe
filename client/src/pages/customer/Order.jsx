import React from 'react';
import { Redirect } from 'react-router-dom';

import '../../assets/styles/pages/customer/Order.css';
import {
  getCharacterToken, removeLocalCharacterDetails, removeLocalCharacter, removeLocalPoses,
} from '../../utils/store';

const Order = (props) => {
  const onBack = () => {
    props.history.push('/customer/characters/edit-name-description');
  };

  const onSave = () => {
    removeLocalCharacter();
    removeLocalPoses();
    removeLocalCharacterDetails();
    props.history.push('/customer/orders');
  };

  const onAddToCart = () => {
    removeLocalCharacter();
    removeLocalPoses();
    removeLocalCharacterDetails();
    props.history.push('/customer/orders');
  };

  return getCharacterToken() ? (
    <div id="order-character">
      <h1>Order</h1>
      <div className="buttons">
        <div className="left-buttons">
          <button className="back-button" type="button" onClick={onBack}>
            <span />
            Back
          </button>
        </div>
        <div className="right-buttons">
          <button className="save-button" type="button" onClick={onSave}>
            <span />
            Save
          </button>
          <button className="add-to-cart-button" type="button" onClick={onAddToCart}>
            <span />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  ) : <Redirect to="/customer/characters/edit-character" />;
};

export default Order;
