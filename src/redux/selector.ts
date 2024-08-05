import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store"

const selectTasks = (state: RootState) => state.kanban.cards;

export const getTasksByProjectId = createSelector(
    [selectTasks, (state: RootState, projectId: string) => projectId],
    (tasks, projectId) => tasks.filter(task => task.projectId === projectId)
);

export const getTaskByTaskId = createSelector(
    [selectTasks, (state: RootState,taskId: string) => taskId],
    (tasks, taskId) => tasks.filter(task => task.id === taskId)
)