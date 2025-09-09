import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { AnalysisResult, RedFlag, Severity, HistoryItem, RiskCategory } from '../types';
import { analyzeStartupIdeaWithCache } from '../services/analyzeWithCache';
import AdPlaceholder from './AdPlaceholder';
import SparklesIcon from './icons/SparklesIcon';
import WarningIcon from './icons/WarningIcon';
import CopyIcon from './icons/CopyIcon';
import StarIcon from './icons/StarIcon';
import TrashIcon from './icons/TrashIcon';
import ShareIcon from './icons/ShareIcon';
import CompareIcon from './icons/CompareIcon';
import LightbulbIcon from './icons/LightbulbIcon';
import BroomIcon from './icons/BroomIcon';


const severityStyles: Record<Severity, { bg: string; text: string; border: string }> = {
    High: { bg: 'bg-red-900/50', text: 'text-red-300', border: 'border-red-500/50' },
    Medium: { bg: 'bg-yellow-900/50', text: 'text-yellow-300', border: 'border-yellow-500/50' },
    Low: { bg: 'bg-green-900/50', text: 'text-green-300', border: 'border-green-500/50' },
};

const categoryStyles: Record<RiskCategory, { text: string }> = {
    Market: { text: 'text-cyan-400' },
    Financial: { text: 'text-emerald-400' },
    Technical: { text: 'text-amber-400' },
    Execution: { text: 'text-rose-400' },
};

export const ScoreCircle: React.FC<{ score: number, size?: 'large' | 'small' }> = ({ score, size = 'large' }) => {
    const isLarge = size === 'large';
    const r = isLarge ? 70 : 22;
    const stroke = isLarge ? 12 : 5;
    const width = isLarge ? 160 : 56;
    const height = isLarge ? 160 : 56;
    const textSize = isLarge ? 'text-5xl' : 'text-xl';
    
    const circumference = 2 * Math.PI * r;
    const offset = circumference - (score / 100) * circumference;
    const strokeColor = score > 75 ? 'stroke-green-400' : score > 50 ? 'stroke-yellow-400' : 'stroke-red-400';

    return (
        <div className={`relative flex items-center justify-center`} style={{width, height}}>
            <svg className="absolute w-full h-full transform -rotate-90">
                <circle cx={width/2} cy={height/2} r={r} stroke="currentColor" strokeWidth={stroke} fill="transparent" className="text-slate-700" />
                <circle cx={width/2} cy={height/2} r={r} stroke="currentColor" strokeWidth={stroke} fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className={`transition-all duration-1000 ease-in-out ${strokeColor}`}
                />
            </svg>
            <span className={`${textSize} font-bold text-white`}>{score}</span>
        </div>
    );
};

