import { takeLatest, call, put } from "redux-saga/effects";
import { dataInEachDaySucceeded, dataInEachDayFailed } from "../actions";
import { DATA_PER_REGION_IN_EACH_DAY } from "../constants";
import { Post } from "../functions/Request";

function* fetchData(action) {
  try {
    const { message } = yield call(Post, "/dataInEachDay", {
      args: {
        name: action.payload.toLowerCase(),
      },
    });
    yield put(dataInEachDaySucceeded(message));
  } catch (error) {
    yield put(dataInEachDayFailed(error.message));
  }
}

function* dataInEachDaySaga() {
  yield takeLatest(DATA_PER_REGION_IN_EACH_DAY.REQUESTED, fetchData);
}

export default dataInEachDaySaga;
