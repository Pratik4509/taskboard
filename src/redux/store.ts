import { configureStore } from "@reduxjs/toolkit";
import kanbanSlice from "../features/kanban/kanbanSlice";

const store = configureStore({
    reducer : {
        kanban: kanbanSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;