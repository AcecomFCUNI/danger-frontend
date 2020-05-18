import { DATA_PER_REGION_IN_EACH_DAY } from "../constants";

const initialState = {
  name: "",
  loading: false,
  error: "",
  data: [],
};

const dataInEachDayReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_PER_REGION_IN_EACH_DAY.REQUESTED:
      return { ...state, name: action.payload, loading: true };
    case DATA_PER_REGION_IN_EACH_DAY.SUCCEEDED:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case DATA_PER_REGION_IN_EACH_DAY.FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default dataInEachDayReducer;
