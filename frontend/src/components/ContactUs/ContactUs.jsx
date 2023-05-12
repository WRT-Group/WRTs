import React, { useState, useContext, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './contact.css'
import { Context } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import GreenAlert from '../Alerts/GreenAlert';

const ContactUs = () => {
  const form = useRef();
  const { currentUser, isLoading, setIsLoading }=useContext(Context)
  const [success,setSuccess]=useState(false)

  const navigate=useNavigate()

  useEffect(()=>{
    if(!currentUser){
      navigate("/login")
    }
  })

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true)

    emailjs.sendForm('service_8owuap9', 'template_lv9gpqd', form.current, 'YqrJYxdef2lQOvZ2N')
      .then((result) => {
          setIsLoading(false)
          setSuccess(true)
          setTimeout(()=>{
            setSuccess(false)
            navigate("/")
          },2000)
      }, (error) => {
          console.log(error.text);
          setIsLoading(false)
      });
  };

  const clearInc=()=>setSuccess(false)

  return (
    <div className='contact'>
        {success && <GreenAlert text={"Email Sent, will be answering soon!"} clearInc={clearInc}/>}
        <h1>WRTs team love to hear from you!</h1>
        <form ref={form} onSubmit={sendEmail}>
            <input type="hidden" name="user_name" value={currentUser.username} style={{position: "absolute"}}/><br />
            <input type="hidden" name="email" value={currentUser.email} style={{position: "absolute"}}/><br />
            <label>Message:</label><br />
            <textarea name="message" rows={6} cols={50} required/><br />
            <input type="submit" value="Send Message" id="button"/>
        </form>
        {isLoading && <Spinner/>}
    </div>
    
  );
};
export default ContactUs;