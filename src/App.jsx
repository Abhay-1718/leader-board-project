import React from "react";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import KeyMetrics from "./components/KeyMetrics";
import LeaderboardTable from "./components/LeaderboardTable";
import { TraderProvider } from "./context/TraderContext";

const App = () => {
  return (
    <TraderProvider>
      <div className="bg-gray-200 min-h-screen">
        {/* Navbar */}
        <Navbar />

        <div className="container mx-auto px-4 py-6">
          {/* Top Traders Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Top Traders</h2>
            <p className="text-lg text-gray-600 mt-2">Meet the top traders making the best moves in the market.</p>
          </div>

          <div className="flex justify-center space-x-6 mb-12">
            <Cards type="topTraders" />
          </div>

          {/* Key Metrics */}
          <KeyMetrics />

          {/* Leaderboard */}
          <div className="mt-12">
            <LeaderboardTable />
          </div>
        </div>
      </div>
    </TraderProvider>
  );
};

export default App;
