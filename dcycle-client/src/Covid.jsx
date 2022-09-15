import React from "react";
import { useState, useEffect } from "react";

const Covid = () => {
  const [covidInfo, setCovidInfo] = useState();

  // Fetch covid data when the component rendrs
  useEffect(() => {
    fetch("https://api.covidtracking.com/v2/us/daily.json")
      .then((res) => res.json())
      .then((response) => {
        setCovidInfo(response.data);
      });
  }, []);

  return (
    <div>
      <h2>Covid Data of USA from 2020-01 to 2021-03</h2>
      <table>
        {/* display covid data in a table  */}
        <tbody>
          <tr>
            <th>Date</th>
            <th>Cases</th>
            <th>Testing</th>
            <th>Deaths</th>
          </tr>
          {covidInfo &&
            covidInfo.map((item, i) => (
              <tr key={i}>
                <td>{item.date}</td>
                <td>{item.cases.total.value}</td>
                <td>{item.testing.total.value}</td>
                <td>{item.outcomes.death.total.value}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Covid;
