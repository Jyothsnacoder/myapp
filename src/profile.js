import "./index.css";
import React from "react";

function Main() {
  return (
    <div className="Resume">
      <div className="Name">
        <h1>JyothsnaKoneti</h1>
        <h1>Software Developer</h1>
      </div>
      {/* Navigation Links */}
      <div className="header">
        <a href="#part-1" className="nav-link">
          Profile Summary
        </a>
        <a href="#part-2" className="nav-link">
          Education
        </a>
        <a href="#part-3" className="nav-link">
          Skills
        </a>
        <a href="#part-4" className="nav-link">
          Projects
        </a>
        <a href="#part-5" className="nav-link">
          Participation
        </a>
      </div>

      {/* Sections */}
      <div id="part-1" className="section">
        <h1>Profile Summary</h1>
        <p>
          Electronics and Communication Engineering student with expertise in
          circuit design, signal processing, and embedded systems. Proficient in
          C++, Python, and IoT, with hands-on experience in Robotics Process
          Automation (RPA). Developed a machine learning model for data analysis
          during internships. Strong problem-solving skills and a collaborative
          approach to teamwork. Passionate about bridging software and hardware
          to deliver innovative solutions.
        </p>
      </div>

      <div id="part-2" className="section">
        <h1>Education</h1>
        <p>
          • SVR Engineering College, Nandyala (2024) <br />
          Bachelor of Technology (Electronics and Communication Engineering){" "}
          <br />
          CGPA: 7.5
        </p>
      </div>

      <div id="part-3" className="section">
        <h1>Skills</h1>
        <strong>TECHNICAL SKILLS:</strong>
        <p>
•	Programming Languages:	Java, JavaScript (ES6+)<br/>
•	Web Development: 		    HTML5, CSS3, React<br/>
•	Framework: 			        Bootstrap<br/>
•	Database: 			        SQL<br/>
•	Tools: 				          VS Code, Git, GitHub<br/>
<strong>SOFT SKILLS:</strong><br/>
Communication, Flexibility, Creativity and Innovation, Teamwork, Leadership, Problem solving
</p>
      </div>

      <div id="part-4" className="section">
      <h1>Projects</h1>

<p>
  <strong>Title: Zigzag471: A Modern, Responsive, and SEO-Optimized Web Template with Creative CSS Effects</strong><br />
  • Integrated a clean and visually appealing layout, optimizing user interface (UI) design with smooth animations and consistent alignment.<br />
  • Developed a fully responsive website using HTML5, CSS3, and JavaScript, ensuring compatibility across mobile, tablet, and desktop devices.<br />
  • Applied creative CSS animations and transitions to enhance the interactivity of the website, providing a dynamic user experience.<br />
  • Ensured cross-browser compatibility by testing the website on multiple browsers, including Chrome, Firefox, Safari, and Edge, for consistent performance.
</p>

<p>
  <strong>Title: Meditation App Development Project</strong><br />
  • Developed a cross-platform meditation app using React Native, accessible on both iOS and Android.<br />
  • Integrated guided sessions, customizable timers, and progress tracking to support user mindfulness goals.<br />
  • Added soothing soundscapes and reminders to encourage consistent daily use.<br />
  • Used Firebase for secure user authentication and efficient data management.
</p>

<p>
  <strong>Title: IoT-Based Electrical Device Surveillance and Control System</strong><br />
  • An IoT-based device surveillance and control system designed to monitor the operational condition of electrical devices.<br />
  • This system works efficiently for both indoor and outdoor lighting applications.<br />
  • The graphical mobile app interface provides a user-friendly and easily accessible platform for controlling devices.<br />
  • The system can be installed as an energy-efficient solution to control street lamps, which require significant energy and manual intervention.
</p>

      </div>

      <div id="part-5" className="section">
        <h1>Participation</h1>
        <p>•	Competed in a hackathon, developing a web app prototype under tight deadlines, demonstrating strong problem-solving and teamwork skills.<br />
           •	Led a student team in campus event organization, gaining hands-on experience in leadership and event management
</p>
      </div>
    </div>

  );
}

export default Main;
