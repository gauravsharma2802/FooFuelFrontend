import React, { useState, useEffect } from 'react';

// Main App component for testing Java API integration
const App = () => {
  // State for the counter value, fetched from/sent to Java API
  const [count, setCount] = useState(0);
  // State for loading status during API calls
  const [loading, setLoading] = useState(true);
  // State for any error messages during API calls
  const [error, setError] = useState(null);

  // IMPORTANT: Define the base URL for your Java API.
  // This must match where your Spring Boot application is running.
  // In a real application, this would be an environment variable.
  const API_BASE_URL = 'http://localhost:8080/api/counter'; // Assumes your Java API runs on port 8080

  // useEffect hook to fetch the initial count when the component mounts
  useEffect(() => {
    const fetchCount = async () => {
      try {
        setLoading(true); // Indicate loading has started
        setError(null);   // Clear any previous errors

        console.log(`Attempting to fetch initial count from: ${API_BASE_URL}`);
        const response = await fetch(API_BASE_URL);

        // Check if the HTTP response was successful (status code 200-299)
        if (!response.ok) {
          // If not successful, throw an error with the status
          throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json(); // Parse the JSON response
        console.log("Initial count fetched:", data);
        // Assuming the API returns an object like { value: 0 }
        setCount(data.value); // Update the React state with the fetched value
      } catch (err) {
        // Catch any errors during the fetch operation
        console.error("Failed to fetch initial count:", err);
        setError(`Failed to load initial count: ${err.message}. Ensure Java backend is running on ${API_BASE_URL.split('/api')[0]} and CORS is configured.`);
      } finally {
        setLoading(false); // Loading is complete, regardless of success or failure
      }
    };

    fetchCount(); // Execute the fetch operation when the component mounts
  }, []); // Empty dependency array means this effect runs only once after the initial render

  // Generic function to make API calls for counter operations (increment, decrement, reset)
  const updateCounter = async (endpoint, method = 'POST') => {
    try {
      setLoading(true); // Show loading indicator
      setError(null);   // Clear previous errors

      const url = `${API_BASE_URL}/${endpoint}`;
      console.log(`Attempting to ${endpoint} counter via ${method} to: ${url}`);

      const response = await fetch(url, {
        method: method, // HTTP method (e.g., 'POST')
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
        },
        // For POST requests that might send data, you would include a 'body' here:
        // body: JSON.stringify({ /* your data if needed for the endpoint */ })
      });

      if (!response.ok) {
        // If the response is not OK, throw an error
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json(); // Parse the JSON response
      console.log(`Counter ${endpoint} successful. New count:`, data.value);
      setCount(data.value); // Update local React state with the new count from API
    } catch (err) {
      // Catch and log any errors during the API call
      console.error(`Failed to ${endpoint} counter:`, err);
      setError(`Failed to perform ${endpoint} action: ${err.message}. Check network and backend logs.`);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Event handlers for buttons, calling the generic updateCounter function
  const increment = () => updateCounter('increment');
  const decrement = () => updateCounter('decrement');
  const reset = () => updateCounter('reset');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center w-full max-w-md border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Counter App (Java Integration Test)</h1>

        {/* Display loading message when an API call is in progress */}
        {loading && (
          <div className="text-blue-500 mb-4 flex items-center justify-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading...</span>
          </div>
        )}

        {/* Display error message if an API call fails */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        {/* Display counter value only when not loading and no error */}
        {!loading && !error && (
          <p className="text-6xl font-extrabold text-indigo-600 mb-8">{count}</p>
        )}

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={decrement}
            disabled={loading} // Disable buttons during loading
            className="w-full px-6 py-3 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Decrement
          </button>
          <button
            onClick={reset}
            disabled={loading}
            className="w-full px-6 py-3 bg-gray-500 text-white font-semibold rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset
          </button>
          <button
            onClick={increment}
            disabled={loading}
            className="w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
