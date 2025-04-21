import React from "react";

// The browser's user system settings can indicate a preference for reduced motion.
// This is useful for accessibility, especially for users sensitive to animations.
// https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
const query = "(prefers-reduced-motion: no-preference)";

// 🌟 Custom React hook to detect if the user prefers reduced motion
export function usePrefersReducedMotion() {
  // React state to track whether the user *does* prefer reduced motion
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(
    // The initial value is the *opposite* of the match:
    // If matchMedia(query).matches is true (user has *no* preference for reduced motion),
    // then prefersReducedMotion is false.
    !window.matchMedia(query).matches
  );

  // React effect hook to listen for changes in the user's motion preference
  React.useEffect(() => {
    // Create a MediaQueryList object to observe the user's motion preference
    const mediaQueryList = window.matchMedia(query);

    // Define a listener function that updates state when the media query result changes
    const listener = event => {
      // Update state with the inverse of the current match status
      setPrefersReducedMotion(!event.matches);
    };

    // Add the listener to the MediaQueryList
    mediaQueryList.addListener(listener);

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      mediaQueryList.removeListener(listener);
    };
  }, []); // Empty dependency array means this effect runs only once on mount

  // Return whether the user prefers reduced motion
  return prefersReducedMotion;
}
