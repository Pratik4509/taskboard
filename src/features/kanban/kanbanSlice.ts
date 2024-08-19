import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import DEFAULT_CARDS from "../../data/tasks"
import { CardType, KanbanState, ProjectsTypes } from "../../types"
import PROJECTS from "../../data/projects"
import { TEAM_MEMBERS } from "../../data/teamMembers"

const initialState: KanbanState = {
    cards: DEFAULT_CARDS,
    projects: PROJECTS,
    teams: TEAM_MEMBERS,
    isOpen: false,
    currentId: ''
}


const KanbanSlice = createSlice({
    name: 'kanban',
    initialState,
    reducers: {
        setCards: (state, actions) => {
            // state.cards = actions.payload
            const cards = actions.payload;
            const existingCards = state.cards
            const updatedCards = cards.reduce((acc: CardType[], newcard: any) => {
                const index = acc.findIndex(c => c.id === newcard.id);
                if (index !== -1) {
                    acc[index] = newcard;
                }
                else {
                    acc.push(newcard);
                }
                return acc;
            }, [...existingCards])
            state.cards = updatedCards;
        },
        addCard: (state, action: PayloadAction<CardType>) => {
            state.cards = [...state.cards, action.payload]
        },
        handleDelete: (state, action) => {
            state.cards = state.cards.filter(c => c.id !== action.payload)
        },
        editTask: (state, action) => {
            const index = state.cards.findIndex(task => task.id === action.payload.id)
            if (index !== -1) {
                state.cards[index] = action.payload
            }
        },
        setIsOpen: (state, action) => {
            state.isOpen = action.payload
        },
        setCurrentId: (state, action) => {
            state.currentId = action.payload
        },
        addProject: (state, action: PayloadAction<ProjectsTypes>) => {
            state.projects.push(action.payload);
        },
        updateProject: (state, action: PayloadAction<ProjectsTypes>) => {
            const index = state.projects.findIndex((project) => project.id === action.payload.id);
            if (index !== -1) {
                state.projects[index] = action.payload;
            }
        },
    }
})

export const { setCards, addCard, handleDelete, editTask, setIsOpen, setCurrentId, addProject, updateProject } = KanbanSlice.actions;
export default KanbanSlice.reducer;
