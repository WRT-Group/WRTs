import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './contact.css'
const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_8owuap9', 'template_lv9gpqd', form.current, 'YqrJYxdef2lQOvZ2N')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div className='contact'>
        <h1>WRTs team love to hear from you!</h1>
        <form ref={form} onSubmit={sendEmail}>
            <label>Username:</label><br />
            <input type="text" name="user_name" required/><br />
            <label>Email:</label><br />
            <input type="email" name="email" required/><br />
            <label>Message:</label><br />
            <textarea name="message" required width={500}/><br />
            <input type="submit" value="Send Message" id="button"/>
        </form>
    </div>
    
  );
};
export default ContactUs;