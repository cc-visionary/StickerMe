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

// return the poses from the local storage
export const getPoses = () => {
  const poses = localStorage.getItem('poses');
  if (poses) return JSON.parse(poses);
  return null;
};

// remove the poses from the local storage
export const removeLocalPoses = () => {
  localStorage.removeItem('poses');
};

// set the poses from the local storage
export const setPosesLocal = (poses) => {
  localStorage.setItem('poses', JSON.stringify(poses));
};

// return the character details from the local storage
export const getCharacterDetails = () => {
  const details = localStorage.getItem('characterDetails');
  if (details) return JSON.parse(details);
  return null;
};

// remove the character details from the local storage
export const removeLocalCharacterDetails = () => {
  localStorage.removeItem('characterDetails');
};

// set the character details from the local storage
export const setCharacterDetailsLocal = (details) => {
  localStorage.setItem('characterDetails', JSON.stringify(details));
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
