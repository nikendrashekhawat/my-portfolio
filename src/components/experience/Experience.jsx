"use client";

import '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import 'react-vertical-timeline-component/style.min.css';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import './Experience.css';
import work_history from '../../data/work_history';
const Experience = () => {
        const reversedWorkHistory = [...work_history].reverse(); 
        return (
                <div id="experience" className="experience">
                <h1>Experience</h1>
                <div className="timeline">
                        <VerticalTimeline className="timeline-vertical" lineColor="linear-gradient(180deg, #f83f0b 10%, #571183 100%)">
                        {reversedWorkHistory && reversedWorkHistory.length > 0 ? (
                                reversedWorkHistory.map((job_history, index) => (
                                <VerticalTimelineElement
                                        key={job_history.id || index} // Use `id` if available, fallback to `index`
                                        className="job"
                                        textClassName="job-description"
                                        dateClassName="job-date"
                                        date={job_history.date}
                                        iconClassName='job-icon'
                                        icon={<FontAwesomeIcon icon={faBriefcase} />}
                                >
                                        <h3 className="job-title">{job_history.title}</h3>
                                        <h4 className="job-city">{job_history.city}</h4>
                                        <p className="job-duties">{job_history.description}</p>
                                </VerticalTimelineElement>
                                ))
                        ) : (
                                <p>No work history available.</p>
                        )}
                                <VerticalTimelineElement
                                        className="graduation"
                                        textClassName="job-description"
                                        dateClassName="job-date"
                                        date="Jan 2015 – Apr 2019"
                                        iconClassName='job-icon'
                                        icon={<FontAwesomeIcon icon={faGraduationCap} />}
                                        >
                                        <h3 className="job-title">Seneca College, Toronto</h3>
                                        <p className="job-duties">Bachelors in Electronics Engineering</p>
                                </VerticalTimelineElement>
                        </VerticalTimeline>
                </div>
                </div>
        );
};

export default Experience;
