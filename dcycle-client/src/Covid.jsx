import React from "react";
import { useState, useEffect } from "react";

const Covid = () => {
  const [items, setItems] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://api.covidtracking.com/v2/us/daily.json")
      .then((res) => res.json())

      .then((response) => {
        console.log(response);
        setItems(response.data);
      });
  };

  // async function getCovidData(e) {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.get(
  //       "https://api.covidtracking.com/v2/us/daily.json"
  //     );
  //     console.log(response.data);
  //     return response.data;

  //   } catch (err) {
  //     console.log(err);
  //   }

  //   console.log(await getCovidData());
  // }

  return (
    <div>
      Covid
      <div>
        <tbody>
          <tr>
            <th>Cases</th>
            <th>Testing</th>
            <th>Deaths</th>
          </tr>
          {items &&
            items.map(
              (item, i) =>
                item.map((info, i) => {
                  console.log(info);
                })

              // <tr key={i}>
              //   <td>{item.cases.total.value}</td>
              //   <td>{item.testing}</td>
              //   <td>{item.death.total.value}</td>
              // </tr>
            )}
        </tbody>
      </div>
    </div>
  );
};

export default Covid;
