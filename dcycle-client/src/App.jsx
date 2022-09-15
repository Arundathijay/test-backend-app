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

  const genderApi = `https://api.genderize.io/?name=${name}`;
  const countryApi = `https://api.nationalize.io/?name=${name}`;
  const ageApi = `https://api.agify.io/?name=${name}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOne = axios.get(`${genderApi}`);
    const requestTwo = axios.get(`${countryApi}`);
    const requestThree = axios.get(`${ageApi}`);

    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responesThree = responses[2];

          // use/access the results
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
      <div className='search-info'>
        <div className='search-name'>
          Gender: {userGender}
          <div>Gender probability: {genderProb}</div>
        </div>
        <div className='search-age'>Age: {userAge}</div>
        <div className='search-country'>
          Country:{" "}
          {userCountry &&
            userCountry.map((countryCode, i) => (
              <li key={i}>{countryCode.country_id}</li>
            ))}
        </div>
      </div>
      <Covid />
    </div>
  );
}

export default App;
