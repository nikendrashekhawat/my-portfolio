"use client";

import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptopCode, faAngleLeft, faAngleRight, faCloud } from '@fortawesome/free-solid-svg-icons'
import { faDocker, faPython } from '@fortawesome/free-brands-svg-icons'
import Chip from '@mui/material/Chip'
import './About.css'
import { main_tools, python_libraries, devops_tools, cloudtools, certifications } from '../../data/skills.js'


const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error) => {
      console.error("Error caught by ErrorBoundary:", error);
      setHasError(true);
    };

    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  if (hasError) {
    return <div>Something went wrong.</div>;
  }

  return children;
};

const About = () => {
  const [visibleCerts, setVisibleCerts] = useState(certifications.slice(0, 3));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const updateVisibleCerts = () => {
      const newCerts = certifications.slice(index, index + 3);
      if (newCerts.length < 3) {
        newCerts.push(...certifications.slice(0, 3 - newCerts.length));
      }
      setVisibleCerts(newCerts);
    };

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % certifications.length);
    }, 5000);

    updateVisibleCerts();

    return () => clearInterval(interval);
  }, [index]);

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + certifications.length) % certifications.length);
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % certifications.length);
  };

  return (
    <ErrorBoundary>
      <div id="about" className="about">
        <div className="about-header">
          <h1>Hi, a little about <span>me</span>!</h1>
          <div className="about-para">
            <p>Hi, I'm a Data Analyst with 4+ years of experience building scalable ETL pipelines, 
              data models, and automated workflows. I specialize in designing reliable data infrastructure 
              using Apache Kafka, Python, PostgreSQL, Apache Airflow, and PySpark across cloud platforms 
              like AWS, GCP, and Snowflake.
            </p>  
            <p> I'm passionate about building clean, efficient data systems that power analytics, machine learning, 
              and business decision-making. From data ingestion to orchestration and warehousing, 
              I focus on performance, scalability, and data quality.</p>
            <p>Additionally, I dedicate my leisure time to build electronics Raspberry Pi projects 
              and to learn Machine Learning Algorithms.
            </p>
          </div>
        </div>
        <div className="about-expertise">
          <h1>Expertise</h1>
          <div className="skill-grid">
            <div className="skills">
              <div className="title">
                <FontAwesomeIcon className='expertise-icon' icon={faLaptopCode} />
                <h3>Databases</h3>
              </div>
              <div className="flex-chips">
                  {main_tools.map((label, index) => (
                    <Chip key={index} className='chip' label={label} />
                  ))}
              </div>
            </div>
            <div className="skills">
              <div className="title">
                <FontAwesomeIcon className='expertise-icon' icon={faPython} />
                <h3>Frameworks</h3>
              </div>
              <div className="flex-chips">
                {python_libraries.map((label, index) => (
                    <Chip key={index} className='chip' label={label} />
                  ))}
              </div>
            </div>
            <div className="skills">
              <div className="title">
                <FontAwesomeIcon className='expertise-icon' icon={faDocker} />
                <h3>Tools</h3>
              </div>
              <div className="flex-chips">
                  {devops_tools.map((label, index) => (
                    <Chip key={index} className='chip' label={label} />
                  ))}
              </div>
            </div>
            <div className="skills">
              <div className="title">
                <FontAwesomeIcon className='expertise-icon' icon={faCloud} />
                <h3>Cloud</h3>
              </div>
              <div className="flex-chips">
                  {cloudtools.map((label, index) => (
                    <Chip key={index} className='chip' label={label} />
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="about-certifications">
            <h1>Certifications</h1>
            <div className="certifications-grid-container">
            <div className="arrow-button">
                <button className="arrow-button-left" onClick={handleNext}>
                  <FontAwesomeIcon className='arrow-button-icon' icon={faAngleLeft} size='2x' />
                </button>
              </div>
              <div className="certifications-grid">
                {visibleCerts.map((cert, idx) => (
                  <div key={idx} className="certification">
                    <img src={cert.img} alt={cert.name} />
                    <div className="overlay">
                      <h3>{cert.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="arrow-button">
                <button className="arrow-button-right" onClick={handlePrev}>
                  <FontAwesomeIcon className='arrow-button-icon' icon={faAngleRight} size='2x' />
                </button>
              </div>
            </div>
          </div>
      </div>
    </ErrorBoundary>
  )
}
export default About
