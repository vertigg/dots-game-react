import { createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token']
};

const pReducer = persistReducer(persistConfig, rootReducer);

function configureStore(initialState) {
  return createStore(
    pReducer,
    initialState,
    compose(window.devToolsExtension ? window.devToolsExtension() : f => f)
  );
}

export const store = configureStore();
export const persistor = persistStore(store);
