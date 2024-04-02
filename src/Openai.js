import React, { useState } from "react";
import OpenAI from "openai";
import config from "./config.json";

const Openai = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
=======
  const [quotes, setQuotes] = useState([]);
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  const speakQuote = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };
>>>>>>> 6316cd2 (Steps Section Added)

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const generateResponse = async () => {
    const openaiApiKey = config.openaiApiKey;
    const openai = new OpenAI({
      apiKey: openaiApiKey,
      dangerouslyAllowBrowser: true,
    });

    setLoading(true);

    try {
      const response = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Who won the world series in 2020?" },
          {
            role: "assistant",
            content: "The Los Angeles Dodgers won the World Series in 2020.",
          },
          { role: "user", content: prompt },
        ],
        model: "gpt-3.5-turbo",
      });

      document.getElementById("responseArea").innerText =
        response.choices[0].message.content;
      console.log(response.choices[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="openai">
<<<<<<< HEAD
      <h2>AI Quote Generator</h2>
      <p className="promptInput">Please enter your prompt below:</p>
      <textarea
        id="promptInput"
        rows="4"
        cols="50"
        value={prompt}
        onChange={handleInputChange}
        style={{ height: "auto" }}
        placeholder="Type your prompt here..."
      ></textarea>
      <br />
      <br />
      <button onClick={generateResponse} className={loading ? "loading" : ""}>
        {loading ? "Loading..." : "Submit"}
      </button>
      <br />
      <br />
      <div id="responseArea"></div>
=======
      <div className="generator-container">
        <h2>AI Quote Generator</h2>
        <p className="promptInput">Please enter your prompt below:</p>
        <textarea
          id="promptInput"
          rows="4"
          cols="50"
          value={prompt}
          onChange={handleInputChange}
          style={{ height: "auto" }}
          placeholder="Type your prompt here..."
        ></textarea>
        <br />
        <br />
        <div className="input-container">
          <div className="amount-container">
            <label htmlFor="promptInput2">Amount of quotes:</label>

            <input
              id="promptInput2"
              type="number"
              value={numberInput}
              onChange={handleNumberInputChange}
              min={0}
              max={5}
            />
          </div>
          <div className="tone-container">
            <label htmlFor="tone">Select tone:</label>
            <div className="custom-select">
              <select
                id="tone"
                value={selectedTone}
                onChange={handleToneChange}
              >
                <option value="neutral">Neutral</option>
                <option value="friendly">Friendly</option>
                <option value="inspirational">Inspirational</option>
                <option value="relaxed">Relaxed</option>
                <option value="funny">Funny</option>
                <option value="professional">Professional</option>
                <option value="witty">Witty</option>
                <option value="adventurous">Adventurous</option>
              </select>
            </div>
          </div>
        </div>
        <br />
        <br />
        <button onClick={generateResponse} className={loading ? "loading" : ""}>
          {loading ? "Loading..." : "Generate"}
        </button>
        <br />
        <br />
        <div id="responseArea">
          {quotes.map((quote) => (
            <div className="quote-container" key={quote}>
              <div className="quote-text">{quote}</div>
              <div className="btn-container">
                <button onClick={() => copyToClipboard(quote)}>
                  {" "}
                  <i className="fas fa-copy"></i>
                </button>
                <button onClick={() => speakQuote(quote)}>
                  <i className="fas fa-volume-up"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <section>
        <div className="how-to-container">
          <h2>Generate Quotes in 3 Simple Steps!</h2>
          <div className="flex-3">
            <div className="generate-card">
              <p className="generate-step">1</p>

              <p className="generate-text">
                Input a quote topic that resonates with you
              </p>
            </div>
            <div className="generate-card">
              <p className=" generate-step">2</p>
              <p className="generate-text">
                Select the tone of the quote and how many quotes you want to
                output
              </p>
            </div>

            <div className="generate-card">
              <p className="generate-step">3</p>
              <p className="generate-text">Click the generate button</p>
            </div>
          </div>
        </div>
      </section>
>>>>>>> 6316cd2 (Steps Section Added)
    </div>
  );
};

export default Openai;
