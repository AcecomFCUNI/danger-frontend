import { call, put, takeLatest } from "redux-saga/effects";
import { fetchAllRegionsSucceeded, fetchAllRegionsFailed } from "../actions";
import { FETCH_ALL_REGIONS } from "../constants";
import { Get, Post } from "../functions/Request";
import { addPopulationToData } from "../functions/RegionsPopulation";

function* fetchAllRegions() {
  try {
    const {
      message: { currentDate },
    } = yield call(Get, "/currentDate");
    const { message } = yield call(Post, "/dataPerDay", {
      args: {
        date: currentDate,
      },
    });
    const regions = addPopulationToData(message.departmentsData.departments);
    yield put(fetchAllRegionsSucceeded(message.totalData, regions));
  } catch (error) {
    yield put(fetchAllRegionsFailed(error.message));
  }
}

function* allRegionsSaga() {
  yield takeLatest(FETCH_ALL_REGIONS.REQUESTED, fetchAllRegions);
}

export default allRegionsSaga;
