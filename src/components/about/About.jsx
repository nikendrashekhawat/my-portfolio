"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode, faAngleLeft, faAngleRight, faCloud } from "@fortawesome/free-solid-svg-icons";
import { faDocker, faPython } from "@fortawesome/free-brands-svg-icons";
import Chip from "@mui/material/Chip";
import "./About.css";

import {
  main_tools,
  python_libraries,
  devops_tools,
  cloudtools,
  certifications,
} from "../../data/skills.js";

const About = () => {
  const [index, setIndex] = useState(0);

  // Auto-rotate certifications every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % certifications.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Compute visible certifications (3 at a time)
  const itemsToShow = isMobile ? 1 : 3;

  const visibleCerts = Array.from({ length: itemsToShow }, (_, i) =>
    certifications[(index + i) % certifications.length]
  );

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + certifications.length) % certifications.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % certifications.length);
  };

  return (
    <div id="about" className="about">
      {/* HEADER */}
      <div className="about-header">
        <h1>
          Hi, a little about <span>me</span>!
        </h1>

        <div className="about-para">
          <p>
            Hi, I'm a Data Analyst with 4+ years of experience building scalable ETL pipelines,
            data models, and automated workflows. I specialize in designing reliable data
            infrastructure using Apache Kafka, Python, PostgreSQL, Apache Airflow, and PySpark
            across cloud platforms like AWS, GCP, and Snowflake.
          </p>

          <p>
            I'm passionate about building clean, efficient data systems that power analytics,
            machine learning, and business decision-making. From data ingestion to orchestration
            and warehousing, I focus on performance, scalability, and data quality.
          </p>

          <p>
            Additionally, I dedicate my leisure time to building electronics Raspberry Pi projects
            and learning Machine Learning Algorithms.
          </p>
        </div>
      </div>

      {/* EXPERTISE */}
      <div className="about-expertise">
        <h1>Expertise</h1>

        <div className="skill-grid">
          <SkillBlock icon={faLaptopCode} title="Databases" items={main_tools} />
          <SkillBlock icon={faPython} title="Frameworks" items={python_libraries} />
          <SkillBlock icon={faDocker} title="Tools" items={devops_tools} />
          <SkillBlock icon={faCloud} title="Cloud" items={cloudtools} />
        </div>
      </div>

      {/* CERTIFICATIONS */}
      <div className="about-certifications">
        <h1>Certifications</h1>

        <div className="certifications-grid-container">
          <button className="arrow-button" onClick={handlePrev}>
            <FontAwesomeIcon className="arrow-button-icon" icon={faAngleLeft} size="2x" />
          </button>

          <div className="certifications-grid">
            {visibleCerts.map((cert, idx) => (
              <div key={idx} className="certification">
                <img src={cert.img} alt={cert.name} />
                <div className="overlay">
                  <a href={cert.ref} target="_blank" rel="noopener noreferrer">
                  <h3>{cert.name}</h3>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <button className="arrow-button" onClick={handleNext}>
            <FontAwesomeIcon className="arrow-button-icon" icon={faAngleRight} size="2x" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;

/* ------------------------------
   REUSABLE COMPONENT
------------------------------ */
const SkillBlock = ({ icon, title, items }) => (
  <div className="skills">
    <div className="title">
      <FontAwesomeIcon className="expertise-icon" icon={icon} />
      <h3>{title}</h3>
    </div>

    <div className="flex-chips">
      {items.map((label, index) => (
        <Chip key={index} className="chip" label={label} />
      ))}
    </div>
  </div>
);
