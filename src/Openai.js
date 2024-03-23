import React, { useState } from "react";
import OpenAI from "openai";
import config from "./config.json";

const Openai = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

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
    </div>
  );
};

export default Openai;
