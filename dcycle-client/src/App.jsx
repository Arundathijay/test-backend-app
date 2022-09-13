import { useState } from "react";
import React from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [name, setName] = useState("");

  let nameApi = `https://api.genderize.io/?name=${name}`;
  let countryApi = `https://api.nationalize.io/?name=${name}`;
  let ageApi = `https://api.agify.io/?name=${name}`;

  const requestOne = axios.get(nameApi);
  const requestTwo = axios.get(countryApi);
  const requestThree = axios.get(ageApi);

  // useEffect(() => {
  //   axios
  //     .get(`https://api.genderize.io/?name=${name}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setName(data);
  //       console.log(data);
  //     });
  // }, [name]);

  axios
    .all([requestOne, requestTwo, requestThree])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        const responesThree = responses[2];

        // use/access the results
        console.log(responseOne, responseTwo, responesThree);
      })
    )
    .catch((errors) => {
      // react on errors.
      console.error(errors);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
    </div>
  );
}

export default App;
