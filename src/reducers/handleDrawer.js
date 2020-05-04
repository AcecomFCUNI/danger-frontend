import { HANDLE_DRAWER } from "../constants";

const initialState = false;

const handleDrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_DRAWER:
      return !state;
    default:
      return state;
  }
};

export default handleDrawerReducer;
