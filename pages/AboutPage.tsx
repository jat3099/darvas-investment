import React from 'react';
import { CheckedIcon, HeartIcon, CommentIcon } from '../components/Icons';
import NewsGlobe from '../components/NewsGlobe';

const teamMembers = [
  { name: 'Leslie Alexander', handle: '@lesliealexnader', text: 'Finances are very important to me. I regularly plan my expenses and save for the future.', avatar: 'https://picsum.photos/seed/avatar1/48/48' },
  { name: 'Kristin Watson', handle: '@kristinawatson', text: 'Finances are very important to me. I regularly plan my expenses and save for the future.', avatar: 'https://picsum.photos/seed/avatar2/48/48' },
  { name: 'Marvin McKinney', handle: '@marvinmckinney', text: 'Finances are a part of life that needs constant attention. I try to regularly analyze my expenses.', avatar: 'https://picsum.photos/seed/avatar3/48/48' },
  { name: 'Kathryn Murphy', handle: '@kathrynmurphy', text: 'I\'m not very knowledgeable about finances, but I try to stay on top of my expenses and take advice from experts.', avatar: 'https://picsum.photos/seed/avatar4/48/48' },
  { name: 'Brooklyn Simmons', handle: '@brooklynsimmons', text: 'Finances are a matter of responsibility and discipline for me. I try to monitor my expenses and savings.', avatar: 'https://picsum.photos/seed/avatar5/48/48' },
  { name: 'Devon Lane', handle: '@devonlane', text: 'Finances are a part of life that needs constant attention. I try to regularly analyze my expenses.', avatar: 'https://picsum.photos/seed/avatar6/48/48' },
  { name: 'Arlene McCoy', handle: '@arlenemccoy', text: 'I\'m interested in new technologies in the field of finance, like blockchain or robo-advisors.', avatar: 'https://picsum.photos/seed/avatar7/48/48' },
  { name: 'Jerome Bell', handle: '@jeromebell', text: 'I\'m convinced that investing in education and acquiring new skills is a key factor in building a stable financial future.', avatar: 'https://picsum.photos/seed/avatar8/48/48' },
];

