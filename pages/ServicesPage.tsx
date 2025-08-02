

import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import AnalysisResultDisplay, { type AnalysisResult, getVerdictClass } from '../components/AnalysisResultDisplay';
import ForecastChartModal from '../components/ForecastChartModal';
import { type ForecastResult, type ForecastPoint, type ForecastChartProps } from '../components/ForecastChart';
import DataStreamCanvas from '../components/DataStreamCanvas';

const servicePackages = [
  {
    name: "Fundamental Analysis",
    description: "Use Fundamental Analysis to identify what to buy.",
    features: ["Company financials", "Earnings reports", "Market trends", "Valuation metrics"],
  },
  {
    name: "Technical Analysis",
    description: "Use Technical Analysis to determine when to buy or sell.",
    features: ["Price chart patterns", "Moving averages", "RSI and MACD indicators", "Volume analysis"],
  },
  {
    name: "Time-Series Forecasting",
    description: "Use Time-Series Forecasting to visualize potential future scenarios based on past performance.",
    features: ["Predictive modeling", "Historical data projection", "Volatility analysis", "Scenario simulation"],
  }
];

const serviceFeatures = [
  { id: 'reporting', label: 'Advanced Reporting', image: 'https://picsum.photos/seed/service_feat1/800/400', title: 'In-Depth Financial Insights', description: 'Gain a deeper understanding of your spending habits with our comprehensive reporting tools. Track expenses, categorize spending, and generate detailed reports to make informed financial decisions.' },
  { id: 'security', label: 'Enhanced Security', image: 'https://picsum.photos/seed/service_feat2/800/400', title: 'Your Security is Our Priority', description: 'We employ multi-layered security protocols, including real-time fraud monitoring, two-factor authentication, and end-to-end encryption to protect your account and data.' },
  { id: 'integration', label: 'Seamless Integrations', image: 'https://picsum.photos/seed/service_feat3/800/400', title: 'Connect Your Financial World', description: 'Integrate your Darvas Investment account with popular accounting software, payment gateways, and other financial tools to streamline your workflow and manage everything from one place.' },
];


interface ServiceState {
  isLoading: boolean;
  error: string | null;
  result: AnalysisResult | ForecastResult | null;
  ticker: string;
  historicalData?: ForecastPoint[];
}

const initialServiceState: ServiceState = { isLoading: false, error: null, result: null, ticker: '', historicalData: undefined };
const ALPHA_VANTAGE_API_KEY = '5KEIJBED6YVYA0S7';
const GEMINI_API_KEY = 'AIzaSyCabfxgKGxH8tqEEhY5i1VXWmx9SsbBnNM';
const LOOKBACK_DAYS = 1825;

// --- Data Fetching Functions ---

const fetchFundamentalData = async (ticker: string) => {
    const overviewUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`;
    const balanceSheetUrl = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`;

    const [overviewResponse, balanceSheetResponse] = await Promise.all([
        fetch(overviewUrl),
        fetch(balanceSheetUrl)
    ]);

    if (!overviewResponse.ok || !balanceSheetResponse.ok) {
        throw new Error('Failed to fetch data from Alpha Vantage.');
    }

    const overviewData = await overviewResponse.json();
    const balanceSheetData = await balanceSheetResponse.json();

    // Check for errors/rate limits in both responses
    if (overviewData['Error Message'] || balanceSheetData['Error Message']) {
        throw new Error(overviewData['Error Message'] || balanceSheetData['Error Message']);
    }
    if (overviewData.Note || balanceSheetData.Note) {
        throw new Error(overviewData.Note || balanceSheetData.Note);
    }

    if (Object.keys(overviewData).length === 0 || !overviewData.Symbol) {
        throw new Error(`Could not find fundamental data for ticker "${ticker}". Please check the symbol and try again.`);
    }

    let calculatedDeRatio = null;
    if (balanceSheetData?.annualReports?.[0]) {
        const latestReport = balanceSheetData.annualReports[0];
        const totalLiabilities = parseFloat(latestReport.totalLiabilities);
        const totalShareholderEquity = parseFloat(latestReport.totalShareholderEquity);
        if (totalShareholderEquity !== 0 && !isNaN(totalLiabilities) && !isNaN(totalShareholderEquity)) {
            calculatedDeRatio = (totalLiabilities / totalShareholderEquity).toFixed(2);
        }
    }

    return {
        ticker: overviewData.Symbol,
        eps: overviewData.EPS,
        peRatio: overviewData.PERatio,
        pbRatio: overviewData.PriceToBookRatio,
        deRatio: calculatedDeRatio || overviewData.DebtToEquityRatio || null,
        roe: overviewData.ReturnOnEquityTTM,
    };
};

