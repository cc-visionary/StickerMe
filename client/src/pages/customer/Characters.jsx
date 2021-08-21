import React from 'react';

import '../../assets/styles/pages/customer/Characters.css';

const Characters = () => {
  console.log('Welcome to characters page');

  return (
    <div id="characters-page">
      <h1>Character Page</h1>
      <a href="/customer/characters/edit">Create a new character</a>
    </div>
  );
};

export default Characters;
