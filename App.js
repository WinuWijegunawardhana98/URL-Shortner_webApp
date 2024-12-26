import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error and shortUrl state before API call
    setError("");
    setShortUrl("");

    if (!originalUrl) {
      setError("URL is required");
      return;
    }

    try {
      // Send POST request to backend
      const response = await axios.post("http://localhost:5000/api/url/shorten", { originalUrl });
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      setError("Failed to shorten URL");
    }
  };

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>
      
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {shortUrl && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
        </div>
      )}
    </div>
  );
}

export default App;
