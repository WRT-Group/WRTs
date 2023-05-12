import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context/Context';
import "./PFP.css"

const PFP = () => {
  
  const { currentUser }=useContext(Context)

  return (
    <div>
      {currentUser && <Link to={`/profile/${currentUser.id}`}>
        <img src={currentUser.image ? currentUser.image : 'https://thumbs.dreamstime.com/b/nft-non-fungible-token-tokens-icon-covering-concept-high-tech-technology-symbol-logo-vector-225921227.jpg'} alt='profile' className='pr' />
      </Link>}
    </div>
  );
};

export default PFP;