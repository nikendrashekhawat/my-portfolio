"use client";

import Profile from "../src/components/home/Header";
import About from "../src/components/about/About";
import Experience from "../src/components/experience/Experience";
import Projects from "../src/components/projects/Projects";
import Contact from "../src/components/contact/Contact";

export default function HomePage() {

  return (
    <>
      <Profile />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}