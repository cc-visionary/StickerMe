import React from 'react';

import { UserService } from '../services';

const Locked = ({ history }) => {
  const handleLogout = () => {
    UserService.logout().then(() => {
      history.push('/login');
    });
  };

  return (
    <div>
      <h1>Sorry, the admin site isn&lsquo;t available today...</h1>
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Locked;
