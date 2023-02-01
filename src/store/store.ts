import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import gridReducer from "./gridSlice";
export const store = configureStore({
  reducer: {
    ui: uiReducer,
    grid: gridReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
