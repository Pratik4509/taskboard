import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import DEFAULT_CARDS from "../../data/tasks"
import { CardType, KanbanState } from "../../types"
import PROJECTS from "../../data/projects"

const initialState: KanbanState = {
    cards: DEFAULT_CARDS,
    projects: PROJECTS
}


const KanbanSlice = createSlice({
    name: 'kanban',
    initialState,
    reducers: {
        setCards: (state, actions) => {
            state.cards = actions.payload
        },
        addCard: (state, action) => {
            state.cards = [...state.cards, action.payload]
        },
        handleDelete: (state, action) => {
            state.cards = state.cards.filter(c => c.id !== action.payload)
        }
    }
})

export const { setCards, addCard, handleDelete } = KanbanSlice.actions;
export default KanbanSlice.reducer;
