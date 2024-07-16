import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store"
import { CardType } from "../types";

const selectTasks = (state: RootState) => state.kanban.cards;

export const getTasksByProjectId = createSelector(
    [selectTasks, (state: RootState, projectId: string) => projectId],
    (tasks, projectId) => tasks.filter(task => task.projectId === projectId)
);