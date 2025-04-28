BC Bites is a 5-page interactive website aimed at streamlining access to food truck schedules, prices, and locations on Brooklyn College's campus. It's goal is to help students, faculty, and visitors efficiently plan meals on campus with a clear, accessible interface.

While the site does not feature a working backend, it uses front-end logic to simulate real-time data, including dynamic food truck locations and weekly schedules. 

My team of 4 followed a comprehensive UCD approach throughout the development process:
Conducted needfinding interviews to identify key user pain points
Created personas and scenarios to shape our design vision
Developed wireframes for various page layouts
Built a high-fidelity prototype using Figma, tailored with Brooklyn College branding and color schemes

Tech Stack:
Built with React and Vite for fast, modern front-end development
Integrated the Google Maps API to visually display food truck locations via campus-specific markers
Deployed using GitHub Pages

Figma Prototype: https://www.figma.com/proto/cIuXly9zvDOMed86OoG7to/CISC3610-Group-Project?node-id=64-2&p=f&t=WZ6qcJYIBazaxOWr-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=64%3A2

Project Structure- The app.jsx and styles.css files contain all of the code that shows up on our website.

Our project follows a standard React application structure. The main source code is located in the "src" directory. Within this directory, we have organized our code into several subdirectories for better maintainability.

The "components" directory contains reusable UI components, including router.jsx for routing configuration and seo.jsx for handling metadata.

We've placed our custom React hooks in the "hooks" directory. This includes prefers-reduced-motion.jsx which handles accessibility preferences and wiggle.jsx which provides animation functionality.

All styling is centralized in the "styles" directory, with styles.css serving as our main stylesheet.

At the root of the src directory, we have several important files: app.jsx which is our main application component, index.jsx which serves as the entry point, and seo.json which contains SEO configuration.

Outside the src directory, at the project root, we have standard configuration files including the LICENSE containing our license information, README.md with project documentation, and index.html which is the HTML entry point for our application.
