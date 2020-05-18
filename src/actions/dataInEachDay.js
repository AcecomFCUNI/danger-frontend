import { DATA_PER_REGION_IN_EACH_DAY } from "../constants";

export const dataInEachDayRequested = (name) => {
  return {
    type: DATA_PER_REGION_IN_EACH_DAY.REQUESTED,
    payload: name,
  };
};

export const dataInEachDaySucceeded = (data) => {
  return {
    type: DATA_PER_REGION_IN_EACH_DAY.SUCCEEDED,
    payload: data,
  };
};

export const dataInEachDayFailed = (error) => {
  return {
    type: DATA_PER_REGION_IN_EACH_DAY.FAILED,
    payload: error,
  };
};
