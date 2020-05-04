import { FETCH_ALL_REGIONS } from "../constants";

const fetchAllRegionsRequested = () => {
  return {
    type: FETCH_ALL_REGIONS.REQUESTED,
  };
};

const fetchAllRegionsSucceeded = (total, regions) => {
  return {
    type: FETCH_ALL_REGIONS.SUCCEEDED,
    payload: { total, regions },
  };
};

const fetchAllRegionsFailed = (error) => {
  return {
    type: FETCH_ALL_REGIONS.FAILED,
    payload: error,
  };
};

export {
  fetchAllRegionsRequested,
  fetchAllRegionsSucceeded,
  fetchAllRegionsFailed,
};
