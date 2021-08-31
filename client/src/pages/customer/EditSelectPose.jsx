import React from 'react';
import { Redirect } from 'react-router-dom';

import '../../assets/styles/pages/customer/EditSelectPose.css';
import { getCharacterToken } from '../../utils/store';

const EditSelectPose = (props) => {
  const onBack = () => {
    props.history.push('/customer/characters/edit-character');
  };

  const onNext = () => {
    props.history.push('/customer/characters/edit-name-description');
  };

  return getCharacterToken() ? (
    <div id="edit-select-pose">
      <h1>EditSelectPose</h1>
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

export default EditSelectPose;
