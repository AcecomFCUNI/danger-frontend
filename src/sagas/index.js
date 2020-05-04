import { all, fork } from "redux-saga/effects";
import allRegionsSaga from "./allRegions";
import searchRegionSaga from "./searchRegion";

export default function* rootSaga() {
  yield all([fork(allRegionsSaga), fork(searchRegionSaga)]);
}
