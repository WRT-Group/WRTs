import React, { useContext, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './contact.css'
import { Context } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const form = useRef();
  const { currentUser }=useContext(Context)

  const navigate=useNavigate()

  useEffect(()=>{
    if(!currentUser){
      navigate("/login")
    }
  })

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_8owuap9', 'template_lv9gpqd', form.current, 'YqrJYxdef2lQOvZ2N')
      .then((result) => {
          console.log(result.text);
          navigate("/")
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div className='contact'>
        <h1>WRTs team love to hear from you!</h1>
        <form ref={form} onSubmit={sendEmail}>
            <input type="hidden" name="user_name" value={currentUser.username} style={{position: "absolute"}}/><br />
            <input type="hidden" name="email" value={currentUser.email} style={{position: "absolute"}}/><br />
            <label>Message:</label><br />
            <textarea name="message" rows={6} cols={50} required/><br />
            <input type="submit" value="Send Message" id="button"/>
        </form>
    </div>
    
  );
};
export default ContactUs;