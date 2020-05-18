import { combineReducers } from "redux";
import allRegionsReducer from "./allRegions";
import searchRegionReducer from "./searchRegion";
import handleDrawerReducer from "./handleDrawer";
import dataInEachDayReducer from "./dataInEachDay";
const rootReducer = combineReducers({
  allRegions: allRegionsReducer,
  regionSearched: searchRegionReducer,
  dataPerRegionInEachDay: dataInEachDayReducer,
  handleDrawer: handleDrawerReducer,
});

export default rootReducer;
