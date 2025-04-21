import React, { useState, useEffect } from "react";
import { Router, Link, useLocation } from "wouter";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

/**
* This code defines the react app
*
* Imports the router functionality to provide page navigation
* Defines all page components directly in this file and exports them for the router
*/

import "./styles/styles.css";

// The component that adds our Meta tags to the page
import Seo from './components/seo.jsx';

// Food truck location & data
// Coordinates were obtained from google maps
const foodTruckLocations = [
  {
    id: 1,
    name: "Jiannetto's Pizza",
    position: { lat: 40.631294, lng: -73.953974 },
    icon: "https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/Jiannetto_sPizzaLogo-removebg-preview.png?v=1745160828510",
    location: "West Quad",
    hours: "10:00 am - 6:00 pm"
  },
  {
    id: 2,
    name: "Tacos y Pupusas Lizbeth",
    position: { lat: 40.630825, lng: -73.953839 },
    icon: "https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/download-removebg-preview%20(2).png?v=1745168481990",
    location: "East Quad, Library",
    hours: "8:00 am - 6:00 pm"
  },
  {
    id: 3,
    name: "Sammy's Halal",
    position: { lat: 40.631347, lng: -73.951666 },
    icon: "https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/download-removebg-preview.png?v=1745168473732",
    location: "East Quad, Center",
    hours: "10:00 am - 5:00 pm"
  },
  {
    id: 4,
    name: "The BK Jerk Mobile",
    position: { lat: 40.631417, lng: -73.950928 },
    icon: "https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/images-removebg-preview.png?v=1745168476351",
    location: "East Quad, Ingersoll",
    hours: "11:00 am - 4:00 pm"
  },
  {
    id: 5,
    name: "San Matteo Coffee",
    position: { lat: 40.631059, lng: -73.951558 },
    icon: "https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/download-removebg-preview%20(4).png?v=1745168494297",
    location: "East Quad",
    hours: "10:00 am - 6:00 pm"
  },
  {
    id: 6,
    name: "Wafels & Dinges",
    position: { lat: 40.631136, lng: -73.949423 },
    icon: "https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/download-removebg-preview%20(5).png?v=1745168496973",
    location: "East Quad, Ingersoll",
    hours: "10:00 am - 6:00 pm"
  }
];

// Map container style
const mapContainerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "30px"
};

// Brooklyn College center coordinates
const center = {
  lat: 40.631221, // 40.631221, -73.952560
  lng: -73.952560
};

// Updated Map options for satellite view and restricted bounds
const options = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false, // Disable map type control
  streetViewControl: false, 
  fullscreenControl: true,
  mapTypeId: 'satellite',
 restriction: {
    latLngBounds: {
      north: 40.63271,
      south: 40.629,
      east: -73.946434,
      west: -73.956836,
    },
    strictBounds: true,
  },
  minZoom: 16,
  maxZoom: 24,
  styles: [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#7e2626" }],
    },
  ],
}

