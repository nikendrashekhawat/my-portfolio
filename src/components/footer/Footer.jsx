"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'
import './Footer.css'

const Footer = () => {
  return (
    <div id="footer" className='footer'>
        <hr/>
        <div className='footer-section'>
          <div className="footer-icons">
            <a href="https://www.github.com/nikendrashekhawat"><FontAwesomeIcon className='footer-icon' icon={faSquareGithub} /></a>
            <a href="https://www.linkedin.com/in/nikendrashekhawat/"><FontAwesomeIcon className='footer-icon' icon={faLinkedin} /></a>
            <a href="https://www.instagram.com/nikendrashekhawat"><FontAwesomeIcon className='footer-icon' icon={faInstagram} /></a>
          </div>
          <div className="footer-copyright">
            <p>©2026 Nikendra Shekhawat</p>
          </div>
        </div>
    </div>
  )
}

export default Footer