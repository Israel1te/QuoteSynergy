import React, { useState, useEffect } from 'react';
import quotesData from './quotes.json';

const QuotesPage = () => {
    const [quotes, setQuotes] = useState([]);

    const soundBtn = document.querySelector(".sound")
    const copyBtn = document.querySelector(".copy")
    const twitterBtn = document.querySelector(".twitter")
    const quoteText = document.querySelector(".quote");
    const authorName = document.querySelector(".author")

    useEffect(() => {
        setQuotes(quotesData);

        function speakText() {
            let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
            console.log(utterance)
            speechSynthesis.speak(utterance)
            utterance = null
        }
        function copyText() {
            navigator.clipboard.writeText(quoteText.innerText);
        }
        function tweetText() {
            let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`
            window.open(tweetUrl, "_blank");
        }
    
        if (soundBtn) {
            soundBtn.addEventListener("click", speakText);
        }
        if (copyBtn) {
            copyBtn.addEventListener("click", copyText);
        }
        if (twitterBtn) {
            twitterBtn.addEventListener("click", tweetText);
        }
        return () => {
            // soundBtn.removeEventListener("click", speakText)
            // copyBtn.removeEventListener("click", copyText)
            // twitterBtn.removeEventListener("click", tweetText)
        };
    }, []);

  return (
    <div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            {quotes.map((quote, index) => (
                <div key={index} style={{ margin: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                    <p className='quote'>{quote.Content}</p>
                    <p className='author' style={{ textAlign: 'right', fontStyle: 'italic', marginTop: '15px' }}>{quote.Author}</p>
                    <div className="features">
                        <ul>
                            <li className="sound"><i className="fas fa-volume-up"></i></li>
                            <li className="copy"><i className="fas fa-copy"></i></li>
                            <li className="twitter"><i className="fab fa-twitter"></i></li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    </div>
    
  );
};

export default QuotesPage;
