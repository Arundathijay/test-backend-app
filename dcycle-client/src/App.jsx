import { useState } from "react";
import React from "react";
import "./App.css";
import axios from "axios";
import Covid from "./Covid";

function App() {
  const [name, setName] = useState([]);
  const [userGender, setUserGender] = useState("");
  const [userAge, setUserAge] = useState("");
  const [genderProb, setUserGenderProb] = useState("");
  const [userCountry, setUserCountry] = useState([]);

  //assign API urls
  const genderApi = `https://api.genderize.io/?name=`;
  const countryApi = `https://api.nationalize.io/?name=`;
  const ageApi = `https://api.agify.io/?name=`;

  const handleSubmit = (e) => {
    e.preventDefault();

    //get required data from each url using axios
    const requestOne = axios.get(`${genderApi}${name}`);
    const requestTwo = axios.get(`${countryApi}${name}`);
    const requestThree = axios.get(`${ageApi}${name}`);

    //use axios all to access all three APIs
    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responesThree = responses[2];

          // access the results
          setUserGender(responseOne.data.gender);
          setUserGenderProb(responseOne.data.probability);
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

  return (
    <div className='App'>
      <div className='search-form'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={name}
            placeholder='name'
            onChange={(e) => setName(e.target.value)}
          />
          <button className='btn-submit' type='submit'>
            Submit
          </button>
        </form>
      </div>
      <h3>Predicted data from a given name</h3>
      {/* display retrieved info from the APIs */}
      <div className='search-info'>
        <div className='search-name'>
          Gender: {userGender}
          <div>Gender probability: {genderProb}</div>
        </div>
        <div className='search-age'>Age: {userAge}</div>
        <div className='search-country'>
          {/* mapping through the country array to get probable countries */}
          Country:{" "}
          {userCountry &&
            userCountry.map((countryCode, i) => (
              <li key={i}>{countryCode.country_id}</li>
            ))}
        </div>
      </div>
      {/* Display the covid details table imported from the covid component */}
      <div className='covid-info'>
        <Covid />
      </div>
    </div>
  );
}

export default App;
