import { FETCH_ALL_REGIONS } from "../constants";

const initialState = {
  loading: false,
  total: {},
  regions: [],
  error: "",
};

const allRegionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_REGIONS.REQUESTED:
      return { ...state, loading: true };
    case FETCH_ALL_REGIONS.SUCCEEDED:
      return {
        ...state,
        loading: false,
        total: action.payload.total,
        regions: action.payload.regions,
      };
    case FETCH_ALL_REGIONS.FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default allRegionsReducer;
