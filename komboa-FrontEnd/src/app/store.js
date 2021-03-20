import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import adminReducer from "../features/Admin/adminSlice";
import propertySearchReducer from "../features/Property/PropertySlice";
import propertyReducer from "../features/Property/PropertySlice2";
import dropSlice from "../components/DropZone/dropslice";
import mapSlice from "../components/Maps/MapsSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const combined = combineReducers({
  admin: adminReducer,
  propertyFound: propertySearchReducer,
  drop: dropSlice,
  property: propertyReducer,
  maps: mapSlice,
});
const persistedReducer = persistReducer(persistConfig, combined);

const store = configureStore({
  reducer: {
    persistedReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

store.subscribe(() => {
  store.getState();
});
export const persistor = persistStore(store);

export default store;
