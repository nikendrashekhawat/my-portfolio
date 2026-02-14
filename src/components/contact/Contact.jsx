
"use client";

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedinIn, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import './Contact.css'

const Contact = () => {

  const [result, setResult] = useState("");
  const [errors, setErrors] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    const newErrors = {}; 
    if (!name) newErrors.name = "*Please enter your name."; 
    if (!email) newErrors.email = "*Please enter your email/phone#."; 
    if (!message) newErrors.message = "*Please enter your message."; 
    
    if (Object.keys(newErrors).length > 0) { 
      setErrors(newErrors);
      setResult("Missing information. Please fill in all the fields before submitting."); 
      return; 
    } else { 
      setErrors({});
    }

    setResult("Sending....");

    formData.append("access_key", process.env.REACT_APP_FORM_ACCESS_KEY);
    try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          setResult("Email Sent Successfully");
          alert("Email Sent Successfully")
          event.target.reset();
        } else {
          console.log("Error", data);
          setResult(data.message);
          alert(result)
        }
    } catch (error) {
      console.log("Submission Error:", error);
      setResult("There was an error submitting the form. Please try again later.");
      alert("There was an error submitting the form. Please try again later.");
    }
  };

  return ( 
    <div id="contact" className='contact'>
        <h1>Contact</h1>
        <div className="contact-section">
          <div className="contact-left">
            <h2><span>Let's Discuss</span></h2>
            <p className='contact-para'>My schedule is currently open for new opportunities or projects. I am readily available 
              to discuss your project requirements or an idea that you'd like to collaborate on. Please contact me at your convenience.
            </p>
            <div className="contact-methods">
              <div className="contact-method-social">
                <a href="https://www.linkedin.com/in/nikendrashekhawat/"><FontAwesomeIcon className='contact-icon' icon={faLinkedinIn} />/</a>
                <a href="https://www.linkedin.com/in/nikendrashekhawat/"><p>nikendrashekhawat</p></a>
              </div>
              <div className="contact-method-social">
                <a href="https://www.instagram.com/nikendrashekhawat"><FontAwesomeIcon className='contact-icon' icon={faInstagram} />/</a>
                <a href="https://www.instagram.com/nikendrashekhawat"><p>nikendrashekhawat</p> </a>
              </div>
              <div className="contact-method-social">
                <a href="https://www.x.com/nikendrr"><FontAwesomeIcon className='contact-icon' icon={faXTwitter} />/</a>
                <a href="https://www.x.com/nikendrr"><p>nikendrr</p> </a>
              </div>
            </div>
          </div>
          <form onSubmit={onSubmit} className="contact-right-form">
            <div className="contact-details">
              <label htmlFor="">Your Name</label>
              <input type="text" name="name" id="name" placeholder='Name' className={errors.name ? 'error' : ''}/>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            <div className="contact-details">
              <label htmlFor="">Your Contact</label>
              <input type="text" name="email" id="email" placeholder='Email / Phone#' className={errors.email ? 'error' : ''}/>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="contact-details">
              <label htmlFor="">Your Message</label>
              <textarea name="message" id="message" rows="10" placeholder="Message" className={errors.message ? 'error' : ''}></textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}

            </div>
            <button type="submit" className='contact-submit'>
              <p>Send now</p>
              <FontAwesomeIcon className='submit-icon' icon={faPaperPlane} />
            </button>
          </form>
        </div>
    </div>
  )
}

export default Contact