const fetchHistoricalData = async (ticker: string): Promise<ForecastPoint[]> => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=full&apikey=${ALPHA_VANTAGE_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch historical data from Alpha Vantage.');
    const data = await response.json();
    if (data['Error Message']) throw new Error(data['Error Message']);
    if (data.Note) throw new Error(data.Note);
    const timeSeries = data['Time Series (Daily)'];
    if (!timeSeries) {
        throw new Error(`Could not fetch historical data for ticker "${ticker}". The symbol may be invalid or the API returned an unexpected format.`);
    }
    const historicalPoints = Object.entries(timeSeries).map(([date, values]: [string, any]) => ({
        date,
        price: parseFloat(values['4. close']),
    })).reverse();
    return historicalPoints.slice(-LOOKBACK_DAYS);
};


// --- Gemini Analysis Schemas ---
const fundamentalAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        summary: { type: Type.STRING, description: 'A concise summary of the fundamental analysis.' },
        verdict: { type: Type.STRING, enum: ['Strong Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell'], description: 'The final investment verdict.' },
        metricsAnalysis: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    metric: { type: Type.STRING },
                    value: { type: Type.STRING },
                    analysis: { type: Type.STRING, description: 'A brief analysis of what this metric indicates.' },
                },
                 required: ['metric', 'value', 'analysis']
            }
        }
    },
    required: ['summary', 'verdict', 'metricsAnalysis']
};

const technicalAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        summary: { type: Type.STRING, description: 'A concise summary of the technical analysis.' },
        verdict: { type: Type.STRING, enum: ['Bullish', 'Bearish', 'Neutral'], description: 'The final trading verdict based on technicals.' },
        metricsAnalysis: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    metric: { type: Type.STRING, description: 'The name of the technical indicator (e.g., RSI, MACD, Trend).' },
                    value: { type: Type.STRING, description: 'The calculated value or state of the indicator.' },
                    analysis: { type: Type.STRING, description: 'A brief analysis of what this indicator suggests.' },
                },
                required: ['metric', 'value', 'analysis']
            }
        }
    },
    required: ['summary', 'verdict', 'metricsAnalysis']
};

const forecastSchema = {
    type: Type.OBJECT,
    properties: {
        summary: { type: Type.STRING, description: 'A concise summary of the forecast projection.' },
        verdict: { type: Type.STRING, enum: ['Positive Trend', 'Negative Trend', 'Stable', 'Volatile'], description: 'The overall trend verdict for the forecast period.' },
        forecast: {
            type: Type.ARRAY,
            description: 'An array of 60 data points for the forecast.',
            items: {
                type: Type.OBJECT,
                properties: {
                    date: { type: Type.STRING, description: 'The forecasted date in YYYY-MM-DD format.' },
                    price: { type: Type.NUMBER, description: 'The forecasted closing price.' },
                },
                required: ['date', 'price']
            }
        }
    },
    required: ['summary', 'verdict', 'forecast']
};


const ServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('reporting');
  const [serviceStates, setServiceStates] = useState<Record<string, ServiceState>>({
    "Fundamental Analysis": { ...initialServiceState },
    "Technical Analysis": { ...initialServiceState },
    "Time-Series Forecasting": { ...initialServiceState },
  });
  const [chartModalData, setChartModalData] = useState<ForecastChartProps | null>(null);

  const handleAnalysis = async (event: React.FormEvent<HTMLFormElement>, serviceName: string) => {
    event.preventDefault();
    
    const ticker = serviceStates[serviceName].ticker;
    if (!ticker || ticker.trim() === '') {
        setServiceStates(prev => ({ ...prev, [serviceName]: { ...prev[serviceName], error: 'Please enter a ticker symbol.', result: null }}));
        return;
    }

    setServiceStates(prev => ({ ...prev, [serviceName]: { ...prev[serviceName], isLoading: true, error: null, result: null } }));
    
    try {
        const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
        let result: AnalysisResult | ForecastResult | null = null;
        let prompt: string;
        let schema: any;
        let fundamentalData: Awaited<ReturnType<typeof fetchFundamentalData>> | null = null;
        
        if (serviceName === 'Fundamental Analysis') {
            fundamentalData = await fetchFundamentalData(ticker);
            prompt = `Perform a fundamental analysis for a company with the following metrics: ${JSON.stringify(fundamentalData)}. Provide a concise summary, a clear verdict (Strong Buy, Buy, Hold, Sell, Strong Sell), and an analysis for each metric.`;
            schema = fundamentalAnalysisSchema;
        } else if (serviceName === 'Technical Analysis') {
            const data = await fetchHistoricalData(ticker);
            prompt = `Perform a technical analysis on the provided daily closing prices for the last year: ${JSON.stringify(data.slice(-365).map(d => d.price))}. Provide a concise summary, a verdict (Bullish, Bearish, Neutral), and analysis for key indicators like RSI, MACD, and SMA trends.`;
            schema = technicalAnalysisSchema;
        } else if (serviceName === 'Time-Series Forecasting') {
            const data = await fetchHistoricalData(ticker);
            setServiceStates(prev => ({ ...prev, [serviceName]: { ...prev[serviceName], historicalData: data } }));
            prompt = `Based on the provided historical daily closing prices over the last 5 years, generate a 60-day price forecast. Provide a summary, a verdict (Positive Trend, Negative Trend, Stable, Volatile), and an array of 60 forecast points with date and price. Data: ${JSON.stringify(data.map(d => d.price))}`;
            schema = forecastSchema;
        } else {
            throw new Error("Invalid service name");
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              responseSchema: schema,
            },
        });

        result = JSON.parse(response.text);

        if (serviceName === 'Fundamental Analysis' && fundamentalData) {
             // Inject the real values back into the result from Gemini, which only provides analysis.
             // Also handles cases where a metric might be missing from the API response.
            (result as AnalysisResult).metricsAnalysis = [
                { metric: "P/E Ratio", value: fundamentalData.peRatio || 'N/A', analysis: (result as AnalysisResult).metricsAnalysis.find(m => m.metric.includes("P/E"))?.analysis || "" },
                { metric: "Return on Equity (ROE)", value: fundamentalData.roe ? `${(parseFloat(fundamentalData.roe) * 100).toFixed(2)}%` : 'N/A', analysis: (result as AnalysisResult).metricsAnalysis.find(m => m.metric.includes("ROE"))?.analysis || "" },
                { metric: "Debt to Equity (D/E)", value: fundamentalData.deRatio || 'N/A', analysis: (result as AnalysisResult).metricsAnalysis.find(m => m.metric.includes("Debt"))?.analysis || "" },
            ];
        }

        setServiceStates(prev => ({ ...prev, [serviceName]: { ...prev[serviceName], isLoading: false, result: result } }));

    } catch (error) {
        console.error("Error during analysis:", error);
        let errorMessage = 'An unknown error occurred during AI analysis.';
        if (error instanceof Error) {
            if (error.message.includes("our standard api call frequency is") || error.message.includes("Note")) {
                 errorMessage = "Market data provider API limit reached. This is a free demo key. Please wait a minute and try again.";
            } else if (error.message.includes('API key not valid')) {
                errorMessage = "The built-in API key is invalid or has expired. Please contact support.";
            }
             else {
                errorMessage = error.message;
            }
        }
        setServiceStates(prev => ({ ...prev, [serviceName]: { ...prev[serviceName], isLoading: false, error: errorMessage } }));
    }
  };


  return (
    <>
      <div className="pt-10">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <DataStreamCanvas />
          </div>

          <section className="relative text-center py-20 lg:py-32">
            <div className="relative z-10 container px-4 mx-auto">
              <span className="inline-block mb-2.5 text-sm text-green-400 font-medium tracking-tighter">Our Services</span>
              <h1 className="font-heading mb-5 text-7xl lg:text-8xl text-white tracking-tighter">Solutions For Your Needs</h1>
              <p className="text-gray-300 md:max-w-xl mx-auto">We offer a range of services designed to help you manage your finances, build credit, and achieve your financial goals with security and ease.</p>
            </div>
          </section>

          <section className="relative pb-24 bg-transparent">
            <div className="container px-4 mx-auto">
              <h2 className="font-heading text-center mb-20 text-6xl lg:text-7xl text-white tracking-tighter">Service Packages</h2>
              <div className="flex flex-wrap -m-4">
                {servicePackages.map((pkg) => {
                  const state = serviceStates[pkg.name];
                  const breakdownTitle = pkg.name === 'Fundamental Analysis' ? 'Metrics Breakdown' : 'Indicators Breakdown';
                  return (
                    <div key={pkg.name} className="w-full md:w-1/2 lg:w-1/3 p-4">
                      <div className="h-full p-8 bg-[#0F1113]/80 backdrop-blur-md border border-gray-800 rounded-[2.5rem] flex flex-col justify-between">
                        <div>
                          <h3 className="font-heading text-4xl text-white tracking-tight mb-4">{pkg.name}</h3>
                          <p className="text-gray-400 mb-6 min-h-[3rem]">{pkg.description}</p>
                          <ul className="space-y-3 mb-8">
                            {pkg.features.map(feature => (
                              <li key={feature} className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                <span className="text-white">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-auto">
                          <form onSubmit={(e) => handleAnalysis(e, pkg.name)}>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    name="ticker"
                                    placeholder="e.g. AAPL"
                                    value={state.ticker}
                                    onChange={(e) => {
                                      const ticker = e.target.value.toUpperCase();
                                      setServiceStates(prev => ({
                                          ...prev,
                                          [pkg.name]: { ...prev[pkg.name], ticker, error: null, result: null }
                                      }));
                                    }}
                                    aria-label={`Ticker for ${pkg.name}`}
                                    disabled={state.isLoading}
                                    className="flex-grow w-full px-4 py-3 bg-[#1D2023] text-white border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    aria-label={`Analyze ${pkg.name}`}
                                    disabled={state.isLoading || !state.ticker}
                                    className="flex-shrink-0 font-medium h-[46px] w-[90px] flex items-center justify-center tracking-tighter bg-green-400 hover:bg-green-500 text-black focus:ring-4 focus:ring-green-500 focus:ring-opacity-40 rounded-full transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {state.isLoading ? <div className="w-5 h-5 border-2 border-t-transparent border-black rounded-full animate-spin"></div> : 'Analyze'}
                                </button>
                            </div>
                          </form>
                          <div className="mt-6 min-h-[1px]">
                            {state.error && (
                                <div className="p-3 bg-red-900/50 border border-red-500/50 text-red-300 rounded-lg text-sm animate-fade-in">
                                    <p><strong>Error:</strong> {state.error}</p>
                                </div>
                            )}
                            
                            {state.result && 'forecast' in state.result && state.historicalData ? (
                                <div className="space-y-4 text-left animate-fade-in">
                                  <div>
                                      <div className="flex justify-between items-center mb-2">
                                          <h4 className="font-bold text-base text-white">Analysis Complete</h4>
                                          <span className={`text-xs font-bold px-2.5 py-1 border rounded-full ${getVerdictClass((state.result as ForecastResult).verdict)}`}>
                                              {(state.result as ForecastResult).verdict.toUpperCase()}
                                          </span>
                                      </div>
                                      <p className="text-gray-300 text-sm">{(state.result as ForecastResult).summary}</p>

                                  </div>
                                  <button 
                                      onClick={() => setChartModalData({ 
                                          historical: state.historicalData!, 
                                          forecast: (state.result as ForecastResult).forecast,
                                          summary: (state.result as ForecastResult).summary,
                                          verdict: (state.result as ForecastResult).verdict,
                                      })}
                                      className="w-full mt-2 px-4 py-2 font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  >
                                      View Full Chart
                                  </button>
                                </div>
                            ) : state.result && 'metricsAnalysis' in state.result ? (
                                <AnalysisResultDisplay result={state.result as AnalysisResult} breakdownTitle={breakdownTitle} />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
        
        <section className="relative py-24 overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="mb-12 md:max-w-4xl text-center mx-auto">
              <h2 className="font-heading text-7xl lg:text-8xl text-white tracking-tighter">Feature Deep Dive</h2>
            </div>
            <ul className="mb-20 flex flex-wrap justify-center gap-2 sm:gap-4">
              {serviceFeatures.map(tab => (
                <li key={tab.id}>
                  <button className={`inline-block px-5 py-3 font-medium tracking-tighter border rounded-full transition duration-200 ${activeTab === tab.id ? 'text-green-400 border-green-400' : 'text-gray-300 border-transparent hover:border-gray-700'}`} onClick={() => setActiveTab(tab.id)}>
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="relative">
              {serviceFeatures.map(feature => (
                <div key={feature.id} className={`transition-opacity duration-700 ${activeTab === feature.id ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                  <div className="relative p-8 sm:p-12 bg-[radial-gradient(ellipse_at_center,rgba(38,42,48,1),rgba(15,17,19,1))] overflow-hidden border border-gray-900 border-opacity-30 rounded-[2.5rem]">
                    <div className="flex flex-wrap items-center -m-8">
                      <div className="w-full md:w-1/2 p-8">
                          <img className="rounded-2xl" src={feature.image} alt={feature.title} />
                      </div>
                      <div className="w-full md:w-1/2 p-8">
                        <div className="max-w-md">
                          <h3 className="font-heading mb-6 text-5xl text-white tracking-tighter">{feature.title}</h3>
                          <p className="text-white text-opacity-70">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      {chartModalData && (
          <ForecastChartModal 
              data={chartModalData} 
              onClose={() => setChartModalData(null)} 
          />
      )}
    </>
  );
};

export default ServicesPage;