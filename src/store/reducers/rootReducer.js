import authReducer from "./authReducer";
import classReducer from "./classReducer";
import sliceReducer from "./sliceReducer";
import sessionReducer from "./sessionReducer";
import dashboardReducer from "./dashboardReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
//reducers are functions that specify how the applications's state changes in response to the actions given
const rootReducer = combineReducers({
	auth: authReducer,
	classs: classReducer,
	slices: sliceReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer,
	session: sessionReducer,
	dashboard: dashboardReducer
});

export default rootReducer;
