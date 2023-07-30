import { combineReducers } from "redux";
import PhatTuReducers from "./PhatTuReducers";

const rootReducer = combineReducers({
    phatTu: PhatTuReducers,
});
export default rootReducer;