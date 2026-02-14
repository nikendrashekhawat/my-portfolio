"use client";

import { useState } from 'react';
import './Projects.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faFileCode, faAngleDown} from '@fortawesome/free-solid-svg-icons';
import Chip from '@mui/material/Chip';
import projects_data from '../../data/projects';

const Projects = () => {
  const reversedProjectData = [...projects_data].reverse(); 

  // Highlighted: Added state to track visible items
  const [visibleCount, setVisibleCount] = useState(6);

  // Highlighted: Function to handle "Show More" button click
  const handleShowMore = () => {
    setVisibleCount((prevCount) =>
      Math.min(prevCount + 3, reversedProjectData.length) // Fix: Limit visibleCount
    );
  };

  return (
    <div id="projects" className="projects">
      <h1>Personal Projects</h1>
      <div className="projects-grid">
      {reversedProjectData
        .slice(0, visibleCount)
        .map((project, index) => (
          <div className="project-box" key={index}>
            <img src={project.bg_image} alt="" />
            <div className="project-overlay">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-flex-chips">
                {project.tools.map((label, idx) => (
                  <Chip key={idx} className="project-tool-chip" label={label} />
                ))}
              </div>
              <div className="project-link-icons">
                <a href={project.link} target="_blank">
                  <span>Visit Link</span>
                  <FontAwesomeIcon href={project.github} target="_blank" className="project-icon" icon={faLink} />
                </a>
                <a href={project.github} target="_blank">
                  <span>View Code</span>
                  <FontAwesomeIcon href={project.github} target="_blank" className="project-icon" icon={faFileCode} />
                </a>
              </div>
            </div>
            <h3 className="project-title">{project.title}</h3>
          </div>
        ))}
    </div>
      {visibleCount < reversedProjectData.length && (
        <button className="show-more-btn" onClick={handleShowMore}>
          <p>Show More</p>
          <FontAwesomeIcon className="show-more-icon" icon={faAngleDown} />
        </button>
      )}
    </div>
  );
};

export default Projects;
