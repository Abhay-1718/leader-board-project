import React, { createContext, useState, useEffect } from "react";

const TraderContext = createContext();

// Provider component
export const TraderProvider = ({ children }) => {
  const [traders, setTraders] = useState([]);
  const [topTraders, setTopTraders] = useState([]);
  const [keyMetrics, setKeyMetrics] = useState({
    mostTipsGiven: 0,
    mostActive: 0,
    longestStreak: 0,
    rankChange: 0,
  });
  const [filteredTraders, setFilteredTraders] = useState([]); 
  const [trophyFilter, setTrophyFilter] = useState(""); 

  useEffect(() => {
    // Fetching the data from the API
    fetch("https://api.sheetbest.com/sheets/2455271a-9f9a-4de1-bdb5-1ad6da466491")
      .then((response) => response.json())
      .then((data) => {
        // Ensure that the rank exists and is a valid number
        const sanitizedTraders = data.map((trader) => ({
          ...trader,
          Rank: isNaN(trader.Rank) ? 0 : trader.Rank, // Ensure valid rank
        }));
        
        setTraders(sanitizedTraders);
        setTopTraders(sanitizedTraders.slice(0, 3)); // Top 3 traders
        setKeyMetrics({
          mostTipsGiven: sanitizedTraders.reduce((acc, trader) => acc + trader.alerts, 0) || 0,
          mostActive: sanitizedTraders.reduce((acc, trader) => acc + trader.trades, 0) || 0,
          longestStreak: Math.max(...sanitizedTraders.map((trader) => trader.streaks)) || 0, // Default to 0 if empty
          rankChange: sanitizedTraders[0]?.rank || 0, // Ensure rank exists
        });
      })
      .catch((error) => console.error("Error fetching trader data:", error));
  }, []);

  // Function to filter traders based on trophy count
  const filterByTrophies = (trophyFilter) => {
    const trophyFilterValue = parseInt(trophyFilter, 10);

    if (trophyFilter === "") {
      setFilteredTraders(traders); // Show all traders if no filter
    } else {
      const filtered = traders.filter((trader) => {
        const traderTrophies = parseInt(trader.Trophies, 10);
        return traderTrophies >= trophyFilterValue;
      });
      setFilteredTraders(filtered);
    }
  };

  // Effect to apply filtering when trophyFilter changes
  useEffect(() => {
    filterByTrophies(trophyFilter);
  }, [trophyFilter, traders]);

  return (
    <TraderContext.Provider value={{ traders: filteredTraders, topTraders, keyMetrics, trophyFilter, setTrophyFilter }}>
      {children}
    </TraderContext.Provider>
  );
};

// Export the context to use in other components
export const useTraderContext = () => {
  return React.useContext(TraderContext);
};
