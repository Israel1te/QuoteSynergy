/*
Provisional Image Generation feature - Intended use is to retrieve a royalty-free image from
a stock photo catalog and allow the users to either generate a random quoation (or enter
their own!) to customize a motivational-poster style wallpaper to share on the platform
or export locally to a device.

-Features currently implemented:
--General framework of handling Image rendering and export/saving
--Valid calls of the Pexel's Developer API, providing credits to the photo's author and a link
--Basic font customization feautres, ability to modify color, font family, and postition on image

-Features to be expanded upon:
--Allow the user to decide what photo orientation they are looking for (portrait, landscape),
this will fix many of the strange behavioral issues where the image container resizes when new
images are loaded
--Integrate the page with the social aspects of the website (export to blog or social media page?)
--Polish the UX of the page, ensure better compatability/scaling with mobile devices
--Allow for more fine-tuned customization, make the editing interface appear more modern
--Potentially cache the photos and info gathered using the pexels API serverside to prevent
uneeded, excessive use of the rate-limited API - currently is just using placeholder images
for example purposes
--Integrate the quote generator with the OpenAI prompting service the other site modules use
*/
import { NavLink } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import config from "./config.json";

const QuoteGenerator = ({ setQuote, setAuthor }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userQuote, setUserQuote] = useState("");
  const [useUserQuote, setUseUserQuote] = useState(false);

  useEffect(() => {
    if (!useUserQuote) {
      fetchRandomQuote();
    }
  }, [useUserQuote]);

  const fetchRandomQuote = () => {
    setIsLoading(true);
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        setQuote(`${data.content}`);
        setAuthor(data.author);
      })
      .catch((error) => console.error("Error fetching quote:", error))
      .finally(() => setIsLoading(false));
  };

  const handleGenerateQuote = () => {
    if (useUserQuote) {
      setQuote(userQuote);
      setAuthor("");
    } else {
      fetchRandomQuote();
    }
  };

  return (
    <div className="quote-generator-container" style={{ textAlign: "center" }}>
      <h1 style={{ maxWidth: '900px'}}>
        Create Beautiful and Easily Shareable Quote Images Within Seconds!
      </h1>

      <p
        style={{
          fontSize: "18px",
          margin: "10px",
          margin: "10px",
          marginBottom: "15px",
        }}
      >
        <input
          type="checkbox"
          checked={useUserQuote}
          onChange={() => setUseUserQuote(!useUserQuote)}
          style={{ margin: "0 5px", marginRight: "15px" }}
        />
        Check this box to enter your own quote!
      </p>
      <p style={{ fontSize: "18px", marginBottom: "10px" }}>
        <span className="tip-text">Tip:</span> copy and paste inspiring quotes
        from our{" "}
        <NavLink to="/openai" className="openai-link">
          Quote Generator
        </NavLink>
        !
      </p>
      <br />
      <input
        type="text"
        value={userQuote}
        onChange={(e) => setUserQuote(e.target.value)}
        placeholder="Type your own quote here..."
        style={{
          margin: "10px",
          padding: "10px 0px 100px 10px",
          fontSize: "18px",
          width: "70%",
          borderRadius: "8px",
          border: "1px solid #ccc",
          outline: "none",
        }}
        disabled={isLoading || !useUserQuote}
      />
      <br />
      <button
        className="generate-button"
        onClick={handleGenerateQuote}
        disabled={isLoading}
        style={{
          marginTop: "30px",
          marginBottom: "50px",
          margin: "10px",
          padding: "15px 20px",
          fontSize: "16px",
          backgroundColor: "#396b44",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        {isLoading ? "Generating..." : "Generate Quote"}
      </button>
    </div>
  );
};

const ImageOverlay = ({ quote, quoteData, author }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [fontFamily, setFontFamily] = useState("Impact");
  const [fontColor, setFontColor] = useState("#ffffff");
  const [textPosition, setTextPosition] = useState(50);
  const canvasRef = useRef(null);
  const pexelsApiKey = config.pexelsApiKey;

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const [authorName, setAuthorName] = useState("");
  const [authorUrl, setAuthorUrl] = useState("");

  const fetchRandomImage = async () => {
    try {
      const page = Math.floor(Math.random() * 10) + 1;
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=nature&page=${page}`,
        {
          headers: {
            Authorization: pexelsApiKey,
          },
        }
      );
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.photos.length);
      setImageUrl(data.photos[randomIndex].src.large);
      setAuthorName(data.photos[randomIndex].photographer);
      setAuthorUrl(data.photos[randomIndex].photographer_url);
    } catch (error) {
      console.error("Error fetching random image:", error);
    }
  };

  const handleRefreshImage = () => {
    fetchRandomImage();
  };

  const handleExportImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "quote_image.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
  };

  const handleFontColorChange = (event) => {
    setFontColor(event.target.value);
  };

  const handleTextPositionChange = (event) => {
    setTextPosition(event.target.value);
  };

  const drawImageWithQuote = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);

      context.textAlign = "center";
      context.shadowColor = "black";
      context.shadowBlur = 0.5;
      context.strokeStyle = "black";
      context.lineWidth = 0.5;

      const maxTextWidth = canvas.width - 40;
      let fontSize = 38;
      let y = (canvas.height / 100) * textPosition;

      while (true) {
        context.font = `${fontSize}px ${fontFamily}`;
        const textHeight = fontSize * 1.5;
        const lines = splitLines(context, quote, maxTextWidth);
        const textHeightNeeded = lines.length * textHeight;

        if (textHeightNeeded <= canvas.height - y - 40) {
          break;
        } else {
          fontSize -= 2;
        }
      }

      context.fillStyle = fontColor;
      const lines = splitLines(context, quote, maxTextWidth);
      lines.forEach((line, index) => {
        context.fillText(line, canvas.width / 2, y + index * (fontSize * 1.5));
        context.strokeText(
          line,
          canvas.width / 2,
          y + index * (fontSize * 1.5)
        );
      });

      context.font = `24px ${fontFamily}`;
      context.textAlign = "right";
      context.shadowBlur = 0.3;
      const authorX = canvas.width - 60;
      context.fillText(
        `- ${author}`,
        authorX,
        y + lines.length * (fontSize * 1.5)
      );
      context.strokeText(
        `- ${author}`,
        authorX,
        y + lines.length * (fontSize * 1.5)
      );
    };
    image.src = imageUrl;
  };

  const splitLines = (context, text, maxWidth) => {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine + (currentLine ? " " : "") + word;
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    lines.push(currentLine);
    return lines;
  };

  useEffect(() => {
    if (imageUrl && quote) {
      drawImageWithQuote();
    }
  }, [imageUrl, quote, fontFamily, fontColor, textPosition]);

  return (
    <div className="image-overlay-container" style={{ textAlign: "center" }}>
      <div className="image-container">
        {imageUrl && (
          <canvas
            ref={canvasRef}
            className="overlay-image"
            style={{ margin: "0 auto", maxWidth: "100%", marginTop: "50px" }}
          />
        )}
      </div>
      <div className="customize-section" style={{ margin: "10px" }}>
        <div className="flex-2">
          <label style={{ marginRight: "25px", fontSize: "18px" }}>
            Font Family :
            <select
              style={{
                fontSize: "18px",
                padding: "5px 10px 5px 5px",
                marginLeft: "10px",
              }}
              value={fontFamily}
              onChange={handleFontFamilyChange}
            >
              <option value="Impact">Impact</option>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Verdana">Verdana</option>
              <option value="Georgia">Georgia</option>
              <option value="Tahoma">Tahoma</option>
              <option value="Comic Sans MS">Comic Sans MS</option>
            </select>
          </label>
          <label style={{ marginRight: "25px", fontSize: "18px" }}>
            Font Color :
            <input
              style={{
                fontSize: "18px",
                padding: "5px 10px 5px 5px",
                marginLeft: "10px",
              }}
              type="color"
              value={fontColor}
              onChange={handleFontColorChange}
            />
          </label>
        </div>
        <div>
          <label style={{ marginRight: "0px", fontSize: "18px" }}>
            Vertical Text Position:
            <input
              style={{
                fontSize: "18px",
                padding: "5px 10px 5px 5px",
                marginLeft: "10px",
              }}
              type="range"
              min="15"
              max="85"
              value={textPosition}
              onChange={handleTextPositionChange}
            />
            <span>{textPosition}</span>
          </label>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <button
          className="refresh-button"
          onClick={handleRefreshImage}
          style={{
            margin: "0 10px",
            fontSize: "16px",
            backgroundColor: "#396b44",
            color: "white",
            padding: "13px 22px",
            borderRadius: "15px",
            border: "none",
            cursor: "pointer",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#396b44";
            e.target.style.opacity = "0.8";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#396b44";
            e.target.style.opacity = "1";
          }}
          onMouseDown={(e) => {
            e.target.style.backgroundColor = "#396b44";
            e.target.style.opacity = "0.6";
          }}
          onMouseUp={(e) => {
            e.target.style.backgroundColor = "#396b44";
            e.target.style.opacity = "1";
          }}
        >
          Refresh Image
        </button>
        <button
          className="export-button"
          onClick={handleExportImage}
          style={{
            margin: "0 10px",
            fontSize: "16px",
            backgroundColor: "#396b44",
            color: "white",
            padding: "13px 22px",
            borderRadius: "15px",
            border: "none",
            cursor: "pointer",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#396b44";
            e.target.style.opacity = "0.8";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#396b44";
            e.target.style.opacity = "1";
          }}
          onMouseDown={(e) => {
            e.target.style.backgroundColor = "#396b44";
            e.target.style.opacity = "0.6";
          }}
          onMouseUp={(e) => {
            e.target.style.backgroundColor = "#396b44";
            e.target.style.opacity = "1";
          }}
        >
          Export Image
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        Photo by{" "}
        <a href={authorUrl} target="_blank" rel="noopener noreferrer">
          {authorName}
        </a>{" "}
        on Pexels
      </div>
    </div>
  );
};

const ImgGen = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  return (
    <div className="app-container" style={{ textAlign: "center" }}>
      <div className="content-container" style={{ marginTop: "10px" }}>
        <div className="quote-generator" style={{ display: "inline-block" }}>
          <QuoteGenerator setQuote={setQuote} setAuthor={setAuthor} />
        </div>
        <div></div>
        <div
          className="image-overlay"
          style={{ display: "inline-block", verticalAlign: "top" }}
        >
          <ImageOverlay quote={quote} author={author} />
        </div>
      </div>
      <section>
        <div className="steps-container">
          <h2>Create Inspiring Quote Images in 3 Easy Steps!</h2>
          <div className="grid-3">
            <div className="generate-card">
              <p className="generate-step">1</p>
              <p className="generate-text">
                Generate a random quote and image or input a quote of your
                choosing
              </p>
            </div>
            <div className="generate-card">
              <p className="generate-step">2</p>
              <p className="generate-text">
                Choose your preferred font, color, and quote positioning
              </p>
            </div>
            <div className="generate-card">
              <p className="generate-step">3</p>
              <p className="generate-text">
                Download your customized quote image or refresh to generate a
                new one!
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>Copyright © 2024 QuoteSynergy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ImgGen;
