import React, { useState } from 'react'
import { CardType } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { setCards } from '../features/kanban/kanbanSlice';
// import AddCard from './AddCard';
import { DropIndicator } from './KanbanBoard';
import Card from './Card';
import { RootState } from '../redux/store';
import { getTasksByProjectId } from '../redux/selector';
import { useParams } from 'react-router-dom';
import AddTasks from './AddTasks';

interface ColumnProps {
    title: string,
    headingColor: string,
    column: string,
}

const Column = ({ title, headingColor, column }: ColumnProps) => {

    const [active, setActive] = useState(false)
    const { projectId } = useParams<{ projectId: string }>();
    // const cards:CardType[] = useSelector((state:RootState) => state.kanban.cards)
    // const cards: CardType[] = useSelector((state: RootState) => getTasksByProjectId(state, projectId))
    const cards:CardType[]  = useSelector((state: RootState) => getTasksByProjectId(state, projectId!));


    // useEffect(()=>{
    //     setTasks(cards.filter(c => c.projectId === projectId))
    // },[cards])
    
    const dispatch = useDispatch();

    const handleDragStart = (e: DragEvent, card: any) => {
        e.dataTransfer?.setData('cardId', card.id)
    }


    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        highlightIndicator(e)
        setActive(true)
    }

    const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
        const indicators = getIndicators();

        clearHighlight(indicators);

        const el = getNearestIndicator(e, indicators);

        (el.element as HTMLElement).style.opacity = "1";
    }

    const getIndicators = () => {
        return Array.from(document.querySelectorAll(`[data-column="${column}"]`))
    }

    const clearHighlight = (els?: Element[]) => {
        const indicators = els || getIndicators();
        indicators.forEach((i) => {
            (i as HTMLElement).style.opacity = "0"
        })
    }

    const getNearestIndicator = (e: React.DragEvent, indicators: Element[]) => {
        const DISTANCE_OFFSET = 50;

        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();

                const offset = e.clientY - (box.top + DISTANCE_OFFSET);

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            }
        );
        return el;
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setActive(false)
        clearHighlight();
    }

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setActive(false)
        clearHighlight();

        const cardId = e.dataTransfer.getData("cardId");
        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);
        const before = (element as HTMLElement).dataset.before || "-1";

        if (before !== cardId) {
            let copy = [...cards];

            let cardToTransfer = copy.find(c => c.id === cardId);
            if (!cardToTransfer) return;

            cardToTransfer = { ...cardToTransfer, column }

            copy = copy.filter(c => c.id !== cardId);

            const moveToBack = before === "-1";

            if (moveToBack) {
                copy.push(cardToTransfer);
            } else {
                const insertAtIndex = copy.findIndex(el => el.id === before);
                if (insertAtIndex === undefined) return;

                copy.splice(insertAtIndex, 0, cardToTransfer);
            }
            dispatch(setCards(copy));
        }
    }

    const filteredCards = cards.filter(c => c.column === column)

    return (
        <div className='w-72 shrink-0'>
            <div className='mb-3 flex items-center justify-between border-b border-neutral-800 px-2 py-3'>
                <h3 className={`font-medium ${headingColor}`}>{title}</h3>
                <span className='text-sm text-neutral-400'>{filteredCards.length}</span>
            </div>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDragEnd}
                className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"
                    }`}>
                {filteredCards.map(c => {
                    return <Card key={c.id} {...c} handleDragStart={handleDragStart} />
                })}
                <DropIndicator beforeId="-1" column={column} />
                {/* <AddCard column={column} projectId={projectId}/> */}
                <AddTasks column={column} projectId={projectId}/>
            </div>
        </div>
    )
}

export default Column