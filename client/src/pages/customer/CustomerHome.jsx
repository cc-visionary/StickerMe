import React, { useState } from 'react';
import { getUser } from '../../utils/store';

import userInfoIcon from '../../assets/images/icons/Profile.svg';
import characterIcon from '../../assets/images/icons/3 User.svg';
import folderIcon from '../../assets/images/icons/Folder.svg';
import documentIcon from '../../assets/images/icons/Document.svg';

import '../../assets/styles/pages/customer/CustomerHome.css';

const CustomerHome = () => {
  const [hiddenImage1, setHiddenImage1] = useState(true);
  const [hiddenImage2, setHiddenImage2] = useState(true);
  const [hiddenImage3, setHiddenImage3] = useState(true);
  const [hiddenImage4, setHiddenImage4] = useState(true);

  const userInfo = getUser();
  const userName = userInfo.uname;

  return (
    <div id="user-page">
      <div id="inner-user-page" hidden={hiddenImage1 || hiddenImage2 || hiddenImage3 || hiddenImage4}>
        <h1 id="welcome_text">WELCOME</h1>
        <p id="customer_name">{userName}</p>

        <div id="feature_divider">
          <p id="features_label">FEATURES</p>
        </div>

        <div id="customer_options">
          <a className="option_button" href="/#">
            <div className="option_div" id="user_info">
              <img className="option_icon" src={userInfoIcon} alt="User Info" onLoad={() => setHiddenImage1(false)} />
              <p className="option_label">User Info</p>
            </div>
          </a>
          <a className="option_button" href="/#">
            <div className="option_div" id="characters">
              <img className="option_icon" src={characterIcon} alt="Characters" onLoad={() => setHiddenImage2(false)} />
              <p className="option_label">Characters</p>
            </div>
          </a>
          <a className="option_button" href="/#">
            <div className="option_div" id="contacts">
              <img className="option_icon" src={folderIcon} alt="User Info" onLoad={() => setHiddenImage3(false)} />
              <p className="option_label">Contacts</p>
            </div>
          </a>
          <a className="option_button" href="/#">
            <div className="option_div" id="order">
              <img className="option_icon" src={documentIcon} alt="User Info" onLoad={() => setHiddenImage4(false)} />
              <p className="option_label">Order</p>
            </div>
          </a>
        </div>

      </div>
    </div>
  );
};

export default CustomerHome;
