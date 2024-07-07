import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Redirect = () => {
  const { id } = useParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchOriginal = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/url/${id}`);
        if (response.data.success) {
          setStatus("valid");
          let url = response.data.url;
          window.location.href = url;
        } else {
          setStatus("invalid");
        }
      } catch (error) {
        setStatus("error");
      }
    };

    fetchOriginal();
  }, []);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-xl font-semibold text-gray-700">Loading...</p>
          </>
        );
      case "valid":
        return (
          <>
            <svg
              className="w-16 h-16 text-green-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Redirecting You...
            </h2>
            <p className="text-gray-600">
              You&rsquo;ll be redirected to the original URL shortly.
            </p>
          </>
        );
      case "invalid":
        return (
          <>
            <svg
              className="w-16 h-16 text-red-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Link Is Not Valid
            </h2>
            <p className="text-gray-600 mb-4">
              The URL you&rsquo;re trying to access doesn&apos;t exist or has
              expired.
            </p>
            <Link
              to="/"
              className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
            >
              Return to Home
            </Link>
          </>
        );
      case "error":
        return (
          <>
            <svg
              className="w-16 h-16 text-yellow-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">
              We encountered an error while processing your request. Please try
              again later.
            </p>
            <Link
              to="/"
              className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
            >
              Return to Home
            </Link>
          </>
        );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 max-w-sm w-full bg-white rounded-lg shadow-md">
        {renderContent()}
      </div>
    </div>
  );
};

export default Redirect;
