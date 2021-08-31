import React from 'react';
import { Redirect } from 'react-router-dom';

import '../../assets/styles/pages/customer/EditNameDescription.css';
import { getCharacterToken } from '../../utils/store';

const EditNameDescription = (props) => {
  const onBack = () => {
    props.history.push('/customer/characters/edit-select-pose');
  };

  const onNext = () => {
    props.history.push('/customer/characters/order');
  };

  return getCharacterToken() ? (
    <div id="edit-name-description">
      <h1>EditNameDescription</h1>
      <div className="buttons">
        <button className="back-button" type="button" onClick={onBack}>
          <span />
          Back
        </button>
        <button className="next-button" type="button" onClick={onNext}>
          <span />
          Next
        </button>
      </div>
    </div>
  ) : <Redirect to="/customer/characters/edit-character" />;
};

export default EditNameDescription;
