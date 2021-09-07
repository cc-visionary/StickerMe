/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';

import '../../assets/styles/pages/customer/Characters.css';
import { CharacterService } from '../../services';
import { getUser } from '../../utils/store';

class Characters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: [],
    };
  }

  componentDidMount() {
    CharacterService.getAllCharactersByUsername(getUser().uname).then((res) => {
      const { result } = res.data;
      this.setState({ characters: result });
    });
  }

  onDeleteCharacter(character) {
    const { characters } = this.state;
    // eslint-disable-next-line no-underscore-dangle
    CharacterService.deleteCharacter(character._id).then(() => {
      this.setState({ characters: characters.filter((c) => c._id !== character._id) });
    });
  }

  render() {
    const { characters } = this.state;
    return (
      <div id="characters-page">
        <h1>Character Page</h1>
        {characters.map((c) => (
          <div>
            { c.title }
            {' '}
            -
            {' '}
            { c.poses.length }
            {' '}
            poses
            <button type="button">EDIT</button>
            <button type="button" onClick={() => this.onDeleteCharacter(c)}>DELETE</button>
          </div>
        ))}
        <a href="/customer/characters/edit-character">Create a new character</a>
      </div>
    );
  }
}

export default Characters;
