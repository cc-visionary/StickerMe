import React from "react";

import "../assets/styles/pages/Admin.css";

import { ImageUpload } from "../components";

const Admin = ({ users }) => (
  <div id="admin-page">
    <h1>Admin Page Content</h1>
    <h3>Users:</h3>
    {users.map((user) => (
      <div>{user.username}</div>
    ))}
    <ImageUpload imageType="body" />
    <ImageUpload imageType="face" />
    <ImageUpload imageType="ears" />
  </div>
);

export default Admin;
