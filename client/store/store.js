////////////////////////////
//Setup store for our App //
////////////////////////////
import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";
import { createLogger } from "redux-logger";
// import { composeWithDevTools } from "redux-devtools-extension";
import createHistory from "history/createBrowserHistory";
import thunk from "redux-thunk";

import rootReducer from "../reducer/index";

export const history = createHistory();

const logger = createLogger();
const historyMiddleware = routerMiddleware(history);

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, historyMiddleware, logger),
  );

  return store;
}
