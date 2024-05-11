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

Include a link to a live demo if available, or provide screenshots/gifs demonstrating the functionality of your project.

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
