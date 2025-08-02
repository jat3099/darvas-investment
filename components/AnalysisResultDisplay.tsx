
import React from 'react';

export interface AnalysisResult {
  summary: string;
  verdict: string;
  metricsAnalysis: { 
    metric: string; 
    analysis: string; 
    value: string 
  }[];
}

export const getVerdictClass = (verdict: string) => {
    switch (verdict.toLowerCase()) {
        case 'strong buy':
        case 'buy':
        case 'bullish':
        case 'positive trend':
            return 'text-green-400 bg-green-500/10 border-green-500/50';
        case 'hold':
        case 'neutral':
        case 'stable':
            return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/50';
        case 'sell':
        case 'strong sell':
        case 'bearish':
        case 'negative trend':
        case 'volatile':
            return 'text-red-400 bg-red-500/10 border-red-500/50';
        default:
            return 'text-gray-400 bg-gray-500/10 border-gray-500/50';
    }
}

const AnalysisResultDisplay: React.FC<{ result: AnalysisResult; breakdownTitle: string }> = ({ result, breakdownTitle }) => {
    if (!result) return null;

    return (
        <div className="space-y-4 text-left animate-fade-in">
            <div>
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-base text-white">Analysis Summary</h4>
                    <span className={`text-xs font-bold px-2.5 py-1 border rounded-full ${getVerdictClass(result.verdict)}`}>
                        {result.verdict.toUpperCase()}
                    </span>
                </div>
                <p className="text-gray-300 text-sm">{result.summary}</p>
            </div>
            <div>
                <h4 className="font-bold text-base text-white mb-2">{breakdownTitle}</h4>
                <div className="space-y-2">
                    {result.metricsAnalysis.map((metric, index) => (
                        <div key={index} className="p-3 bg-[#1D2023]/70 rounded-lg border border-gray-700/50">
                            <div className="flex justify-between items-baseline">
                                <p className="font-semibold text-white text-sm">{metric.metric}</p>
                                <p className="text-gray-300 font-mono text-xs">{metric.value}</p>
                            </div>
                            <p className="text-gray-400 text-xs mt-1">{metric.analysis}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnalysisResultDisplay;
