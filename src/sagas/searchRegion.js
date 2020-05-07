import { takeLatest, call, put } from "redux-saga/effects";
import { searchRegionSucceeded, searchRegionFailed } from "../actions";
import { SEARCH_REGION } from "../constants";
import { Post } from "../functions/Request";

function* fetchRegion(action) {
  try {
    const { message } = yield call(Post, "/totalData", {
      args: {
        name: action.payload.toLowerCase(),
      },
    });
    yield put(searchRegionSucceeded(message));
  } catch (error) {
    yield put(searchRegionFailed(error.message));
  }
}

function* searchRegionSaga() {
  yield takeLatest(SEARCH_REGION.REQUESTED, fetchRegion);
}

export default searchRegionSaga;
