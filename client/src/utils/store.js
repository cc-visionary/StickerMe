// storage for the character and user

/* ---------------- CHARACTER ------------------*/
// return the character data from the local storage
export const getCharacter = () => {
  const character = localStorage.getItem('character');
  if (character) return JSON.parse(character);
  return null;
};

// return the token from the local storage
export const getCharacterToken = () => localStorage.getItem('characterToken') || null;

// remove the token and character from the local storage
export const removeLocalCharacter = () => {
  localStorage.removeItem('characterToken');
  localStorage.removeItem('character');
};

// set the token and character from the local storage
export const setCharacterLocal = (token, character) => {
  localStorage.setItem('characterToken', token);
  localStorage.setItem('character', JSON.stringify(character));
};

/* ---------------- USER ------------------*/

// return the user data from the local storage
export const getUser = () => {
  const user = localStorage.getItem('user');
  if (user) return JSON.parse(user);
  return null;
};

// return the token from the local storage
export const getUserToken = () => localStorage.getItem('userToken') || null;

// remove the token and user from the local storage
export const removeLocalUser = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('user');
};

// set the token and user from the local storage
export const setUserLocal = (token, user) => {
  localStorage.setItem('userToken', token);
  localStorage.setItem('user', JSON.stringify(user));
};
