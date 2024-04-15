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

import React, { useState, useEffect, useRef } from 'react';
import config from "./config.json";

const QuoteGenerator = ({ setQuote, setAuthor }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [, setQuoteData] = useState(null);
  const [, setFetchedQuote] = useState('');

  useEffect(() => {
    fetchRandomQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRandomQuote = () => {
    setIsLoading(true);
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => {
        setQuoteData(data);
        setFetchedQuote(data.content);
        setQuote(`${data.content}`);
        setAuthor(data.author);
      })
      .catch(error => console.error('Error fetching quote:', error))
      .finally(() => setIsLoading(false));
  };

  const handleGenerateQuote = () => {
    setQuote('');
    fetchRandomQuote();
  };

  return (
    <div className="quote-generator-container" style={{ textAlign: 'center' }}>
      <button className="generate-button" onClick={handleGenerateQuote} disabled={isLoading} style={{ margin: '10px', border: '2px solid #ccc', color: 'white', padding: '15px 20px', textAlign: 'center', textDecoration: 'none', fontSize: '12px', backgroundColor: '#396b44', borderRadius: '8px', cursor: 'pointer', marginTop: "20px", transition: 'background-color 0.3s ease' }} onMouseOver={(e) => { e.target.style.backgroundColor = '#45a049' }} onMouseOut={(e) => { e.target.style.backgroundColor = '#4CAF50' }}>
        {isLoading ? 'Generate New Quote' : 'Generate New Quote'}
      </button>
    </div>
  );
};

const ImageOverlay = ({ quote, quoteData, author }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [fontFamily, setFontFamily] = useState('Impact');
  const [fontColor, setFontColor] = useState('#ffffff');
  const [textPosition, setTextPosition] = useState(50); // Initial position
  const canvasRef = useRef(null);
  const pexelsApiKey = config.pexelsApiKey;

  useEffect(() => {
    fetchRandomImage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [authorName, setAuthorName] = useState('');
  const [authorUrl, setAuthorUrl] = useState('');

  // Hold off on using the pexels API until the page is fully squared away so as to preserve the limited API calls
  const fetchRandomImage = async () => {
    try {
      const page = Math.floor(Math.random() * 10) + 1; // Generate a random page number
      const response = await fetch(`https://api.pexels.com/v1/search?query=nature&page=${page}`, {
        headers: {
          Authorization: pexelsApiKey
        }
      });
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.photos.length); // Select a random image from the fetched results
      setImageUrl(data.photos[randomIndex].src.large);
      setAuthorName(data.photos[randomIndex].photographer);
      setAuthorUrl(data.photos[randomIndex].photographer_url);
    } catch (error) {
      console.error('Error fetching random image:', error);
    }
  };

  const handleRefreshImage = () => {
    fetchRandomImage();
  };

  const handleExportImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'quote_image.png';
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
    const context = canvas.getContext('2d');
  
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
  
      context.textAlign = 'center';
      context.shadowColor = 'black';
      context.shadowBlur = 0.5;
      context.strokeStyle = 'black';
      context.lineWidth = 0.5;
  
      const maxTextWidth = canvas.width - 40; // Subtracting padding
      let fontSize = 38; // Initial font size
      let y = (canvas.height / 100) * textPosition; // Adjust y position based on textPosition
  
      // Adjust font size dynamically based on quote length and canvas dimensions
      while (true) {
        context.font = `${fontSize}px ${fontFamily}`; // Apply selected font family
        const textHeight = fontSize * 1.5; // Estimated line height
        const lines = splitLines(context, quote, maxTextWidth);
        const textHeightNeeded = lines.length * textHeight;
        
        if (textHeightNeeded <= canvas.height - y - 40) {
          break;
        } else {
          fontSize -= 2; // Reduce font size if text overflows
        }
      }
  
      // Draw text
      context.fillStyle = fontColor; // Apply selected font color
      const lines = splitLines(context, quote, maxTextWidth);
      lines.forEach((line, index) => {
        context.fillText(line, canvas.width / 2, y + index * (fontSize * 1.5));
        context.strokeText(line, canvas.width / 2, y + index * (fontSize * 1.5)); // Outline text
      });
  
      // Apply font effects to author's name
      context.font = `24px ${fontFamily}`;
      context.textAlign = 'right';
      context.shadowBlur = 0.3;
      const authorX = canvas.width - 60;
      context.fillText(`- ${author}`, authorX, y + lines.length * (fontSize * 1.5));
      context.strokeText(`- ${author}`, authorX, y + lines.length * (fontSize * 1.5));
    };
    image.src = imageUrl;
  };
  
  // Function to split text into multiple lines based on maximum width
  const splitLines = (context, text, maxWidth) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
  
    words.forEach(word => {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl, quote, fontFamily, fontColor, textPosition]);

  return (
    <div className="image-overlay-container" style={{ textAlign: 'center' }}>
      <div className="image-container">
        {imageUrl && (
          <canvas ref={canvasRef} className="overlay-image" style={{ margin: '0 auto' }} />
        )}
      </div>
      <div className="customize-section" style={{ margin: '10px' }}>
        <label style={{ marginRight: '10px', fontSize: "15px" }}>
          Font Family  :  
          <select style={{fontSize: "15px", padding: "5px 10px 5px 5px", marginLeft: "10px"}} value={fontFamily} onChange={handleFontFamilyChange }>
            <option value="Impact">Impact</option>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
            <option value="Georgia">Georgia</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
          </select>
        </label>
        <label style={{ marginRight: '10px', fontSize: "15px" }}>
          Font Color   : 
          <input style={{fontSize: "15px", padding: "5px 10px 5px 5px", marginLeft: "10px"}} type="color" value={fontColor} onChange={handleFontColorChange} />
        </label>
        <label style={{ marginRight: '10px', fontSize: "15px" }}>
          Vertical Text Position:
          <input style={{fontSize: "15px", padding: "5px 10px 5px 5px", marginLeft: "10px"}} type="range" min="15" max="85" value={textPosition} onChange={handleTextPositionChange} />
          <span>{textPosition}</span>
        </label>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button className="refresh-button" onClick={handleRefreshImage} style={{ margin: '0 10px', backgroundColor: '#396b44', color: 'white', padding: '10px', borderRadius: '15px', border: 'none', cursor: 'pointer' }}>Refresh Image</button>
        <button className="export-button" onClick={handleExportImage} style={{ margin: '0 10px', backgroundColor: '#396b44', color: 'white', padding: '10px', borderRadius: '15px', border: 'none', cursor: 'pointer' }}>Export Image</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        Photo by <a href={authorUrl} target="_blank" rel="noopener noreferrer">{authorName}</a> on Pexels
      </div>
    </div>
  );
};


const ImgGen = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  return (
    <div className="app-container" style={{ textAlign: 'center' }}>
      <div className="content-container" style={{ marginTop: '10px' }}>
        <div className="quote-generator" style={{ display: 'inline-block' }}>
          <QuoteGenerator setQuote={setQuote} setAuthor={setAuthor} />
        </div>
      <div></div>
        <div className="image-overlay" style={{ display: 'inline-block', verticalAlign: 'top' }}>
          <ImageOverlay quote={quote} author={author} />
        </div>
      </div>
    </div>
  );
};


export default ImgGen;

