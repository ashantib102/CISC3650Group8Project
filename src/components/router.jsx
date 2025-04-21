import * as React from "react";
import { Switch, Route, Router } from "wouter";
import { useState, useEffect } from "react";

// Import page components from app.jsx
import { HomePage, FoodTruckInfoPage, SchedulePage, ContactPage, AboutPage } from "../app.jsx";

/**
* The router is imported in app.jsx
*
* Our site now has five routes: Home, Food Truck Info, Schedule, Contact, and About
* Each one is defined as a component in app.jsx
* We use Switch to only render one route at a time
*/

// This hook helps with GitHub Pages by handling the base path
const useHashLocation = () => {
  const [location, setLocation] = useState(
    window.location.hash.replace("#", "") || "/"
  );

  useEffect(() => {
    // Handle hash changes
    const handleHashChange = () => {
      setLocation(window.location.hash.replace("#", "") || "/");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Return location and a function to navigate
  return [
    location,
    (to) => {
      window.location.hash = to;
    }
  ];
};

export default () => {
  // Use hash-based routing for GitHub Pages
  return (
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/food-trucks" component={FoodTruckInfoPage} />
        <Route path="/schedule" component={SchedulePage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/about" component={AboutPage} />
      </Switch>
    </Router>
  );
};