// Interactive Map Component
// https://visgl.github.io/react-google-maps/docs/get-started
// 
function InteractiveMap() {
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className="campus-map-container">
      <LoadScript 
        googleMapsApiKey="AIzaSyCN9j0hnEkwtMH619ZRKDAa6MabcSTbLGY"
        onLoad={() => setMapLoaded(true)}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={17}
          options={options}
        >
          {/* Add markers for each food truck */}
          {mapLoaded && foodTruckLocations.map(truck => {
            // Special case for the pizza truck to fix distortion 
            if (truck.id === 1) {
              return (
                <Marker
                  key={truck.id}
                  position={truck.position}
                  icon={{
                    url: truck.icon,
                    scaledSize: new window.google.maps.Size(80, 50), // Wider than tall to fix distortion
                    anchor: new window.google.maps.Point(40, 25) // Center point (half of width and height)
                  }}
                  onClick={() => setSelectedTruck(truck)}
                />
              );
            }
            
            // Special case for Sammy's Halal - make it smaller (not ha ha)
            if (truck.id === 3) {
              return (
                <Marker
                  key={truck.id}
                  position={truck.position}
                  icon={{
                    url: truck.icon,
                    scaledSize: new window.google.maps.Size(45, 45),
                    anchor: new window.google.maps.Point(22.5, 22.5) 
                  }}
                  onClick={() => setSelectedTruck(truck)}
                />
              );
            }
            
            // All other trucks remain the same
            return (
              <Marker
                key={truck.id}
                position={truck.position}
                icon={{
                  url: truck.icon,
                  scaledSize: new window.google.maps.Size(60, 60),
                  anchor: new window.google.maps.Point(30, 30) // Fixed anchor point to center properly
                }}
                onClick={() => setSelectedTruck(truck)}
              />
            );
          })}

          {/* Show info window when a marker is clicked */}
          {selectedTruck && (
            <InfoWindow
              position={selectedTruck.position}
              onCloseClick={() => setSelectedTruck(null)}
            >
              <div className="info-window">
                <h3>{selectedTruck.name}</h3>
                <p>Location: {selectedTruck.location}</p>
                <p>Hours: {selectedTruck.hours}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

// Header component for all pages
function Header() {
  return (
    <header className="bc-header">
      <div className="logo-container">
        <img src="https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/BCBitesLogoGemini.png?v=1745158374539" alt="BC BITES Logo" className="bc-logo" />
      </div>

      <nav className="bc-nav">
        <Link href="/" className="nav-link">HOME</Link>
        <Link href="/food-trucks" className="nav-link">FOOD TRUCK INFO</Link>
        <Link href="/schedule" className="nav-link">SCHEDULE</Link>
        <Link href="/contact" className="nav-link">CONTACT US</Link>
        <Link href="/about" className="nav-link">ABOUT US</Link>
      </nav>
    </header>
  );
}

// BC Bites Home Page Component
export function HomePage() {
  const [useInteractiveMap, setUseInteractiveMap] = useState(false);
  
  // Check if it's viewed in a browser AND google map is available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUseInteractiveMap(true);
    }
  }, []);

  return (
    <div className="bc-bites-container">
      <Header />

      <div className="home-content">
        {/* College Logos and Food Truck Sections in a row */}
        <div className="top-section">
          {/* College Logos */}
          <div className="college-logos">
            <img 
              src="https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/BrooklynCollegeCunyLogo-removebg-preview.png?v=1745158615038" 
              alt="Brooklyn College CUNY Logo" 
              className="college-logo" 
            />
          </div>

          {/* Food Truck Sections */}
          <div className="quad-sections">
            {/* West Quad */}
            <div className="quad-section west-quad">
              <h2 className="quad-title">West Quad</h2>
              <div className="food-trucks">
                <div className="food-truck">
                  <img 
                    src="https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/Jiannetto_sPizzaLogo-removebg-preview.png?v=1745160828510" 
                    alt="Pizza Truck" 
                    className="truck-icon" 
                  />
                  <div className="truck-info">
                    <h3 className="truck-name">Jiannetto's</h3>
                    <h3 className="truck-name">Pizza ($)</h3>
                    
                  </div>
                </div>

                <div className="food-truck">
                  <img 
                    src="https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/download-removebg-preview%20(2).png?v=1745168481990" 
                    alt="Taco Truck" 
                    className="truck-icon" 
                  />
                  <div className="truck-info">
                    <h3 className="truck-name">Tacos y Pupusas</h3>
                    <h3 className="truck-name">Lizbeth ($)</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* East Quad */}
            <div className="quad-section east-quad">
              <h2 className="quad-title">East Quad</h2>
              <div className="food-trucks east-quad-trucks">
                <div className="food-truck">
                  <img 
                    src="https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/download-removebg-preview.png?v=1745168473732" 
                    alt="Halal Truck" 
                    className="truck-icon" 
                  />
                  <div className="truck-info">
                    <div className="truck-name-container">
                      <h3 className="star-icon">★</h3>
                      <h3 className="truck-name">Sammy's</h3>    
                    </div>
                    <h3 className="truck-name">Halal ($)</h3>

                  </div>
                </div>

                <div className="food-truck">
                  <img 
                    src="https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/download-removebg-preview%20(4).png?v=1745168494297" 
                    alt="Coffee Truck" 
                    className="truck-icon" 
                  />
                  <div className="truck-info">
                    <h3 className="truck-name">San Matteo</h3>
                    <h3 className="truck-name">Coffee ($)</h3>
                  </div>
                </div>

                <div className="food-truck">
                  <img 
                    src="https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/images-removebg-preview.png?v=1745168476351" 
                    alt="Jerk Truck" 
                    className="truck-icon" 
                  />
                  <div className="truck-info">
                    <h3 className="truck-name">The BK Jerk</h3>
                    <h3 className="truck-name">Mobile ($-$$)</h3>
                    
                  </div>
                </div>

                <div className="food-truck">
                  <img 
                    src="https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/download-removebg-preview%20(5).png?v=1745168496973" 
                    alt="Waffle Truck" 
                    className="truck-icon" 
                  />
                  <div className="truck-info">
                    <h3 className="truck-name">Wafels &</h3>
                    <h3 className="truck-name">Dinges ($-$$)</h3>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Campus Map with Fallback */}
        {useInteractiveMap ? (
          <InteractiveMap />
        ) : (
          <div className="campus-map-container">
            <img 
              src="https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/BrooklynCollegeCampusMapremovebackground.png?v=1745168997021" 
              alt="Brooklyn College Campus Map" 
              className="campus-map" 
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Food Truck Info Page Component
export function FoodTruckInfoPage() {
  return (
    <div className="bc-bites-container">
      <Header />
      
      <div className="food-truck-list">
        <div className="food-truck-item">
          <div className="food-trucks-test">
            <img src="https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/Jiannetto_sPizzaLogo-removebg-preview.png?v=1745160828510" alt="Pizza Truck" />
          </div>
          <div className="food-truck-details">
            <h3>Jiannetto's Pizza ($)</h3>
            <p>Serving an award-winning Grandma Thin-Crust Sicilian Pie and are recognized as one of the best offered in New York!</p>
          </div>
        </div>

        <div className="food-truck-item">
          <div className="food-trucks-test">
            <img src="https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/images-removebg-preview.png?v=1745168476351" alt="BK Jerk Mobile" />
          </div>
          <div className="food-truck-details">
            <h3>The BK Jerk Mobile ($-$$)</h3>
            <p>Whether you're craving jerk chicken or a braised oxtails meal, they've got your taste buds covered with their savory Caribbean dishes. (Lunch specials available).</p>
          </div>
        </div>

        <div className="food-truck-item">
          <div className="food-trucks-test">
            <img src="https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/download-removebg-preview.png?v=1745168473732" alt="Sammy's Halal" />
          </div>
          <div className="food-truck-details">
            <h3>Sammy's Halal ($)</h3>
            <p>Serving up street food favorites like chicken and lamb over rice, gyro wraps, and falafel, the award-winning Sammy's Halal recipient of a Vendy Award for best street food blends bold flavors with fresh ingredients to deliver a satisfying meal on the go.</p>
          </div>
        </div>

        <div className="food-truck-item">
          <div className="food-trucks-test">
            <img src="https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/download-removebg-preview%20(2).png?v=1745168481990" alt="Tacos y Pupusas" />
          </div>
          <div className="food-truck-details">
            <h3>Tacos y Pupusas ($)</h3>
            <p>Serving authentic, freshly made tacos and pupusas with a variety of flavorful fillings that bring the vibrant tastes of Latin America street food to your plate!</p>
          </div>
        </div>

        <div className="food-truck-item">
          <div className="food-trucks-test">
            <img src="https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/download-removebg-preview%20(6).png?v=1745168499595" />
          </div>
          <div className="food-truck-details">
            <h3>Basarvdogim on Wheels ($-$$)</h3>
            <p>Offering a fresh selection of Glatt Kosher classics, from savory sandwiches to crispy eggrolls, bringing authentic flavors to campus.</p>
          </div>
        </div>

        <div className="food-truck-item">
          <div className="food-trucks-test">
            <img src="https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/download-removebg-preview%20(5).png?v=1745168496973" alt="Wafels & Dinges" />
          </div>
          <div className="food-truck-details">
            <h3>Wafels & Dinges ($-$$)</h3>
            <p>Indulge in the sweet and savory delights of Wafels & Dinges. Whether you're in the mood for a crispy waffle or a scrumptious dinge, they've got you covered.</p>
          </div>
        </div>

        <div className="food-truck-item">
          <div className="food-trucks-test">
            <img src="https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/download-removebg-preview%20(4).png?v=1745168494297" alt="San Matteo Coffee" />
          </div>
          <div className="food-truck-details">
            <h3>San Matteo Coffee ($)</h3>
            <p>We are your go-to for coffee on the move, serving up delicious, handcrafted coffee and espresso. Our truck is always ready to prepare fresh and bold flavors to keep you refreshed and energized.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 
//  Schedule Page Component
//
export function SchedulePage() {
    function getCurrentWeekDisplay() {
    // Get current date
    const today = new Date()
    const dayOfWeek = today.getDay()
    const monday = new Date(today)
    
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      const daysUntilNextMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek
       monday.setDate(today.getDate() + daysUntilNextMonday)
    } else {
      const diff = 1 - dayOfWeek
      monday.setDate(today.getDate() + diff)
    }

    // Find Friday of current week
    const friday = new Date(monday)
    friday.setDate(monday.getDate() + 4)

    // Format the month and dates
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const month = monthNames[monday.getMonth()]

    // Create the display string
    return `${month}, ${monday.getDate()} - ${friday.getDate()}`
  }
  
  return (
    <div className="bc-bites-container">
      <Header />
      
      <div className="schedule-container">
        <div className="schedule-title">{getCurrentWeekDisplay()}</div>
        <div className="schedule-table">
          <div className="schedule-header">
            <div className="day">Monday</div>
            <div className="day">Tuesday</div>
            <div className="day">Wednesday</div>
            <div className="day">Thursday</div>
            <div className="day">Friday</div>
          </div>
          
          <div className="schedule-content">
            <div className="day-column">
              <div className="truck-schedule">
                <h3>Jiannetto's Pizza</h3>
                <p>Time: 10:00 am - 6:00 pm</p>
                <p>Location: West Quad</p>
              </div>
              
              <div className="truck-schedule">
                <h3>Tacos y Pupusas Lizbeth</h3>
                <p>Time: 8:00 am - 6:00 pm</p>
                <p>Location: East Quad, Library</p>
              </div>
              
              <div className="truck-schedule">
                <h3>Basarvdogim on Wheels</h3>
                <p>Time: 10:00 am - 6:30 pm</p>
                <p>Location: East Quad, Ingersoll</p>
              </div>
              
              <div className="truck-schedule">
                <h3>Sammy's Halal</h3>
                <p>Time: 10:00 am - 5:00 pm</p>
                <p>Location: East Quad, Center</p>
              </div>
            </div>
            
            <div className="day-column">
              <div className="truck-schedule">
                <h3>Wafels & Dinges</h3>
                <p>Time: 10:00 am - 6:00 pm</p>
                <p>Location: East Quad, Ingersoll</p>
              </div>
              
              <div className="truck-schedule">
                <h3>Jiannetto's Pizza</h3>
                <p>Time: 10:00 am - 6:00 pm</p>
                <p>Location: East Quad, Library</p>
              </div>
              
              <div className="truck-schedule">
                <h3>Tacos y Pupusas Lizbeth</h3>
                <p>Time: 8:00 am - 6:00 pm</p>
                <p>Location: West Quad</p>
              </div>
              
              <div className="truck-schedule">
                <h3>Basarvdogim on Wheels</h3>
                <p>Time: 10:00 am - 6:30 pm</p>
                <p>Location: West Quad</p>
              </div>
              
              <div className="truck-schedule">
                <h3>Sammy's Halal</h3>
                <p>Time: 10:00 am - 5:00 pm</p>
                <p>Location: East Quad, Center</p>
              </div>
            </div>
            
            <div className="day-column">
              <div className="truck-schedule">
                <h3>The BK Jerk Mobile</h3>
                <p>Time: 11:00 am - 4:00 pm</p>
                <p>Location: East Quad, Ingersoll</p>
              </div>
              
              <div className="truck-schedule">
                <h3>Jiannetto's Pizza</h3>
                <p>Time: 10:00 am - 6:00 pm</p>
                <p>Location: West Quad</p>
              </div>
              
              <div className="truck-schedule">
                <h3>Tacos y Pupusas Lizbeth</h3>
                <p>Time: 8:00 am - 6:00 pm</p>
                <p>Location: West Quad</p>
              </div>
              
              <div className="truck-schedule">
                <h3>Basarvdogim on Wheels</h3>
                <p>Time: 10:00 am - 6:30 pm</p>
                <p>Location: East Quad, Ingersoll</p>
              </div>
              
              <div className="truck-schedule">
                <h3>Sammy's Halal</h3>
                <p>Time: 10:00 am - 5:00 pm</p>
                <p>Location: East Quad, Center</p>
              </div>
            </div>
            
            <div className="day-column">
              <div className="truck-schedule">
                <h3>Jiannetto's Pizza</h3>
                <p>Time: 10:00 am - 6:00 pm</p>
                <p>Location: East Quad, Ingersoll</p>
              </div>
              
              <div className="truck-schedule">
                <h3>Tacos y Pupusas Lizbeth</h3>
                <p>Time: 8:00 am - 6:00 pm</p>
                <p>Location: East Quad, Library</p>
              </div>
              
              <div className="truck-schedule">
                <h3>Basarvdogim on Wheels</h3>
                <p>Time: 10:00 am - 6:30 pm</p>
                <p>Location: West Quad</p>
              </div>
              
              <div className="truck-schedule">
                <h3>Sammy's Halal</h3>
                <p>Time: 10:00 am - 5:00 pm</p>
                <p>Location: East Quad, Center</p>
              </div>
            </div>
            
            <div className="day-column">
              <div className="truck-schedule">
                <h3>Tacos y Pupusas Lizbeth</h3>
                <p>Time: 8:00 am - 6:00 pm</p>
                <p>Location: East Quad, Library</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

// Contact Page Component
export function ContactPage() {
  return (
    <div className="bc-bites-container">
      <Header />
      
      <div className="contact-container">
        <div className="contact-left">
          <h2>Brooklyn College Food Truck Support</h2>
          <p>1122 Ingersoll Hall</p>
          <p>E: <a href="mailto:bcfoodtruck@brooklyn.cuny.edu"  >bcfoodtruck@brooklyn.cuny.edu</a> </p>
          <p>P: <a href="tel:+17189515074">718.951.5074</a> </p>
          
          <div className="contact-image">
            <img className="schedule-image" src="https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/directions-631x381%20(1).png?v=1745168515458" alt="Food Truck on Campus" />
          </div>
        </div>
        
        <div className="contact-right">
          <div className="vendor-contact">
            <h3>Basarvdogim on Wheels</h3>
            <p>E: <a href="mailto:basarvdogim@gmail.com" >basarvdogim@gmail.com</a></p>
            <p>P: <a href="tel:+17188748394">718.874.8394</a> </p>
          </div>
          
          <div className="vendor-contact">
            <h3>Sammy's Halal</h3>
            <p>E: <a href="mailto:sammyhalal@gmail.com">sammyhalal@gmail.com</a> </p>
            <p>P: <a href="tel:+17182743176">718.274.3176</a></p>
          </div>
          
          <div className="vendor-contact">
            <h3>Tacos y Pupusas Lizbeth</h3>
            <p>E: <a href="mailto:lizbethstruck@gmail.com">lizbethstruck@gmail.com</a></p>
            <p>P: <a href="tel:+16463935436">646.393.5436</a></p>
          </div>
          
          <div className="vendor-contact">
            <h3>The BK Jerk Mobile</h3>
            <p>E: <a href="mailto:bkjerktruck@gmail.com">bkjerktruck@gmail.com</a></p>
            <p>P: <a href="tel:+17182456388">718.245.6388</a></p>
          </div>
          
          <div className="vendor-contact">
            <h3>Jiannetto's Pizza</h3>
            <p>E: <a href="mailto:jiannettopizza@outlook.com">jiannettopizza@outlook.com</a></p>
            <p>P: <a href="tel:+17189519283">718.951.9283</a></p>
          </div>
          
          <div className="vendor-contact">
            <h3>Wafels & Dinges</h3>
            <p>E: <a href="mailto:wafels&dinges@gmail.com">wafels&dinges@gmail.com</a></p>
            <p>P: <a href="tel:+17184768272">718.476.8272</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

// About Page Component
export function AboutPage() {
  return (
    <div className="bc-bites-container">
      <Header />
      
      <div className="about-content">
        <h1>About BC Bites</h1>
        <p>We are a group of Brooklyn College students who got frustrated with the messy and hard-to-find food truck schedules buried in endless emails. It was difficult to know when and where we could grab our favorite meals. Since there was no simple and dependable way to find this information, we decided to solve the problem ourselves. That's why we created this website. It's a straightforward and quick solution made by students just like us to keep everyone informed without the hassle of numerous emails. With this site, there will be no more guessing and no more missed lunches—just delicious food, always on time.</p>
        <img className = "about-us-image" src = "https://cdn.glitch.global/517fcbda-27d5-4a6f-a83b-4e7f1dd0ed2e/11-CUNYverse-12-min.png?v=1745173825425"
          />
      </div>
    </div>
  );
}

// Main App Component
export default function Home() {
  return (
    <Router>
      <Seo />
      <main role="main" className="wrapper">
        <div className="content">
          {/* Router specifies which component to insert here as the main content */}
          <PageRouter />
        </div>
      </main>
      {/* Footer with Glitch remix button only */}
      <footer className="footer">
        
      </footer>
    </Router>
  );
}

import PageRouter from "./components/router.jsx";