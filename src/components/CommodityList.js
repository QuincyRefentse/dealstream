import React, { useState, useEffect } from "react"; 

const CommodityList = () => {
  const [commodities, setCommodities] = useState([]);
  const [filteredCommodities, setFilteredCommodities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch commodities data from API
  useEffect(() => {
    const fetchCommodities = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch("https://api.example.com/commodities");
        const data = await response.json();
        setCommodities(data);
        setFilteredCommodities(data); // Initially show all commodities
      } catch (error) {
        setError("Error fetching commodities data. Please try again.");
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchCommodities();
  }, []); // Run only once when the component mounts

  // Handle search filter (now depends only on searchQuery)
  useEffect(() => {
    const filtered = searchQuery
      ? commodities.filter((commodity) =>
          commodity.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : commodities;

    setFilteredCommodities(filtered);
  }, [searchQuery, commodities]); // Only trigger when searchQuery or commodities changes

  // Handle sorting based on price (only triggers on sortOrder change)
  const handleSort = () => {
    setSortOrder((prev) => {
      const newSortOrder = prev === "asc" ? "desc" : "asc";
      const sortedCommodities = [...filteredCommodities].sort((a, b) => {
        return newSortOrder === "asc" ? a.price - b.price : b.price - a.price;
      });
      setFilteredCommodities(sortedCommodities);
      return newSortOrder;
    });
  };

  return (
    <div style={{ padding: "20px", background: "#f1f1f1" }}>
      {/* Title */}
      <h1 style={{ textAlign: "center", marginBottom: "20px", fontSize: "2rem", color: "black" }}>
        Commodities
      </h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for a commodity"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
      />

      {/* Sort Button */}
      <button
        onClick={handleSort}
        style={{
          padding: "8px 16px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Sort by Price ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>

      {/* Loading and Error Handling */}
      {isLoading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* Commodity Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
        {filteredCommodities.map((commodity) => (
          <div
            key={commodity.name}
            style={{
              textAlign: "center",
              margin: "10px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#fff",
              width: "200px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>{commodity.name}</h3>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: commodity.price > 1000 ? "red" : "green", // Price color based on threshold
              }}
            >
              ${commodity.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommodityList;
