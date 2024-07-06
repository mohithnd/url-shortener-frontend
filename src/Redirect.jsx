import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Redirect = () => {
  const { id } = useParams();
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOriginal = async () => {
      try {
        const config = {
          method: "get",
          url: `http://localhost:3000/url/${id}`,
        };
        const response = await axios.request(config);
        console.log(response.data);
        if (response.data.success) {
          // Uncomment the next line to enable actual redirection
          // window.location.href = response.data.url;
        } else {
          setIsValid(false);
        }
      } catch (error) {
        console.error("Error fetching URL:", error);
        setIsValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOriginal();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 max-w-sm w-full bg-white rounded-lg shadow-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 max-w-sm w-full bg-white rounded-lg shadow-md">
        {isValid ? (
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
        ) : (
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
            <p className="text-gray-600">
              The URL you&apos;re trying to access doesn&apos;t exist or has
              expired.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Redirect;
