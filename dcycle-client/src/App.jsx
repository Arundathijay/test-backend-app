import { useState } from "react";
import React from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [name, setName] = useState([]);
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userCountry, setUserCountry] = useState([]);

  const nameApi = `https://api.genderize.io/?name=${name}`;
  const countryApi = `https://api.nationalize.io/?name=${name}`;
  const ageApi = `https://api.agify.io/?name=${name}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOne = axios.get(`${nameApi}`);
    const requestTwo = axios.get(`${countryApi}${name}`);
    const requestThree = axios.get(`${ageApi}${name}`);

    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responesThree = responses[2];

          // use/access the results
          setUserName(responseOne.data.name);
          setUserCountry(responseTwo.data.country);
          setUserAge(responesThree.data.age);
          console.log(responseOne, responseTwo, responesThree);
        })
      )
      .catch((errors) => {
        // react on errors.
        console.error(errors);
      });
  };

  // useEffect(() => {
  //   axios
  //     .get(`https://api.genderize.io/?name=${name}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setName(data);
  //       console.log(data);
  //     });
  // }, [name]);

  // async function getName(e) {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.get(
  //       `https://api.genderize.io/?name=${name}`
  //     );
  //     console.log(response.data);
  //     return response.data;
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   console.log(await getName());
  // }
  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
      <div>Name: {userName}</div>
      <div>Age: {userAge}</div>
      <div>
        Country:{" "}
        {userCountry &&
          userCountry.map((countryCode, i) => (
            <li key={i}>{countryCode.country_id}</li>
          ))}
      </div>
    </div>
  );
}

export default App;
