import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CharacterService } from '../../services';
import {
  getCharacterDetails, getCharacterToken, getUser, getPoses, setCharacterDetailsLocal,
} from '../../utils/store';

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
    if (title === '') {
      toast.error('Title cannot be empty');
    } else {
      CharacterService.getAllCharactersByUsername(getUser().uname)
        .then((res) => {
          const { result } = res.data;
          if (result.map((r) => r.title).includes(title)) {
            toast.error('Title already exists');
          } else {
            setCharacterDetailsLocal({ title, description });
            props.history.push('/customer/characters/order');
          }
        });
    }
  };

  return getCharacterToken() && getPoses() ? (
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
