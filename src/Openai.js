import React from "react";
import OpenAI from "openai";
import config from "./config.json";

const Openai = () => {
    const generateResponse = async () => {
        const openaiApiKey = config.openaiApiKey;
        const prompt = document.getElementById("promptInput").value;
        const openai = new OpenAI({ apiKey: openaiApiKey, dangerouslyAllowBrowser: true });

        try {
            const response = await openai.chat.completions.create({
                messages: [{"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": "Who won the world series in 2020?"},
                    {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
                    {"role": "user", "content": prompt}],
                model: "gpt-3.5-turbo",
              });

            document.getElementById("responseArea").innerText = response.choices[0].message.content;
            console.log(response.choices[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="openai">
            <h2>AI Quote Generator</h2>
            <label>Please enter your prompt below:</label>
            <textarea id="promptInput" rows="4" cols="50"></textarea><br/><br/>
            <button onClick={generateResponse}>Submit</button><br/><br/>
            <div id="responseArea"></div>
        </div>
    );
}

export default Openai;