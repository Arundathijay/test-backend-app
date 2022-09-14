import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Covid = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.covidtracking.com/v2/us/daily.json")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      Covid
      <div>
        <ul>
          {items.map((item) => (
            <li key={item.id}> item.cases</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Covid;
