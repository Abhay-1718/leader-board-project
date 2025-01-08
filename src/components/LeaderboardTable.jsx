import React from "react";
import { useTraderContext } from "../context/TraderContext";

const LeaderboardTable = () => {
  const { traders, trophyFilter, setTrophyFilter } = useTraderContext();

  // Handle trophy filter change
  const handleTrophyFilterChange = (event) => {
    setTrophyFilter(event.target.value);
  };

  return (
    <div className="overflow-x-auto mt-8">
      {/* Trophy Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="trophyFilter" className="mr-2 text-sm font-medium">Filter by Trophies:</label>
        <select
          id="trophyFilter"
          value={trophyFilter}
          onChange={handleTrophyFilterChange}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All</option>
          <option value="1">1+ Trophies</option>
          <option value="2">2+ Trophies</option>
          <option value="3">3+ Trophies</option>
          <option value="4">4+ Trophies</option>
        </select>
      </div>

      {/* Table */}
      <table className="table-auto w-full text-left bg-white shadow-lg rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-3 text-sm font-medium sm:px-6">Rank</th>
            <th className="px-4 py-3 text-sm font-medium sm:px-6">Name</th>
            <th className="px-4 py-3 text-sm font-medium sm:px-6">Trading Style</th>
            <th className="px-4 py-3 text-sm font-medium sm:px-6">Streaks</th>
            <th className="px-4 py-3 text-sm font-medium sm:px-6">Alerts</th>
            <th className="px-4 py-3 text-sm font-medium sm:px-6">Trades</th>
            <th className="px-4 py-3 text-sm font-medium sm:px-6">Avg Gain</th>
            <th className="px-4 py-3 text-sm font-medium sm:px-6">Xscore</th>
            <th className="px-4 py-3 text-sm font-medium sm:px-6">Trophies</th>
          </tr>
        </thead>
        <tbody>
          {traders.map((trader, index) => {
            const rowClass = index % 2 === 0 ? "bg-gray-50" : "bg-white";
            return (
              <tr
                key={`${trader.Name}-${trader.Rank}`}
                className={`border-t border-gray-200 hover:bg-gray-200 focus:outline-none transition-all duration-300 transform hover:scale-90 hover:z-10 ${rowClass}`}
              >
                <td className="px-4 py-4 text-sm font-medium sm:px-6">{trader.Rank}</td>
                <td className="px-4 py-4 text-sm font-medium sm:px-6">{trader.Name}</td>
                <td className="px-4 py-4 text-sm text-gray-700 sm:px-6">{trader["Trading Style"]}</td>
                <td className="px-4 py-4 text-sm text-gray-700 sm:px-6">{trader.Streaks}</td>
                <td className="px-4 py-4 text-sm text-gray-700 sm:px-6">{trader.Alerts}</td>
                <td className="px-4 py-4 text-sm text-gray-700 sm:px-6">{trader.Trades}</td>
                <td className="px-4 py-4 text-sm text-gray-700 sm:px-6">{trader["Avg Gain"]}</td>
                <td className="px-4 py-4 text-sm text-gray-700 sm:px-6">{trader.Xscore}</td>
                <td className="px-4 py-4 text-sm text-gray-700 sm:px-6">{trader.Trophies}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
