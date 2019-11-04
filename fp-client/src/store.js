import { createStore, combineReducers } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage/session" // defaults to localStorage for web

import authReducer from "./components/auth/authReducer"
import alertReducer from "./components/layout/organism/Alert/alertReducer"

const rootReducer = combineReducers({ auth: authReducer, alert: alertReducer })

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export const persistor = persistStore(store)
