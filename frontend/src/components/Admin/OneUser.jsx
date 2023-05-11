import React from 'react';
import "./Admin.css"
import { Link } from 'react-router-dom';

const OneUser = ({fName,lName,username,email,createdAt}) => {
  return (
    <tbody>
      <tr>
        <td>
          <Link to="/">{`${fName} ${lName}`}</Link>
        </td>
        <td>{email}</td>
        <td>{username}</td>
        <td>{createdAt}</td>
        <td>
          <button className="btn">Edit</button>
           <button className="btn btn-delete">Delete</button>
        </td>
      </tr>
    </tbody>
  );
};

export default OneUser;