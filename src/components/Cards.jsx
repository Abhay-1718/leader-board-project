import React from "react";
import { useTraderContext } from "../context/TraderContext";

const getRankingBadge = (rank) => {
  const numericRank = parseInt(rank, 10); // Convert rank to a number
  if (isNaN(numericRank)) {
    console.error('Invalid rank:', rank);
    return "bg-gray-200 text-black"; // Fallback style
  }

  switch (numericRank) {
    case 1:
      return "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"; // Gold for 1st
    case 2:
      return "bg-gradient-to-r from-gray-400 to-gray-500 text-white"; // Silver for 2nd
    case 3:
      return "bg-gradient-to-r from-rose-400 to-rose-500 text-white"; // Bronze for 3rd
    default:
      return "bg-gradient-to-r from-gray-200 to-gray-300 text-black"; // Default for others
  }
};

const CardComponent = ({ type }) => {
  const { topTraders } = useTraderContext();

  return (
    <div className="flex flex-wrap justify-center gap-6 py-8 max-w-full">
      {type === "topTraders" &&
        topTraders.map((trader) => (
          <div
            key={trader.Rank}
            className="w-full sm:w-80 md:w-72 lg:w-80 xl:w-96 max-w-xs bg-white rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 ease-in-out border border-gray-200 p-5"
          >
            {/* Card Header - Rank */}
            <div className="flex items-center mb-4">
              <div
                className={`${getRankingBadge(trader.Rank)} inline-block px-4 py-1 rounded-lg text-lg font-semibold`}
              >
                {trader.Rank} {rankToOrdinal(trader.Rank)}
              </div>
            </div>

            {/* Trader Info */}
            <div className="text-left mb-4">
              <h4 className="text-xl font-semibold text-gray-800 mb-1">{trader.Name}</h4>
              <p className="text-sm text-gray-600 mb-3">{trader["Trading Style"]}</p>
              <div className="space-y-1">
                <div>
                  <span className="font-semibold text-gray-700">Xscore: </span>
                  <span className="text-gray-900">{trader.Xscore}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Avg Gain: </span>
                  <span className="text-gray-900">{trader["Avg Gain"]}</span>
                </div>
              </div>
            </div>

            {/* Card Footer - Trophies */}
            <div className="flex justify-start pt-2">
              <p className="text-gray-700">
                Trophies: <span className="font-bold text-yellow-500">{trader.Trophies}</span>
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

const rankToOrdinal = (rank) => {
  const numericRank = parseInt(rank, 10);
  if (numericRank === 1) return "st";
  if (numericRank === 2) return "nd";
  if (numericRank === 3) return "rd";
  return "th";
};

export default CardComponent;
