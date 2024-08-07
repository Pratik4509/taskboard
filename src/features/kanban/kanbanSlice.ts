import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import DEFAULT_CARDS from "../../data/tasks"
import { CardType, KanbanState } from "../../types"
import PROJECTS from "../../data/projects"

const initialState: KanbanState = {
    cards: DEFAULT_CARDS,
    projects: PROJECTS,
    isOpen: false,
    currentId: ''
}


const KanbanSlice = createSlice({
    name: 'kanban',
    initialState,
    reducers: {
        setCards: (state, actions) => {
            // state.cards = actions.payload
            const cards  = actions.payload;
            const existingCards = state.cards
            const updatedCards = cards.reduce((acc:CardType[], newcard:any) =>{
                const index = acc.findIndex(c => c.id === newcard.id);
                if(index !== -1) {
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
        }
    }
})

export const { setCards, addCard, handleDelete, editTask, setIsOpen, setCurrentId } = KanbanSlice.actions;
export default KanbanSlice.reducer;
