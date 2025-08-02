
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { getVerdictClass } from './AnalysisResultDisplay';

export interface ForecastPoint { date: string; price: number; }
export interface ForecastResult {
    summary: string;
    verdict: string;
    forecast: ForecastPoint[];
}

export interface ForecastChartProps extends ForecastResult {
    historical: ForecastPoint[];
    width?: number;
    height?: number;
}

const MIN_ZOOM_LEVEL_POINTS = 10; // e.g., cannot zoom in to show fewer than 10 data points

const ForecastChart: React.FC<ForecastChartProps> = ({ historical, forecast, summary, verdict, width = 300, height = 180 }) => {
    const allPoints = useMemo(() => [...historical, ...forecast], [historical, forecast]);
    if (allPoints.length === 0) return null;

    const chartAreaRef = useRef<HTMLDivElement>(null);
    const [viewDomain, setViewDomain] = useState({ start: 0, end: allPoints.length - 1 });
    const [isPanning, setIsPanning] = useState(false);
    const panStartRef = useRef({ x: 0 });

    useEffect(() => {
        setViewDomain({ start: 0, end: allPoints.length - 1 });
    }, [allPoints]);

    const handleReset = () => {
        setViewDomain({ start: 0, end: allPoints.length - 1 });
    };

    const margin = { top: 20, right: 10, bottom: 30, left: 35 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const { visiblePoints, yMin, yMax, historicalPath, forecastPath, combinedForecastPath, yTicks } = useMemo(() => {
        const startIdx = Math.floor(viewDomain.start);
        const endIdx = Math.ceil(viewDomain.end);
        const visible = allPoints.slice(startIdx, endIdx + 1);
        
        if(visible.length === 0) {
            return { visiblePoints: [], yMin: 0, yMax: 0, historicalPath: '', forecastPath: '', combinedForecastPath: '', yTicks: [] };
        }

        const prices = visible.map(p => p.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const yDomainBuffer = (maxPrice - minPrice) * 0.1 || 1;
        const finalYMin = minPrice - yDomainBuffer;
        const finalYMax = maxPrice + yDomainBuffer;

        const viewWidth = viewDomain.end - viewDomain.start;
        const xScale = (index: number) => ((index - viewDomain.start) / viewWidth) * innerWidth;
        const yScale = (price: number) => innerHeight - ((price - finalYMin) / (finalYMax - finalYMin)) * innerHeight;

        const generatePath = (points: ForecastPoint[], startIndex: number) =>
            points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(startIndex + i)} ${yScale(p.price)}`).join(' ');

        const historicalStart = Math.max(0, startIdx);
        const historicalEnd = Math.min(historical.length, endIdx + 1);
        const visibleHistorical = allPoints.slice(historicalStart, historicalEnd);
        const hPath = visibleHistorical.length > 1 ? generatePath(visibleHistorical, historicalStart) : '';

        const forecastStart = Math.max(historical.length, startIdx);
        const forecastEnd = Math.min(allPoints.length, endIdx + 1);
        const visibleForecast = allPoints.slice(forecastStart, forecastEnd);
        const fPath = visibleForecast.length > 1 ? generatePath(visibleForecast, forecastStart) : '';

        let cFPath = '';
        if (visibleForecast.length > 0 && historicalEnd >= historical.length) {
            const lastHistoricalPoint = historical[historical.length - 1];
            cFPath = `M ${xScale(historical.length - 1)} ${yScale(lastHistoricalPoint.price)} ${fPath.substring(1)}`;
        } else {
            cFPath = fPath;
        }

        const tickCount = 5;
        const ticks = Array.from({ length: tickCount }, (_, i) => {
            const price = finalYMin + (i / (tickCount - 1)) * (finalYMax - finalYMin);
            return { price, y: yScale(price) };
        });

        return { visiblePoints: visible, yMin: finalYMin, yMax: finalYMax, historicalPath: hPath, forecastPath: fPath, combinedForecastPath: cFPath, yTicks: ticks };
    }, [allPoints, viewDomain, width, height, historical.length, innerWidth, innerHeight]);

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const chartRect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - chartRect.left - margin.left;
        
        const currentViewWidth = viewDomain.end - viewDomain.start;
        const hoverIndex = viewDomain.start + (mouseX / innerWidth) * currentViewWidth;

        const zoomFactor = e.deltaY < 0 ? 1 / 1.1 : 1.1;
        let newViewWidth = currentViewWidth * zoomFactor;

        if (newViewWidth < MIN_ZOOM_LEVEL_POINTS) newViewWidth = MIN_ZOOM_LEVEL_POINTS;
        if (newViewWidth > allPoints.length - 1) newViewWidth = allPoints.length - 1;

        const mouseRatio = mouseX / innerWidth;
        let newStart = hoverIndex - mouseRatio * newViewWidth;
        let newEnd = newStart + newViewWidth;

        if (newStart < 0) {
            newStart = 0;
            newEnd = newViewWidth;
        }
        if (newEnd > allPoints.length - 1) {
            newEnd = allPoints.length - 1;
            newStart = newEnd - newViewWidth;
        }
        
        setViewDomain({ start: newStart, end: newEnd });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsPanning(true);
        panStartRef.current = { x: e.clientX };
    };
    
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isPanning || !chartAreaRef.current) return;
        e.preventDefault();
        
        const dx = e.clientX - panStartRef.current.x;
        panStartRef.current = { x: e.clientX };

        const chartWidth = chartAreaRef.current.getBoundingClientRect().width - margin.left - margin.right;
        const dIndex = (dx / chartWidth) * (viewDomain.end - viewDomain.start);
        
        let newStart = viewDomain.start - dIndex;
        let newEnd = viewDomain.end - dIndex;

        if (newStart < 0) {
            newStart = 0;
            newEnd = viewDomain.end - viewDomain.start;
        }
        if (newEnd > allPoints.length - 1) {
            newEnd = allPoints.length - 1;
            newStart = newEnd - (viewDomain.end - viewDomain.start);
        }

        setViewDomain({ start: newStart, end: newEnd });
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (isPanning) {
            e.preventDefault();
            setIsPanning(false);
        }
    };
    
    return (
        <div className="space-y-4 text-left animate-fade-in">
            <div>
                 <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-base text-white">Forecast Summary</h4>
                    <span className={`text-xs font-bold px-2.5 py-1 border rounded-full ${getVerdictClass(verdict)}`}>
                        {verdict.toUpperCase()}
                    </span>
                </div>
                <p className="text-gray-300 text-sm">{summary}</p>
            </div>
            <div 
                ref={chartAreaRef} 
                className="relative p-3 bg-[#1D2023]/70 rounded-lg border border-gray-700/50"
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseUp}
            >
                <button
                    onClick={handleReset}
                    className="absolute top-0 right-0 mt-4 mr-4 z-10 px-3 py-1 text-xs font-medium bg-gray-600/50 hover:bg-gray-500/50 text-white rounded-full transition-colors"
                >
                    Reset
                </button>
                 <svg 
                    viewBox={`0 0 ${width} ${height}`} 
                    width="100%" 
                    height="auto" 
                    aria-labelledby="chart-title" 
                    role="img"
                    onWheel={handleWheel}
                    onMouseDown={handleMouseDown}
                    style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
                >
                    <title id="chart-title">{historical.length}-Day History with {forecast.length}-Day Forecast</title>
                    <defs>
                        <clipPath id="chart-clip">
                            <rect x="0" y="0" width={innerWidth} height={innerHeight} />
                        </clipPath>
                    </defs>
                    <g transform={`translate(${margin.left}, ${margin.top})`}>
                        {/* Grid lines */}
                        {yTicks.map(tick => (
                             <line key={tick.price} x1={0} x2={innerWidth} y1={tick.y} y2={tick.y} stroke="#374151" strokeWidth="0.5" />
                        ))}
                        
                        {/* Y-Axis */}
                        {yTicks.map(tick => (
                            <text key={tick.price} x={-5} y={tick.y} textAnchor="end" alignmentBaseline="middle" fill="#9CA3AF" fontSize="10">
                                {tick.price.toFixed(0)}
                            </text>
                        ))}

                        <g clipPath="url(#chart-clip)">
                            {/* Data Lines */}
                            <path d={historicalPath} fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
                            <path d={combinedForecastPath} fill="none" stroke="#84E46E" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
                        </g>
                        
                        {/* Separation line - visible only if boundary is in view */}
                        {viewDomain.start <= historical.length -1 && viewDomain.end >= historical.length -1 && (
                            <line 
                                x1={((historical.length - 1 - viewDomain.start) / (viewDomain.end - viewDomain.start)) * innerWidth} 
                                x2={((historical.length - 1 - viewDomain.start) / (viewDomain.end - viewDomain.start)) * innerWidth}
                                y1={0} 
                                y2={innerHeight} 
                                stroke="#4B5563" 
                                strokeWidth="1" 
                                strokeDasharray="2 3" 
                            />
                        )}
                    </g>
                </svg>
                 <div className="flex justify-center items-center space-x-6 mt-3 text-xs text-gray-400">
                    <div className="flex items-center"><div className="w-3 h-0.5 bg-[#60A5FA] mr-2"></div><span>Historical</span></div>
                    <div className="flex items-center"><div className="w-3 h-0.5 bg-[#84E46E] mr-2"></div><span>Forecast</span></div>
                </div>
            </div>
        </div>
    );
};

export default ForecastChart;