const AboutPage: React.FC = () => {
  return (
    <div className="pt-10">
      <section className="text-center py-20 lg:py-32">
        <div className="container px-4 mx-auto">
          <span className="inline-block mb-2.5 text-sm text-green-400 font-medium tracking-tighter">About Darvas Investment</span>
          <h1 className="font-heading mb-5 text-7xl lg:text-8xl text-white tracking-tighter">Empowering Your Financial Future</h1>
          <p className="text-gray-300 md:max-w-2xl mx-auto">We are a passionate team of innovators, financial experts, and technologists dedicated to building a more accessible and secure financial world for everyone.</p>
        </div>
      </section>

      {/* Globe is moved here, between the two text sections */}
      <section className="relative -mt-16 md:-mt-24 z-10">
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px] -mx-4">
            <NewsGlobe />
        </div>
      </section>

      <section className="relative pt-12 pb-24 bg-[#0F1113] overflow-hidden">
        <div className="container px-4 mx-auto text-center">
            <span className="inline-block mb-4 text-sm text-green-400 font-medium tracking-tighter">Global Markets</span>
            <h2 className="font-heading mb-6 text-7xl lg:text-8xl text-white tracking-tighter">A Connected Financial World</h2>
            <p className="text-gray-300 md:max-w-2xl mx-auto">
            Our platform operates at the speed of the market, tracking financial signals from across the globe. The world's economies are interconnected, and so is our analysis.
            </p>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="container px-4 mx-auto">
            <div className="flex flex-wrap items-center -m-8">
                <div className="w-full md:w-1/2 p-8">
                    <div className="relative z-10 md:max-w-md">
                        <span className="inline-block mb-4 text-sm text-green-400 font-medium tracking-tighter">Our Mission</span>
                        <h2 className="font-heading mb-6 text-6xl md:text-7xl text-white tracking-tighter">To Simplify Finance For All</h2>
                        <p className="mb-8 text-white text-opacity-60">Our mission is to demystify the world of finance by providing intuitive tools, transparent products, and educational resources. We believe that everyone deserves the opportunity to build a strong financial foundation.</p>
                        <ul className="space-y-3.5">
                            <li className="flex items-start"><CheckedIcon className="mr-3.5 mt-1 flex-shrink-0" /><span className="text-white">Commitment to transparency and fairness.</span></li>
                            <li className="flex items-start"><CheckedIcon className="mr-3.5 mt-1 flex-shrink-0" /><span className="text-white">Innovation driven by customer needs.</span></li>
                            <li className="flex items-start"><CheckedIcon className="mr-3.5 mt-1 flex-shrink-0" /><span className="text-white">Unwavering focus on security and privacy.</span></li>
                        </ul>
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-8">
                    <img className="mx-auto rounded-3xl" src="https://picsum.photos/seed/about-mission/600/600" alt="Our Team"/>
                </div>
            </div>
        </div>
        <img className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30" src="https://shuffle.dev/zeus-assets/images/features/bg-blur.png" alt=""/>
      </section>

      <section className="py-24 bg-[#141518]">
        <div className="container px-4 mx-auto">
          <div className="text-center md:max-w-4xl mx-auto">
            <span className="inline-block mb-4 text-sm text-green-400 font-medium tracking-tighter">Our Methodology</span>
            <h2 className="font-heading mb-6 text-7xl lg:text-8xl text-white tracking-tighter">Forecasting Stock Movements</h2>
            <p className="mb-16 text-gray-300">
              To forecast which direction a stock might move, analysts primarily use four types of analysis. Often, the most powerful approach is a hybrid that combines elements from each.
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-12">
            
            <div className="p-8 lg:p-10 border border-gray-800 rounded-[2.5rem] bg-[#0F1113]">
              <h3 className="font-heading text-4xl text-white tracking-tight mb-2">1. Fundamental Analysis: The "Why"</h3>
              <p className="text-gray-400 mb-6">Best For: Long-term investing.</p>
              <p className="text-gray-300 mb-6">
                Fundamental analysis involves evaluating a company's financial health, the industry it operates in, and broader economic conditions to determine its intrinsic value. The goal is to figure out what a company is truly worth and buy its stock for less than that amount.
              </p>
              <h4 className="text-xl text-white font-medium mb-4">Key Tools & Metrics:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-gray-300">
                {[
                  { title: "Earnings Per Share (EPS):", text: "A company's profit divided by its number of outstanding shares. Growing EPS is a positive sign." },
                  { title: "Price-to-Earnings (P/E) Ratio:", text: "The company's stock price divided by its EPS. It helps determine if a stock is overvalued or undervalued." },
                  { title: "Price-to-Book (P/B) Ratio:", text: "Compares a company's market value to its book value. A low P/B can indicate an undervalued stock." },
                  { title: "Debt-to-Equity (D/E) Ratio:", text: "Measures a company's financial leverage. A high D/E ratio can indicate higher risk." },
                  { title: "Return on Equity (ROE):", text: "Shows how effectively a company is using shareholder investments to generate profit." },
                  { title: "Financial Statements:", text: "Analyzing the income statement, balance sheet, and cash flow statement is essential." }
                ].map(item => (
                  <li key={item.title}><strong>{item.title}</strong> {item.text}</li>
                ))}
              </ul>
            </div>
            
            <div className="p-8 lg:p-10 border border-gray-800 rounded-[2.5rem] bg-[#0F1113]">
              <h3 className="font-heading text-4xl text-white tracking-tight mb-2">2. Technical Analysis: The "When"</h3>
              <p className="text-gray-400 mb-6">Best For: Short- to medium-term trading.</p>
              <p className="text-gray-300 mb-6">
                Technical analysis focuses on statistical trends from trading activity, such as price movement and volume. Technical analysts believe that all known information is already priced into the stock, and that historical price patterns tend to repeat.
              </p>
              <h4 className="text-xl text-white font-medium mb-4">Key Tools & Indicators:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-gray-300 mb-6">
                <li>Charts: Candlestick and line charts are used to visualize price action.</li>
                <li>Moving Averages (MA): Smooth out price data to identify the direction of the trend.</li>
                <li>Relative Strength Index (RSI): A momentum oscillator that helps identify overbought or oversold conditions.</li>
                <li>Moving Average Convergence Divergence (MACD): A trend-following momentum indicator.</li>
                <li>Chart Patterns & Support/Resistance Levels.</li>
              </ul>
              <h4 className="text-xl text-white font-medium mb-4">Analyzing Historical Data (Backtesting):</h4>
               <p className="text-gray-300 mb-6">This is the process of applying a trading strategy to historical data to see how it would have performed. It's crucial for validating strategies before risking capital.</p>
               <h4 className="text-xl text-white font-medium mb-4">Tools and Data Sources:</h4>
               <p className="text-gray-300">We utilize a variety of data sources including Yahoo Finance, Alpha Vantage, Polygon.io & Financial Modeling Prep (FMP).</p>
            </div>

            <div className="p-8 lg:p-10 border border-gray-800 rounded-[2.5rem] bg-[#0F1113]">
              <h3 className="font-heading text-4xl text-white tracking-tight mb-2">3. Quantitative Analysis: The "How Much"</h3>
              <p className="text-gray-400 mb-6">Best For: Sophisticated traders, hedge funds, and automated systems.</p>
              <p className="text-gray-300 mb-6">
                This advanced approach uses mathematical models and computational power to analyze vast amounts of data, often to build automated trading algorithms.
              </p>
              <h4 className="text-xl text-white font-medium mb-4">Key Tools & Methods:</h4>
              <ul className="list-disc list-inside text-gray-300">
                <li>Algorithmic trading</li>
                <li>Statistical arbitrage</li>
                <li>Machine learning models</li>
              </ul>
            </div>
            
            <div className="p-8 lg:p-10 border border-gray-800 rounded-[2.5rem] bg-[#0F1113]">
              <h3 className="font-heading text-4xl text-white tracking-tight mb-2">4. Time-Series Forecasting: The "What's Next"</h3>
              <p className="text-gray-400 mb-6">Best For: Generating a visual, data-driven projection of future price movements.</p>
              <p className="text-gray-300 mb-6">
                This method uses statistical models to predict future prices based on past price data. It's a direct way to visualize potential future trends.
              </p>
              <h4 className="text-xl text-white font-medium mb-4">How It Works:</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-300 mb-6">
                <li><strong>Gather Data:</strong> Collect a long history of stock prices.</li>
                <li><strong>Apply a Statistical Model:</strong> The most common is ARIMA (AutoRegressive Integrated Moving Average).</li>
                <li><strong>Generate the Forecast:</strong> The model outputs predicted future prices.</li>
                <li><strong>Visualize on a Chart:</strong> The forecast is displayed with historical data and a confidence interval.</li>
              </ol>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div>
                    <h4 className="text-xl text-white font-medium mb-4">Pros:</h4>
                    <ul className="list-disc list-inside text-gray-300">
                        <li>Provides a clear, visual projection of potential future prices.</li>
                        <li>Based on established statistical methods.</li>
                    </ul>
                 </div>
                 <div>
                    <h4 className="text-xl text-white font-medium mb-4">Cons:</h4>
                    <ul className="list-disc list-inside text-gray-300">
                        <li>The forecast is a statistical probability, not a guarantee.</li>
                        <li>Highly susceptible to unforeseen market events that break historical patterns.</li>
                    </ul>
                 </div>
               </div>
            </div>

            <div className="p-8 lg:p-10 bg-[radial-gradient(ellipse_at_center,rgba(38,42,48,1),rgba(15,17,19,1))] border border-green-500/30 rounded-[2.5rem]">
                <h3 className="font-heading text-4xl text-white tracking-tight mb-4">Conclusion: The Hybrid Approach</h3>
                <p className="text-gray-300 mb-6">
                For a comprehensive analysis, a hybrid approach is most effective:
                </p>
                <ul className="space-y-3.5">
                    <li className="flex items-start"><CheckedIcon className="mr-3.5 mt-1 flex-shrink-0" /><span className="text-white">Use <strong>Fundamental Analysis</strong> to identify what to buy.</span></li>
                    <li className="flex items-start"><CheckedIcon className="mr-3.5 mt-1 flex-shrink-0" /><span className="text-white">Use <strong>Technical Analysis</strong> to determine when to buy or sell.</span></li>
                    <li className="flex items-start"><CheckedIcon className="mr-3.5 mt-1 flex-shrink-0" /><span className="text-white">Use <strong>Time-Series Forecasting</strong> to visualize potential future scenarios based on past performance.</span></li>
                </ul>
                <p className="mt-8 text-green-400">
                For our web app, providing tools for fundamental metrics, technical charting, and a forecasting visual creates a powerful and well-rounded platform.
                </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden bg-[#0F1113]">
        <div className="container px-4 mx-auto">
          <div className="text-center">
              <span className="inline-block mb-4 text-sm text-green-400 font-medium tracking-tighter">Testimonials</span>
              <h2 className="font-heading mb-6 text-7xl lg:text-8xl text-white tracking-tighter md:max-w-md mx-auto">From Our Community</h2>
              <p className="mb-20 text-gray-300 md:max-w-md mx-auto">Hear what our users have to say about their experience with Darvas Investment.</p>
          </div>
          <div className="flex flex-wrap -m-3">
              {teamMembers.map((testimonial, index) => (
                  <div key={index} className="w-full md:w-1/2 lg:w-1/4 p-3">
                      <div className="p-6 h-full border border-gray-800 rounded-[2.5rem] flex flex-col bg-[#141518]">
                          <div className="flex flex-wrap items-center -m-3 mb-3">
                              <div className="w-auto p-3"><img className="rounded-full" src={testimonial.avatar} alt={testimonial.name}/></div>
                              <div className="w-auto p-3">
                                  <h2 className="text-lg text-white">{testimonial.name}</h2>
                                  <p className="text-sm text-gray-400">{testimonial.handle}</p>
                              </div>
                          </div>
                          <p className="mb-4 text-white text-sm flex-grow">{testimonial.text}</p>
                          <div className="flex flex-wrap items-center -m-2.5 mt-auto">
                              <div className="flex items-center w-auto p-2.5"><HeartIcon /><p className="text-sm text-gray-400">232</p></div>
                              <div className="flex items-center w-auto p-2.5"><CommentIcon /><p className="text-sm text-gray-400">81</p></div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;