export const RedFlagCard: React.FC<{ flag: RedFlag, index: number }> = ({ flag, index }) => {
    const styles = severityStyles[flag.severity];
    const catStyles = categoryStyles[flag.category];
    return (
        <div style={{ animationDelay: `${index * 100}ms` }} className={`animate-fade-in-up opacity-0 flex flex-col p-4 rounded-lg border ${styles.bg} ${styles.border}`}>
            <div className="flex items-start space-x-4">
                 <div className={`flex-shrink-0 p-2 rounded-full ${styles.bg}`}>
                    <WarningIcon className={`${styles.text} w-5 h-5`} />
                </div>
                <div>
                    <div className="flex items-center flex-wrap gap-x-2">
                        <h3 className="font-semibold text-lg text-slate-100">{flag.title}</h3>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${styles.bg} ${styles.text}`}>{flag.severity}</span>
                        <span className={`text-xs font-medium ${catStyles.text}`}>{flag.category}</span>
                    </div>
                    <p className="mt-1 text-slate-400">{flag.description}</p>
                </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-start space-x-4">
                 <div className="flex-shrink-0 p-2 rounded-full bg-indigo-900/50">
                    <LightbulbIcon className="text-indigo-300 w-5 h-5" />
                </div>
                <div>
                     <h4 className="font-semibold text-md text-indigo-300">Suggestion</h4>
                     <p className="mt-1 text-slate-400">{flag.suggestion}</p>
                </div>
            </div>
        </div>
    );
};

const RiskMatrix: React.FC<{ flags: RedFlag[] }> = ({ flags }) => {
    const categories: RiskCategory[] = ["Market", "Financial", "Technical", "Execution"];
    const severities: Severity[] = ["High", "Medium", "Low"];

    const getCellIntensity = (cat: RiskCategory, sev: Severity) => {
        const count = flags.filter(f => f.category === cat && f.severity === sev).length;
        if (count === 0) return 'bg-slate-800/20';
        if (count === 1) return severityStyles[sev].bg.replace('50', '60');
        if (count === 2) return severityStyles[sev].bg.replace('50', '80');
        return severityStyles[sev].bg;
    };

    return (
        <div className="grid grid-cols-4 gap-2 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
            <div />
            {severities.map(s => <div key={s} className="text-center font-bold text-slate-300 text-sm">{s}</div>)}
            {categories.map(cat => (
                <React.Fragment key={cat}>
                    <div className={`font-bold text-sm h-full flex items-center justify-end pr-2 ${categoryStyles[cat].text}`}>{cat}</div>
                    {severities.map(sev => {
                        const count = flags.filter(f => f.category === cat && f.severity === sev).length;
                        return (
                            <div key={`${cat}-${sev}`} className={`h-20 rounded-md flex items-center justify-center text-2xl font-bold transition-colors duration-300 ${getCellIntensity(cat, sev)}`}>
                                {count > 0 && <span className={severityStyles[sev].text}>{count}</span>}
                            </div>
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
    );
};

const ScoreTrendChart: React.FC<{history: HistoryItem[]}> = ({history}) => {
    const reversedHistory = useMemo(() => [...history].reverse(), [history]);
    const chartRef = useRef<SVGSVGElement>(null);
    const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; item: HistoryItem | null }>({ visible: false, x: 0, y: 0, item: null });

    if (reversedHistory.length < 2) return <div className="text-center text-slate-500 p-4">Analyze more ideas to see a trend.</div>;

    const width = 300, height = 100, padding = 10;
    const points = reversedHistory.map((item, i) => {
        const x = (i / (reversedHistory.length - 1)) * (width - 2 * padding) + padding;
        const y = (height - padding) - ((item.result.validationScore / 100) * (height - 2 * padding));
        return { x, y, item };
    });
    const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    const fillPath = `${path} L${points[points.length-1].x},${height-padding} L${points[0].x},${height-padding} Z`;

    const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
        if (!chartRef.current) return;
        const rect = chartRef.current.getBoundingClientRect();
        const svgX = event.clientX - rect.left;
        
        const closestPoint = points.reduce((prev, curr) => 
            Math.abs(curr.x - svgX) < Math.abs(prev.x - svgX) ? curr : prev
        );
        
        setTooltip({
            visible: true,
            x: closestPoint.x,
            y: closestPoint.y,
            item: closestPoint.item
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ visible: false, x: 0, y: 0, item: null });
    };

    return (
        <div className="relative">
             {tooltip.visible && tooltip.item && (
                 <div className="absolute bg-slate-900 border border-slate-600 rounded-md p-2 text-xs shadow-lg transition-all pointer-events-none z-10 space-y-1" 
                      style={{ top: tooltip.y - 75, left: tooltip.x, transform: 'translateX(-50%)' }}>
                     <p className="font-bold text-white whitespace-nowrap">Score: {tooltip.item.result.validationScore}</p>
                     <p className="text-slate-400 max-w-[150px] truncate">{tooltip.item.idea}</p>
                     <p className="text-xs text-slate-500">{new Date(tooltip.item.timestamp).toLocaleDateString()}</p>
                 </div>
            )}
            <svg ref={chartRef} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                 <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#c084fc" />
                    </linearGradient>
                    <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0"/>
                    </linearGradient>
                </defs>
                <path d={fillPath} fill="url(#fillGradient)" />
                <path d={path} fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                {points.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="3" fill="url(#gradient)" className="transition-transform duration-200 hover:scale-150" />
                ))}
                 {tooltip.visible && (
                    <line x1={tooltip.x} y1="0" x2={tooltip.x} y2={height} stroke="rgba(199, 210, 254, 0.5)" strokeWidth="1" strokeDasharray="4 2" />
                )}
            </svg>
        </div>
    )
}

const LoadingState: React.FC = () => (
    <div className="text-center p-8 bg-slate-800/50 rounded-lg h-full flex flex-col justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mx-auto"></div>
        <h3 className="mt-4 text-xl font-semibold">Our AI VCs are deliberating...</h3>
        <p className="text-slate-400 mt-2">Analyzing market trends, potential pitfalls, and unicorn potential.</p>
    </div>
);

const WelcomeState: React.FC = () => (
    <div className="text-center p-8 bg-slate-800/50 rounded-lg h-full flex flex-col justify-center">
        <span className="text-5xl mx-auto mb-4">🚩</span>
        <h3 className="text-xl font-semibold">Ready to Validate Your Vision?</h3>
        <p className="text-slate-400 mt-2">Enter your startup idea in the editor to get started. Our AI will provide a validation score and identify potential red flags to help you build a stronger business case.</p>
    </div>
);

const HISTORY_STORAGE_KEY = 'noCodeRedFlagsHistory';
const AUTOSAVE_STORAGE_KEY = 'noCodeRedFlagsAutoSave';

const exampleIdeas = [
    "An app that uses AI to create personalized meal plans.",
    "A marketplace for renting out high-end camera gear.",
    "A subscription box for artisanal coffee from around the world.",
];

type View = 'matrix' | 'details' | 'trend';

const groupHistoryByDate = (history: HistoryItem[]) => {
    const groups: { [key: string]: HistoryItem[] } = {};
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    history.forEach(item => {
      const itemDate = new Date(item.timestamp);
      let key: string;

      if (itemDate.toDateString() === today.toDateString()) {
        key = 'Today';
      } else if (itemDate.toDateString() === yesterday.toDateString()) {
        key = 'Yesterday';
      } else {
        key = itemDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
      }

      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
    });

    return groups;
};

const HomePage: React.FC = () => {
    const [idea, setIdea] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState(false);
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    const [shareLink, setShareLink] = useState('');
    const [activeView, setActiveView] = useState<View>('details');
    const [comparison, setComparison] = useState<{item1: HistoryItem, item2: HistoryItem} | null>(null);
    const [autoSave, setAutoSave] = useState(true);
    const [historySearchTerm, setHistorySearchTerm] = useState('');

    useEffect(() => {
        try {
            const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
            if (storedHistory) setHistory(JSON.parse(storedHistory));
        } catch (e) {
            console.error("Failed to parse history from localStorage", e);
            localStorage.removeItem(HISTORY_STORAGE_KEY);
        }
        
        const storedAutoSave = localStorage.getItem(AUTOSAVE_STORAGE_KEY);
        if (storedAutoSave) setAutoSave(JSON.parse(storedAutoSave));
    }, []);
    
    const saveHistory = (newHistory: HistoryItem[]) => {
        setHistory(newHistory);
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
    };
    
    const handleSetAutoSave = (enabled: boolean) => {
        setAutoSave(enabled);
        localStorage.setItem(AUTOSAVE_STORAGE_KEY, JSON.stringify(enabled));
    }

    const handleAnalyze = useCallback(async () => {
        if (!idea.trim()) {
            setError('Please enter a startup idea.');
            return;
        }
        setLoading(true);
        setError(null);
        setResult(null);
        setActiveHistoryId(null);
        setComparison(null);
        try {
            const analysisResult = await analyzeStartupIdeaWithCache(idea);
            setResult(analysisResult);
            setActiveView('details');
            
            if (autoSave) {
                const newItem: HistoryItem = {
                    id: `${Date.now()}`,
                    idea,
                    result: analysisResult,
                    timestamp: Date.now(),
                    isSaved: false,
                };
                const newHistory = [newItem, ...history.filter(h => h.idea !== idea)];
                saveHistory(newHistory);
                setActiveHistoryId(newItem.id);
            }

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    }, [idea, history, autoSave]);
    
    const handleSelectHistory = (item: HistoryItem) => {
        setIdea(item.idea);
        setResult(item.result);
        setActiveHistoryId(item.id);
        setError(null);
        setComparison(null);
    };

    const handleCompare = (itemToCompare: HistoryItem, e: React.MouseEvent) => {
        e.stopPropagation();
        const mainItem = history.find(h => h.id === activeHistoryId);
        if(mainItem && mainItem.id !== itemToCompare.id) {
            setComparison({item1: itemToCompare, item2: mainItem});
            setResult(null);
        } else {
            alert('Please select another analysis from the history to compare with this one.');
        }
    }

    const handleToggleSave = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newHistory = history.map(item =>
            item.id === id ? { ...item, isSaved: !item.isSaved } : item
        );
        saveHistory(newHistory);
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        saveHistory(history.filter(item => item.id !== id));
        if (activeHistoryId === id) {
            setResult(null);
            setIdea('');
            setActiveHistoryId(null);
        }
    };
    
    const handleClearHistory = () => {
        if (window.confirm("Are you sure you want to clear all non-saved history items? This cannot be undone.")) {
            const savedItems = history.filter(item => item.isSaved);
            saveHistory(savedItems);
            if (result && !history.find(h => h.id === activeHistoryId)?.isSaved) {
                setResult(null);
                setIdea('');
                setActiveHistoryId(null);
            }
        }
    };
    
    const handleShare = () => {
        if (!result) return;
        try {
            const jsonString = JSON.stringify(result);
            const encoded = btoa(jsonString);
            const link = `${window.location.origin}${window.location.pathname}#share=${encoded}`;
            setShareLink(link);
            setShareModalOpen(true);
        } catch (e) {
            console.error("Failed to create share link", e);
            alert("Could not create a shareable link.");
        }
    };
    
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }

    const sortedHistory = useMemo(() => 
        [...history].sort((a, b) => (b.isSaved ? 1 : 0) - (a.isSaved ? 1 : 0) || b.timestamp - a.timestamp), 
    [history]);

    const filteredHistory = useMemo(() => {
        if (!historySearchTerm.trim()) return sortedHistory;
        return sortedHistory.filter(item => 
            item.idea.toLowerCase().includes(historySearchTerm.toLowerCase())
        );
    }, [sortedHistory, historySearchTerm]);

    const groupedHistory = useMemo(() => groupHistoryByDate(filteredHistory), [filteredHistory]);
    const historyGroupKeys = Object.keys(groupedHistory);

    const ComparisonView: React.FC<{data: {item1: HistoryItem, item2: HistoryItem}}> = ({data}) => {
        const { item1, item2 } = data;
        const scoreDiff = item2.result.validationScore - item1.result.validationScore;
        return (
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 animate-fade-in-up">
                <h2 className="text-2xl font-bold text-center mb-4">Analysis Comparison</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div className="border-r border-slate-700 pr-6">
                        <p className="text-xs text-slate-400 truncate" title={item1.idea}>{item1.idea}</p>
                        <div className="flex items-center gap-4 mt-2">
                             <ScoreCircle score={item1.result.validationScore} size="small" />
                             <p className="text-sm text-slate-300">{item1.result.scoreRationale}</p>
                        </div>
                        <p className="text-sm text-slate-400 mt-2">{item1.result.redFlags.length} red flags</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 truncate" title={item2.idea}>{item2.idea}</p>
                        <div className="flex items-center gap-4 mt-2">
                             <ScoreCircle score={item2.result.validationScore} size="small" />
                             <p className="text-sm text-slate-300">{item2.result.scoreRationale}</p>
                        </div>
                        <p className="text-sm text-slate-400 mt-2">{item2.result.redFlags.length} red flags</p>
                    </div>
                </div>
                <div className="mt-6 text-center border-t border-slate-700 pt-4">
                    <h3 className="font-semibold">Score Difference</h3>
                    <p className={`text-2xl font-bold ${scoreDiff > 0 ? 'text-green-400' : scoreDiff < 0 ? 'text-red-400' : 'text-slate-300'}`}>
                        {scoreDiff > 0 ? '+' : ''}{scoreDiff}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-12">
            {isShareModalOpen && (
                 <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-fade-in-up">
                    <div className="bg-slate-800 rounded-lg p-6 w-full max-w-lg border border-slate-700">
                        <h2 className="text-xl font-bold">Share Analysis Report</h2>
                        <p className="text-slate-400 mt-2">Anyone with this link can view a clean, read-only version of this analysis.</p>
                        <div className="flex items-center gap-2 mt-4">
                            <input type="text" readOnly value={shareLink} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-sm"/>
                            <button onClick={() => copyToClipboard(shareLink)} className="bg-indigo-600 px-4 py-2 rounded-md font-semibold text-sm hover:bg-indigo-500 whitespace-nowrap">{isCopied ? 'Copied!' : 'Copy'}</button>
                        </div>
                         <button onClick={() => setShareModalOpen(false)} className="mt-4 w-full text-center bg-slate-700/50 py-2 rounded-md hover:bg-slate-700 text-sm">Close</button>
                    </div>
                 </div>
            )}
           
            <div className="text-center pt-8 animate-fade-in-up">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
                    Turn Your Idea Into a <span className="text-indigo-400">Validated</span> Startup
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
                    Get instant, AI-powered feedback on your startup idea. Identify red flags before you write a single line of code.
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                 <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-2xl shadow-indigo-500/10">
                    <form onSubmit={(e) => { e.preventDefault(); handleAnalyze(); }}>
                        <textarea
                            value={idea}
                            onChange={(e) => setIdea(e.target.value)}
                            placeholder="Describe your startup idea. e.g., 'An app that uses AI to create personalized meal plans for busy professionals.'"
                            className="w-full h-32 p-4 bg-slate-900 border border-slate-700 rounded-md resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-slate-200 placeholder-slate-500"
                            disabled={loading}
                            aria-label="Startup Idea Input"
                        />
                        {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
                         <div className="mt-4 flex flex-col sm:flex-row gap-2 items-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto flex-grow flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                            >
                                <SparklesIcon className="w-5 h-5" />
                                {loading ? 'Analyzing...' : 'Analyze My Idea'}
                            </button>
                        </div>
                    </form>
                    <div className="mt-4">
                        <p className="text-sm text-slate-400 mb-2">Or try an example:</p>
                        <div className="flex flex-wrap gap-2">
                            {exampleIdeas.map((ex, i) => (
                                <button key={i} onClick={() => setIdea(ex)} className="text-xs bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full hover:bg-slate-700 transition-colors">
                                    {ex}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-4">
                     <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">History</h2>
                        <label className="flex items-center cursor-pointer">
                            <span className="text-sm text-slate-400 mr-2">Auto-save</span>
                            <div className="relative">
                                <input type="checkbox" className="sr-only" checked={autoSave} onChange={(e) => handleSetAutoSave(e.target.checked)} />
                                <div className={`block w-10 h-6 rounded-full ${autoSave ? 'bg-indigo-600' : 'bg-slate-700'}`}></div>
                                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${autoSave ? 'translate-x-full' : ''}`}></div>
                            </div>
                        </label>
                     </div>
                     <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search history..."
                            value={historySearchTerm}
                            onChange={(e) => setHistorySearchTerm(e.target.value)}
                            className="w-full bg-slate-900/80 border border-slate-700 rounded-md p-2 text-sm placeholder-slate-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <button
                            onClick={handleClearHistory}
                            title="Clear non-saved history"
                            className="p-2 rounded-md hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-colors"
                        >
                            <BroomIcon className="w-5 h-5" />
                        </button>
                     </div>
                     <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 max-h-[600px] overflow-y-auto">
                        {filteredHistory.length > 0 ? (
                            <div>
                                {historyGroupKeys.map(groupKey => (
                                    <div key={groupKey}>
                                        <h3 className="text-xs font-bold text-slate-500 uppercase p-2 bg-slate-900/50 sticky top-0 z-10">{groupKey}</h3>
                                        <ul className="divide-y divide-slate-700/50">
                                            {groupedHistory[groupKey].map(item => (
                                                <li key={item.id} onClick={() => handleSelectHistory(item)}
                                                    className={`p-4 cursor-pointer hover:bg-slate-800 transition-colors group ${activeHistoryId === item.id ? 'bg-indigo-900/30' : ''}`}>
                                                    <div className="flex items-center gap-4">
                                                        <ScoreCircle score={item.result.validationScore} size="small" />
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex justify-between items-start">
                                                                <div className="flex-1">
                                                                    <p className="font-semibold text-slate-200 truncate pr-2" title={item.idea}>{item.idea}</p>
                                                                    <p className="text-xs text-slate-400 mt-1">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                                </div>
                                                                 <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                     <button onClick={(e) => handleToggleSave(item.id, e)} title={item.isSaved ? "Unsave" : "Save"} className="p-1 rounded-full hover:bg-slate-700">
                                                                        <StarIcon className={`w-4 h-4 ${item.isSaved ? 'fill-yellow-400 text-yellow-400' : 'text-slate-400'}`} />
                                                                     </button>
                                                                     {activeHistoryId && activeHistoryId !== item.id && (
                                                                     <button onClick={(e) => handleCompare(item, e)} title="Compare" className="p-1 rounded-full hover:bg-slate-700">
                                                                        <CompareIcon className="w-4 h-4 text-slate-400" />
                                                                     </button>
                                                                     )}
                                                                     <button onClick={(e) => handleDelete(item.id, e)} title="Delete" className="p-1 rounded-full hover:bg-slate-700">
                                                                        <TrashIcon className="w-4 h-4 text-slate-400 hover:text-red-400" />
                                                                     </button>
                                                                 </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-4 text-center text-slate-500">
                                <p>{historySearchTerm ? 'No matching ideas found.' : 'Your analyzed ideas will appear here.'}</p>
                            </div>
                        )}
                     </div>
                </div>
                <div className="md:col-span-2">
                    {loading ? <LoadingState /> : result ? (
                        <div className="space-y-8 animate-fade-in-up">
                            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 relative">
                                <button onClick={handleShare} className="absolute top-4 right-4 flex items-center gap-2 text-sm bg-slate-700/50 px-3 py-1.5 rounded-md hover:bg-slate-700 transition-colors">
                                    <ShareIcon className="w-4 h-4"/>
                                    Share
                                </button>
                                <h2 className="text-2xl font-bold text-center mb-4">Validation Score</h2>
                                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                    <ScoreCircle score={result.validationScore} />
                                    <div className="flex-1 text-center md:text-left">
                                        <p className="text-slate-300 font-medium">{result.scoreRationale}</p>
                                        <p className="mt-4 text-slate-400 text-sm">{result.summary}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                               <div className="border-b border-slate-700 mb-4">
                                   <nav className="-mb-px flex space-x-6">
                                       <button onClick={() => setActiveView('details')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeView === 'details' ? 'border-indigo-400 text-indigo-300' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>Detailed Flags</button>
                                       <button onClick={() => setActiveView('matrix')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeView === 'matrix' ? 'border-indigo-400 text-indigo-300' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>Risk Matrix</button>
                                       <button onClick={() => setActiveView('trend')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeView === 'trend' ? 'border-indigo-400 text-indigo-300' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>Score Trend</button>
                                   </nav>
                               </div>
                                {activeView === 'details' && <div className="space-y-4">{result.redFlags.map((flag, index) => <RedFlagCard key={index} flag={flag} index={index} />)}</div>}
                                {activeView === 'matrix' && <RiskMatrix flags={result.redFlags} />}
                                {activeView === 'trend' && <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50"><ScoreTrendChart history={sortedHistory} /></div>}
                            </div>
                        </div>
                    ) : comparison ? (
                       <ComparisonView data={comparison} />
                    ) : (
                        <WelcomeState />
                    )}
                </div>
            </div>
            <AdPlaceholder />
        </div>
    );
};

export default HomePage;