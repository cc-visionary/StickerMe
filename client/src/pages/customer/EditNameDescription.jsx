import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { getCharacterDetails, getCharacterToken, setCharacterDetailsLocal } from '../../utils/store';

import selectionBackground from '../../assets/images/create/selection-background.png';

import '../../assets/styles/pages/customer/EditNameDescription.css';

const EditNameDescription = (props) => {
  const characterDetails = getCharacterDetails();
  const [title, setTitle] = useState(characterDetails ? characterDetails.title : '');
  const [description, setDescription] = useState(characterDetails ? characterDetails.description : '');

  const onBack = () => {
    setCharacterDetailsLocal({ title, description });
    props.history.push('/customer/characters/edit-select-pose');
  };

  const onNext = () => {
    setCharacterDetailsLocal({ title, description });
    props.history.push('/customer/characters/order');
  };

  return getCharacterToken() ? (
    <div id="edit-name-description">
      <div className="container">
        <div className="title-bar">
          <span className="title-text">Details</span>
        </div>
        <div className="container-inner">
          <div className="features-title">
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" />
            <img src={selectionBackground} alt="Input Background" />
          </div>
          <div className="features-description">
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
          </div>
        </div>
      </div>
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
