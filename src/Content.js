import React, {useEffect} from "react";

//const loadStylesheet = async () => {
//    await import("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");
//};

const Content = ({title}) => {
    
    useEffect(() => {
        const quoteBtn = document.querySelector(".newQuote");
        const soundBtn = document.querySelector(".sound")
        const copyBtn = document.querySelector(".copy")
        const twitterBtn = document.querySelector(".twitter")
        const quoteText = document.querySelector(".quote");
        const authorName = document.querySelector(".author .name")
        
        function randomQuote() {
            quoteBtn.innerText = "Loading...";
            quoteBtn.classList.add("loading");
            fetch("https://api.quotable.io/random")
            .then((res) => res.json())
            .then((result) => {
                if (quoteText) {
                    quoteText.innerText = result.content;
                    authorName.innerText = result.author;
                    quoteBtn.innerText = "New Quote";
                    quoteBtn.classList.remove("loading");
                    
                }
            });
        }
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
    
        if (quoteBtn) {
          quoteBtn.addEventListener("click", randomQuote);
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
          if (quoteBtn) {
            quoteBtn.removeEventListener("click", randomQuote);
            soundBtn.removeEventListener("click", speakText)
            copyBtn.removeEventListener("click", copyText)
            twitterBtn.removeEventListener("click", tweetText)
          }
        };
      }, []);
    return ( 
        

        <div className="blog-list">
            <div className="wrapper">
                <h2> { title }</h2>
                <div className="home-content">
                    <div className="quote-area">
                        <i className="fas fa-quote-left"></i>
                        <p className="quote">Never give up, because the next try might be the one which works</p>
                        <i className="fas fa-quote-right"></i>
                    </div>
                    <div className="author">
                        <span>__</span>
                        <span className="name">Mary Ky Ash</span>
                    </div>
                </div>
                <div className="buttons">
                    <div className="features">
                        <ul>
                            <li className="sound"><i className="fas fa-volume-up"></i></li>
                            <li className="copy"><i className="fas fa-copy"></i></li>
                            <li className="twitter"><i className="fab fa-twitter"></i></li>
                        </ul>
                        <button className="newQuote">New Quote</button>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Content;