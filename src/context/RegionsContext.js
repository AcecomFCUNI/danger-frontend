import React, { useState, useEffect } from "react";

import Loader from "../components/Loader";

// populationData
import regionsPopulation from "../functions/regionsPopulation";

// -- fetch data from RestAPI --
import getDataFromAPI from "../functions/getDataFromAPI";

const RegionsContext = React.createContext();

// mix localData and apiData
const getRegions = (regionsPopulation, dataAPI) => {
  let regions = [];

  regions = regionsPopulation.map((regionPopulation) => {
    return {
      ...regionPopulation,
      // default data
      cases: 0,
      deaths: 0,

      // overwrite default with API data
      ...dataAPI.filter(
        (department) => department.name === regionPopulation.name
      )[0],
    };
  });

  return regions;
};

export const RegionsContextProvider = ({ children }) => {
  const [regionsData, setRegionsData] = useState({
    regions: null,
    success: null,
    error: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataFromAPI()
      .then((data) => {
        let regions = getRegions(regionsPopulation, data);
        setRegionsData({ regions, success: true });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setRegionsData({ success: false });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  } else {
    if (!regionsData.success) return <h2>Something went wrong :(</h2>;
    else {
      return (
        <RegionsContext.Provider value={regionsData.regions}>
          {children}
        </RegionsContext.Provider>
      );
    }
  }
};

export const RegionsContextConsumer = RegionsContext.Consumer;

export default RegionsContext;
