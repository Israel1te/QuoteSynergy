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
  const [quoteData, setQuoteData] = useState(null);
  const containerRef = useRef(null);
  

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

  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.offsetHeight;
      containerRef.current.style.height = `${height}px`;
    }
  }, [quoteData]);

  return (
    // <div
    //   className="quote-container"
    //   ref={containerRef}
    //   style={{
    //     position: 'relative',
    //     top: '-90px',
    //     border: '2px solid #ccc',
    //     borderRadius: '8px',
    //     padding: '10px',
    //     //margin: '20px auto', // Center the container horizontally
    //     maxWidth: '600px',
    //     height: '250px', // Set a fixed height
    //     overflow: 'hidden', // Prevent content from overflowing
    //   }}
    // >
    //   <div className="quote-content" style={{ display: isLoading ? 'none' : 'block', padding: '10px' }}>
    //     <p>{quoteData ? `${quoteData.content}` : ''}</p>
    //     <div style={{ textAlign: 'right' }}>
    //       <p>{quoteData ? `- ${quoteData.author}` : ''}</p>
    //     </div>
    //   </div>
    //   <button className="generate-button" onClick={handleGenerateQuote} disabled={isLoading} style={{ margin: '10px' }}>
    //     {isLoading ? 'Generating...' : 'Generate New Quote'}
    //   </button>
    // </div>
      <button className="generate-button" onClick={handleGenerateQuote} disabled={isLoading} style={{ margin: '10px',
      border: 'none',
      color: 'white',
      padding: '5px 10px', 
      textAlign: 'center',
      textDecoration: 'none', 
      fontSize: '15px', 
      backgroundColor: "#396b44",
      borderRadius: '8px', 
      cursor: 'pointer', 
      marginTop: "20px",
      transition: 'background-color 0.3s ease' }} 
      onMouseOver={(e) => {e.target.style.backgroundColor = '#45a049'}} 
      onMouseOut={(e) => {e.target.style.backgroundColor = '#4CAF50'}}>
        {isLoading ? 'Generating...' : 'Generate New Quote'}
      </button>
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
      const response = await fetch('https://api.pexels.com/v1/search?query=nature&per_page=1&page=' + Math.floor(Math.random() * 10) + 1, {
        headers: {
          Authorization: pexelsApiKey
        }
      });
      const data = await response.json();
      setImageUrl(data.photos[0].src.large);
      setAuthorName(data.photos[0].photographer);
      setAuthorUrl(data.photos[0].photographer_url);
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

      context.font = '38px ' + fontFamily; // Apply selected font family
      context.textAlign = 'center';
      context.fillStyle = fontColor; // Apply selected font color
      context.shadowColor = 'black';
      context.shadowBlur = 0.5;
      context.strokeStyle = 'black';
      context.lineWidth = 0.5;

      const maxTextWidth = canvas.width - 40; // Subtracting padding
      const words = quote.split(' ');
      let line = '';
      let y = (canvas.height / 100) * textPosition; // Adjust y position based on textPosition

      for (let word of words) {
        const testLine = line + word + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxTextWidth) {
          context.fillText(line, canvas.width / 2, y);
          context.strokeText(line, canvas.width / 2, y); // Outline text
          line = word + ' ';
          y += 40; // Adjust line height
        } else {
          line = testLine;
        }
      }

      context.fillText(line, canvas.width / 2, y);
      context.strokeText(line, canvas.width / 2, y); // Outline text

      // Apply font effects to author's name
      context.font = '24px ' + fontFamily;
      context.textAlign = 'right';
      context.shadowBlur = 0.3;
      //const authorWidth = context.measureText(`- ${author}`).width;
      const authorX = canvas.width - 60;
      context.fillText(`- ${author}`, authorX, y + 40);
      context.strokeText(`- ${author}`, authorX, y + 40);
    };
    image.src = imageUrl;
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
          <input style={{fontSize: "15px", padding: "5px 10px 5px 5px", marginLeft: "10px"}} type="range" min="35" max="65" value={textPosition} onChange={handleTextPositionChange} />
          <span>{textPosition}</span>
        </label>
      </div>
      <button className="refresh-button" onClick={handleRefreshImage} style={{ margin: '15px', backgroundColor: "#396b44", color: "white", padding: "10px", borderRadius: "15px", border: "none"  }}>Refresh Image</button>
      <button className="export-button" onClick={handleExportImage} style={{ margin: '15px', backgroundColor: "#396b44", color: "white", padding: "10px", borderRadius: "15px", border: "none"  }}>Export Image</button>
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
      <div className="content-container" style={{ marginTop: '50px' }}> {/* Adjust marginTop as needed */}
        <div className="quote-generator" style={{ display: 'inline-block' }}>
          <QuoteGenerator setQuote={setQuote} setAuthor={setAuthor} />
        </div>
        <div className="divider" style={{ position: 'relative', top: '-60px', height: '2px', background: '#ccc', margin: '20px auto', maxWidth: '600px' }}></div>
        <div className="image-overlay" style={{ display: 'inline-block' }}>
          <ImageOverlay quote={quote} author={author} />
        </div>
      </div>
    </div>
  );
};

export default ImgGen;

