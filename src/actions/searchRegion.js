import { SEARCH_REGION } from "../constants";

const searchRegionRequested = (name) => {
  return {
    type: SEARCH_REGION.REQUESTED,
    payload: name,
  };
};

const searchRegionSucceeded = (data) => {
  return {
    type: SEARCH_REGION.SUCCEEDED,
    payload: data,
  };
};

const searchRegionFailed = (error) => {
  return {
    type: SEARCH_REGION.FAILED,
    payload: error,
  };
};

const searchRegionClean = () => {
  return {
    type: SEARCH_REGION.CLEAN,
  };
};

export {
  searchRegionRequested,
  searchRegionSucceeded,
  searchRegionFailed,
  searchRegionClean,
};
