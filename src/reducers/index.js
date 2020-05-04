import { combineReducers } from "redux";
import allRegionsReducer from "./allRegions";
import searchRegionReducer from "./searchRegion";
import handleDrawerReducer from "./handleDrawer";
const rootReducer = combineReducers({
  allRegions: allRegionsReducer,
  regionSearched: searchRegionReducer,
  handleDrawer: handleDrawerReducer,
});

export default rootReducer;
