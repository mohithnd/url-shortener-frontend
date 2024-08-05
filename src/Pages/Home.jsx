import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Config/ServerConfig";

function Home() {
  const [url, setUrl] = useState("");
  const [shorten, setShorten] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      return;
    }

    try {
      setShorten("");
      setError("");

      const body = JSON.stringify({ url });
      const config = {
        method: "post",
        url: `${API_BASE_URL}shorten`,
        headers: {
          "Content-Type": "application/json",
        },
        data: body,
      };

      const response = await axios.request(config);

      if (response.data.success) {
        setShorten({
          url: url,
          shortId: response.data.shortId,
        });
        setUrl("");
      } else {
        throw new Error(response.data.error);
      }
    } catch (err) {
      setError(err.message);
      setShorten("");
    }
  };

  const unsecureCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.log("Unable To Copy To Clipboard: ", err);
    }
    document.body.removeChild(textArea);
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${location}${shorten.shortId}`);
    } else {
      unsecureCopyToClipboard(`${location}${shorten.shortId}`);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-extrabold text-white mb-8 text-center shadow-text">
        Welcome To: Lilly
      </h1>
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          URL Shortener
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Shorten your long URLs with ease
        </p>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex items-center border-b border-gray-300 py-2">
            <input
              type="text"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value.trim())}
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />
            <button
              type="submit"
              className="flex-shrink-0 bg-purple-500 hover:bg-purple-700 border-purple-500 hover:border-purple-700 text-sm border-4 text-white py-1 px-2 rounded transition-colors duration-300"
            >
              Shorten
            </button>
          </div>
        </form>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {shorten && (
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-gray-700 mb-2">
              Original URL: <span className="font-semibold">{shorten.url}</span>
            </p>
            <div className="flex items-center">
              <input
                type="text"
                value={`${location}${shorten.shortId}`}
                readOnly
                className="bg-white border border-gray-300 rounded-l px-4 py-2 w-full text-gray-700 focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className={`transition-all duration-300 ease-in-out font-bold py-2 px-4 rounded-r ${
                  copied
                    ? "bg-green-500 hover:bg-green-700 text-white"
                    : "bg-blue-500 hover:bg-blue-700 text-white"
                }`}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
