import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CharacterService } from '../../services';
import {
  getCharacterDetails, getCharacterToken, getPoses, setCharacterDetailsLocal,
} from '../../utils/store';

import selectionBackground from '../../assets/images/create/selection-background.png';

import '../../assets/styles/pages/customer/EditNameDescription.css';
import FormInput from '../../components/FormInput';

const EditNameDescription = (props) => {
  const characterDetails = getCharacterDetails();
  const [title, setTitle] = useState(characterDetails ? characterDetails.title : '');
  const [description, setDescription] = useState(characterDetails ? characterDetails.description : '');
  // eslint-disable-next-line no-nested-ternary
  const [quantities, setQuantities] = useState(characterDetails
    ? characterDetails.quantities : (getPoses() ? getPoses().map(() => 1) : []));

  const onBack = () => {
    setCharacterDetailsLocal({ title, description, quantities });
    props.history.push('/customer/characters/edit-select-pose');
  };

  const onNext = () => {
    CharacterService.getAllCharacters()
      .then((res) => {
        const { result } = res.data;
        if (result.map((r) => r.title).includes(title)) {
          toast.error('Title already exists');
        } else if (quantities.includes(NaN) || quantities.includes(0)) {
          toast.error('Quantities must be atleast 1');
        } else {
          setCharacterDetailsLocal({ title: title === '' ? (Math.random() + 1).toString(36).substring(4) : title, description, quantities });
          props.history.push('/customer/characters/order');
        }
      });
  };

  const onChangeNumber = (val, index) => {
    const q = [...quantities.slice(0, index), parseInt(val, 10), ...quantities.slice(index + 1)];
    setQuantities(q);
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
          <div>
            {getPoses().map((p, i) => <FormInput title={`Quantity (${p.imageID})`} inputValue={quantities[i]} type="number" onChange={(val) => onChangeNumber(val, i)} />)}
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
