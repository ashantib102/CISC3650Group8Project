import * as React from "react";
import { Switch, Route } from "wouter";

// Import page components from app.jsx
import { HomePage, FoodTruckInfoPage, SchedulePage, ContactPage, AboutPage } from "../app.jsx";

/**
* The router is imported in app.jsx
*
* Our site now has five routes: Home, Food Truck Info, Schedule, Contact, and About
* Each one is defined as a component in app.jsx
* We use Switch to only render one route at a time
*/

export default () => (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/food-trucks" component={FoodTruckInfoPage} />
      <Route path="/schedule" component={SchedulePage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/about" component={AboutPage} />
    </Switch>
);