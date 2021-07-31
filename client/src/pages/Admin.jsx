import React from "react";

import "../assets/styles/pages/Admin.css";

import { ImageUpload } from "../components";
import { UserService } from "../services";

const Admin = (props) => {
  const handleLogout = () => {
    UserService.logout().then(() => {
      props.history.push("/login");
    });
  };

  const { users } = props;

  return (
    <div id="admin-page">
      <h1>Admin Page Content</h1>
      <h3>Users:</h3>
      {users.map((user) => (
        <div>{user.username}</div>
      ))}
      <ImageUpload imageType="body" />
      <ImageUpload imageType="face" />
      <ImageUpload imageType="ears" />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
};

export default Admin;
