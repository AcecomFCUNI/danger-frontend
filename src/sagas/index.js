import { all, fork } from "redux-saga/effects";
import allRegionsSaga from "./allRegions";
import searchRegionSaga from "./searchRegion";
import dataInEachDaySaga from "./dataInEachDay";

export default function* rootSaga() {
  yield all([
    fork(allRegionsSaga),
    fork(searchRegionSaga),
    fork(dataInEachDaySaga),
  ]);
}
