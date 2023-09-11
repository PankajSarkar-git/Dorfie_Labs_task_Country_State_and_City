import React, { useEffect, useState } from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);
  const [filterstates, setFilterStates] = useState([]);
  const [filterCity, setFilterCity] = useState([]);
  const [countryid, setCountryId] = useState();
  const [stateid, setStateId] = useState();

  // API CALLS------------------

  // Country API call
  const fetchCountry = async () => {
    const data = await fetch(
      "https://d32sbion19muhj.cloudfront.net/pub/interview/countries"
    );
    const json = await data.json();
    setCountries(json.data);
  };

  // State API call
  const fetchState = async () => {
    const data = await fetch(
      "https://d32sbion19muhj.cloudfront.net/pub/interview/states"
    );
    const json = await data.json();
    setStates(json.data);
  };

  // City API call
  const fetchCity = async () => {
    const data = await fetch(
      "https://d32sbion19muhj.cloudfront.net/pub/interview/cities"
    );
    const json = await data.json();
    setCity(json.data);
  };

  // useEffect for API call
  useEffect(() => {
    fetchCountry();
    fetchState();
    fetchCity();
  }, []);

  // Filter section

  // State Filter
  const stateFilter = (e) => {
    const data = states.filter((state) => {
      return state.country_id === countryid;
    });
    setFilterStates(data);
  };

  // City FIlter
  const cityFilter = (e) => {
    const data = city.filter((city) => {
      return city.state_id === stateid;
    });
    setFilterCity(data);
  };

  // useEffect for any Changes or update state  Call this function
  useEffect(() => {
    stateFilter();
    cityFilter();
  }, [countryid, stateid]);

  return (
    <>
      <div className="main">
        <div className="main-box">
          <h1 className="main-heading">Dorfie Labs</h1>
          <h1 className="main-heading">Select Your Country, State, City</h1>

          {/* Country dropdown */}

          <div>
            <h1 className="sub-heading">Country :</h1>
            <select
              name=""
              id=""
              onChange={(e) => {
                setCountryId(Number(e.target.value));
              }}
            >
              <option value="0">Select Country</option>
              {countries !== 0 &&
                countries.map((country) => {
                  return (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  );
                })}
            </select>
          </div>
          {/* State dropdown */}

          <div>
            <h1 className="sub-heading">State :</h1>
            <select
              name=""
              id=""
              onChange={(e) => {
                setStateId(Number(e.target.value));
              }}
            >
              <option value="0">Select State</option>
              {filterstates !== 0 &&
                filterstates.map((state) => {
                  return (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  );
                })}
            </select>
          </div>
          {/* City dropdown */}
          <div>
            <h1 className="sub-heading">City :</h1>
            <select name="" id="">
              <option value="0">Select City</option>
              {filterCity !== 0 &&
                filterCity.map((city) => {
                  return (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
