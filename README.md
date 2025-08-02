# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


This application is a sophisticated and visually rich website for "Darvas Investment," a fictional financial analysis company. It's built with React, TypeScript, and Tailwind CSS, featuring a sleek, dark-themed design enhanced with multiple impressive 3D animations using Three.js.

The app's core functionality is an AI-powered stock analysis tool on the "Services" page. A user can input a stock ticker, which triggers the app to fetch real-time financial data from the Alpha Vantage API. This data is then sent to the Google Gemini API to perform one of three analyses:

Fundamental Analysis: To determine a stock's intrinsic value.
Technical Analysis: To identify trading signals based on price patterns.
Time-Series Forecasting: To predict future price movements.

The AI's response is then displayed in a structured format, including a clear verdict (e.g., Buy, Sell, Hold). For forecasting, it presents an interactive, zoomable, and pannable chart that beautifully visualizes historical data alongside the AI-generated future predictions. The website is rounded out by a professional homepage and an informative "About" page that details the investment methodologies offered.


Core Framework: React with TypeScript for building a robust and type-safe user interface.
Routing: React Router is used to handle navigation between the different pages of the application (Home, Services, About).
Styling: Tailwind CSS is used for utility-first styling, enabling rapid and consistent UI development. It's included via a CDN link in the index.html.
3D Graphics & Animations: Three.js is extensively used to create immersive and dynamic visual elements, such as the interactive particle sphere on the homepage, the data stream background on the services page, and the rotating news globe on the about page.
AI & Data Analysis:
Google Gemini API (@google/genai): This is the core engine for the financial analysis features. It processes stock data to generate fundamental, technical, and time-series forecast analyses.
Alpha Vantage API: Used as the data source to fetch real-time and historical stock market data, which is then fed into the Gemini API.
Module Management: The project uses a modern, build-tool-free setup with native ES Modules and an importmap in index.html to manage dependencies directly in the browser.
