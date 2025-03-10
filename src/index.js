import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ClerkProvider } from '@clerk/clerk-react';

// Access the Publishable Key using the CRA environment variable
const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

// Log it to make sure it's being picked up
console.log('Publishable Key: >>>', PUBLISHABLE_KEY);
//process.env.REACT_APP_CLERK_PUBLISHABLE_KEY
console.log("Publishable Key: ", process.env.REACT_APP_CLERK_PUBLISHABLE_KEY);


// Check if the key exists and throw an error if it's missing
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <App />
  </ClerkProvider>
);

reportWebVitals();
