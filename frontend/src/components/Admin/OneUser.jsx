import React from 'react';
import "./Admin.css"
import { Link } from 'react-router-dom';

const OneUser = ({id,fName,lName,username,email,createdAt}) => {
  return (
    <tbody>
      <tr>
        <td className='user-info'>
          <Link to={`/profile/${id}`}>{`${fName} ${lName}`}</Link>
        </td>
        <td className='user-info'>{email}</td>
        <td className='user-info'>{username}</td>
        <td className='user-info'>{createdAt}</td>
        <td className='user-info'>
          <button className="btn">Edit</button>
           <button className="btn btn-delete">Delete</button>
        </td>
      </tr>
    </tbody>
  );
};

export default OneUser;