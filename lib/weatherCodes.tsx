import React from 'react';

export const getWeatherDetails = (code: number): { text: string; icon: React.JSX.Element } => {
  const cloudIcon = <svg className="w-8 h-8 text-blue-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>;
  const sunIcon = <svg className="w-8 h-8 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
  
  const mapping: Record<number, { text: string; icon: React.JSX.Element }> = {
    0: { text: "Clear Sky", icon: sunIcon },
    1: { text: "Mainly Clear", icon: cloudIcon },
    2: { text: "Partly Cloudy", icon: cloudIcon },
    3: { text: "Overcast", icon: cloudIcon },
  };
  return mapping[code] || { text: "Scattered Clouds", icon: cloudIcon };
};