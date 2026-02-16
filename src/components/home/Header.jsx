"use client";

import AnchorLink from 'react-anchor-link-smooth-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const profile_image = "/profile_img.png";
const resume ="/resume.pdf";


const Profile = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resume;
    link.download = 'Nikendra_Shekhawat_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div id="profile" className='profile'>
        <div className='profile-picture'><img src={profile_image} alt="" /></div>
        <div className='profile-info'>
          <div className="profile-icons-top">
            <a href="https://www.github.com/nikendrashekhawat"> <FontAwesomeIcon className="profile-icon" icon={faSquareGithub} /></a>
            <a href="https://www.linkedin.com/in/nikendrashekhawat/"> <FontAwesomeIcon className="profile-icon" icon={faLinkedin} /></a>
            <a href="https://www.instagram.com/nikendrashekhawat"> <FontAwesomeIcon className="profile-icon" icon={faInstagram} /></a>
          </div>
          <h1>Nikendra Shekhawat</h1>
          <p>Cloud Data Engineer | Big Data Developer </p>
          <div className="profile-connect">
            <AnchorLink className='anchor-link' offset='50' href='#contact'>
              <div className="profile-connect-contact">
                <p>Connect with me</p>
              </div>
            </AnchorLink>
            <div className="profile-connect-resume" onClick={handleDownload} role='button' tabIndex={0}>
              <p>Resume</p>
              <FontAwesomeIcon className='download-icon-resume' icon={faFileArrowDown}/>
            </div>
          </div>
          <div className="profile-icons-bottom">
          <a href="https://www.github.com/nikendrashekhawat"> <FontAwesomeIcon className="profile-icon" icon={faSquareGithub} /></a>
          <a href="https://www.linkedin.com/in/nikendrashekhawat/"> <FontAwesomeIcon className="profile-icon" icon={faLinkedin} /></a>
          <a href="https://www.instagram.com/nikendrashekhawat"> <FontAwesomeIcon className="profile-icon" icon={faInstagram} /></a>
        </div>
        </div>
    </div>
  )
}

export default Profile