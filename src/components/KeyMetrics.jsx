import React from 'react';
import { useTraderContext } from '../context/TraderContext';

const KeyMetrics = () => {
  const { keyMetrics } = useTraderContext();

  return (
    <div className="p-6 max-w-5xl mx-auto mt-8 bg-gray-50 rounded-xl shadow-md">
      <h2 className="text-3xl font-semibold text-center text-gray-600 mb-6">Key Metrics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Most Tips Given', value: keyMetrics.mostTipsGiven, color: 'blue' },
          { label: 'Most Active', value: keyMetrics.mostActive, color: 'green' },
          { label: 'Longest Streak', value: keyMetrics.longestStreak, color: 'yellow' },
          { label: 'Rank Change', value: keyMetrics.rankChange, color: 'red' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className={`bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:scale-105`}
          >
            <h3 className="text-lg text-gray-600 mb-2">{label}</h3>
            <p className={`text-xl font-semibold text-${color}-600`}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyMetrics;
