import { SEARCH_REGION } from "../constants";

const initialState = {
  name: "",
  loading: false,
  data: [],
  error: "",
};

const searchRegionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REGION.REQUESTED:
      return { ...state, loading: true, name: action.payload };
    case SEARCH_REGION.SUCCEEDED:
      return { ...state, loading: false, data: action.payload };
    case SEARCH_REGION.FAILED:
      return { ...state, loading: false, error: action.payload };
    case SEARCH_REGION.CLEAN:
      return initialState;
    default:
      return state;
  }
};

export default searchRegionReducer;
