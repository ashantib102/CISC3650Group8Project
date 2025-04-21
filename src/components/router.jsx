// Grabbing React stuff we need
import * as React from "react";
// Getting the routing components from wouter - way easier than React Router 
// Check it out: https://github.com/molefrog/wouter
import { Switch, Route, Router } from "wouter";
// These hooks are clutch for managing state and effects
// https://reactjs.org/docs/hooks-intro.html
import { useState, useEffect } from "react";

// Pulling in all our page components from app.jsx
import { HomePage, FoodTruckInfoPage, SchedulePage, ContactPage, AboutPage } from "../app.jsx";

/**
* This router gets imported in app.jsx
*
* We've got five routes for our food truck app: Home, Food Truck Info, Schedule, Contact, and About
* Each page is its own component in app.jsx - keeps things clean!
* Switch makes sure only one route shows up at a time (no weird overlapping pages)
* More Switch details if you're curious: https://github.com/molefrog/wouter#switch-and-route
*/

/**
 * Custom hook for hash-based routing - sounds fancy but it's pretty simple
 * Super handy for GitHub Pages since it doesn't play nice with normal React routing
 * (GitHub Pages + client routing = headaches without this)
 * More hash routing info: https://github.com/molefrog/wouter#customizing-the-location-hook
 * GitHub Pages deployment guide (lifesaver): https://create-react-app.dev/docs/deployment/#github-pages
 */
const useHashLocation = () => {
  // Track the current URL hash (or just "/" if there's no hash)
  // useState is the real MVP: https://reactjs.org/docs/hooks-state.html
  const [location, setLocation] = useState(
    window.location.hash.replace("#", "") || "/"
  );

  useEffect(() => {
    // This function runs whenever the hash in the URL changes
    // Like when someone clicks a link or hits the back button
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/hashchange_event
    const handleHashChange = () => {
      // Update our location state, stripping off the # symbol
      setLocation(window.location.hash.replace("#", "") || "/");
    };

    // Listen for hash changes - crucial for navigation to work!
    // useEffect basics: https://reactjs.org/docs/hooks-effect.html
    window.addEventListener("hashchange", handleHashChange);
    
    // Cleanup function - always good to avoid memory leaks
    // Your browser will thank you later
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []); // Empty array means this only runs once when the component mounts

  // Return the current location and a function to navigate
  // This is what wouter expects from a location hook
  // https://github.com/molefrog/wouter#use-a-custom-location-hook
  return [
    location,
    (to) => {
      // Super simple navigation - just change the hash!
      window.location.hash = to;
    }
  ];
};

/**
 * Main router component - the heart of our navigation system
 * If you're comparing routing libraries (we've all been there):
 * https://blog.logrocket.com/react-router-alternatives/
 */
export default () => {
  // Hook up our custom hash routing to the Router
  return (
    <Router hook={useHashLocation}>
      {/* Switch makes sure only one route shows up - no route chaos! */}
      <Switch>
        {/* Here's where the magic happens - connecting URLs to components */}
        <Route path="/" component={HomePage} />
        <Route path="/food-trucks" component={FoodTruckInfoPage} />
        <Route path="/schedule" component={SchedulePage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/about" component={AboutPage} />
        {/* https://github.com/molefrog/wouter#route-parameters */}
      </Switch>
    </Router>
  );
};