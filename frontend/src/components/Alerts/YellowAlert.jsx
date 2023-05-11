import React from 'react';
import { motion } from 'framer-motion';

const YellowAlert = ({text,clearInc}) => {

  const alertAnimation={
    initial: {
      opacity: 0,
      y: -10
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }

  return (
    <div className='parent-container'>
      <motion.div className="alert alert-warning alert-dismissible fade show alert-container" 
      role="alert"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={alertAnimation}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
        <strong>{text}</strong>
        <button type="button" className="btn-close" onClick={clearInc} data-bs-dismiss="alert" aria-label="Close"></button>
      </motion.div>
    </div>
  );
};

export default YellowAlert;