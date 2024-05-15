# QuoteSynergy

## Table of Contents

- [About](#about)
- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## About

Individuals often face challenges related to mental health and burnout due to societal pressures. QuoteSynergy aims to remedy this by providing a safe and inclusive hub where users can authentically find motivation to improve their lives or the lives of those around them through the means of motivational quotes. The development process heavily focused on incorporating principles of Human-Computer Interaction (HCI) to ensure optimal usability and inclusivity. By utilizing tools like React, JavaScript, OpenAI, Quotable, and Pexels, QuoteSynergy offers a dynamic and engaging platform that caters to diverse user needs.

* Contributors 

------------------
- Israel Ibinayin
- Joy Davis
- Arman Arvanti 
-------------------

## Demo

Link to live demo
1. This app was not made for deployment and user may experience an initial load of 1-2 minutes.
- https://quote-syn.web.app/

Screenshots
- Landing Page
  * <img width="1676" alt="Screenshot 2024-05-15 at 10 18 03 AM" src="https://github.com/Israel1te/QuoteSynergy/assets/122021958/42ed90be-8ee2-4004-a4ba-3c82f7f79e71">
  * <img width="1441" alt="Screenshot 2024-05-15 at 10 18 47 AM" src="https://github.com/Israel1te/QuoteSynergy/assets/122021958/92db4ee4-0fd8-428c-878c-47646a2c71c9">
  * <img width="966" alt="Screenshot 2024-05-15 at 10 18 58 AM" src="https://github.com/Israel1te/QuoteSynergy/assets/122021958/e2ec27b6-2ef6-4f98-8ab7-77104a82142d">

- OpenAI API and Quote Generator
  * <img width="1680" alt="Screenshot 2024-05-15 at 10 22 16 AM" src="https://github.com/Israel1te/QuoteSynergy/assets/122021958/a23e23d4-bec1-4b29-8a90-4db5c72324db">
  * <img width="878" alt="Screenshot 2024-05-15 at 10 29 34 AM" src="https://github.com/Israel1te/QuoteSynergy/assets/122021958/d89d1f37-9990-4268-9615-582113d32958">

- Quote Generator with Images
  * <img width="920" alt="Screenshot 2024-05-15 at 10 31 10 AM" src="https://github.com/Israel1te/QuoteSynergy/assets/122021958/1e164cd2-7e5a-43ea-bbf7-a2b3b9c93bea">
  * user can type in their own quote, generate a random one, or use one from the quote generator tab



## Features

- OpenAI Quote Generation
    * Using the openai api and a system prompt that can fine tune the users's needs, a random quote is generated according to the user specified theme
- Quotable Quote of the Day
    * The Quotable API also returns other random motivational quote that can be displayed on the home page without a paid api key
- Pexels API
    * The pexels api is being used to fetch images that could be used as the background for the generated quotes

- Human Factors
    - HCI and other Human Factors concepts were the backbone for this project. 
    - We made sure to make that every button and interaction with the website gave the user some kind of feedback to let them know something has happened
    - Color Pallets to increase visibility and readability
    - QuoteReader to assist those with difficulties reading
    - Error handling, to reduce user error and catch unforseen errors to prevent site crashes
    - Reduce congitive load with "copy buttons" to avoid making the user have to memorize a quote
    - Increased accessibility with font increase and color changing features


## Installation

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install` --- This will install the node modules folder and other dependencies
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
