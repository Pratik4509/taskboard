import React, { useState } from 'react'
import Column from './Column';
import BurnBarrel from './BurnBarrel';
import { useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { CardType } from '../types';
import { getTasksByProjectId } from '../redux/selector';


export const KanbanBoard: React.FC = () => {
    return (
        <div className='h-screen w-full bg-black text-neutral-50'>
            <Board />
        </div>
    )
}

const Board = () => {

    // const [cards, setCards] = useState<DefaultCards[]>(DEFAULT_CARDS) // Default cards 
    // const cards = useSelector((state: RootState) => state.kanban.cards)

    // For local storage start

    // const [cards, setCards] = useState<DefaultCards[]>([])
    // const [hasChecked, setHasChecked] = useState(false)
    // useEffect(() => {
    //     hasChecked && localStorage.setItem("cards", JSON.stringify(cards));
    // }, [cards]);

    // useEffect(()=>{
    //     const cardData = localStorage.getItem("cards");
    //     setCards(cardData ? JSON.parse(cardData) : [])
    //     setHasChecked(true)
    // },[])

    // For local storage end

    const { projectId } = useParams();
    const data: CardType[] = useSelector((state: RootState) => getTasksByProjectId(state, projectId!));
    const completed = data ? data.filter(d => d.column === "done") : [];
    const barColor = () => {
        let percent = completed.length / (data ? data.length : 1) * 100
        if (percent <= 25 ) {
            return 'bg-red-500';
        }
        if (percent <= 50) {
            return 'bg-amber-500'
        }
        if (percent <= 75) {
            return 'bg-lime-500'
        }
        if (percent = 100) {
            return 'bg-green-500'
        }
    }
    return <>
        <div className="h-screen flex flex-col w-full">
            <div className="mr-auto w-full px-12 py-2 font-semibold text-3xl basis-1/4">
                <div className='text-left'>
                    Mobile App
                </div>
                <div className='w-96 text-xs font-light text-left mt-4'>
                    <div className='flex justify-between items-center'>
                        <div>{completed.length!== data.length ? 'Ongoing' : 'Completed'}</div>
                        <div>{`${(completed.length / (data ? data.length : 1)) * 100}%`}</div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full mt-1">
                        <div className={`h-full ${barColor()} rounded-full`} style={{ width: `${(completed.length / (data ? data.length : 1)) * 100}%` }}>
                        </div>
                    </div>
                    <div className=''>
                        {`${completed.length} tasks of ${data.length} tasks`}
                    </div>
                </div>
            </div>
            <div className='flex w-full h-full gap-3 overflow-scroll px-12 pb-6 no-scrollbar'>
                <Column
                    title="Backlog"
                    column="backlog"
                    headingColor="text-neutral-500"
                />
                <Column
                    title="TODO"
                    column="todo"
                    headingColor="text-yellow-200"
                />
                <Column
                    title="In progress"
                    column="doing"
                    headingColor="text-blue-200"
                />
                <Column
                    title="Complete"
                    column="done"
                    headingColor="text-emerald-200"
                />
                {/* <BurnBarrel /> */}
            </div>
        </div>
    </>

}
interface DropIndicatorProps {
    beforeId: string,
    column: string
}

export const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
    return (
        <div
            data-before={beforeId || '-1'}
            data-column={column}
            className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0" />
    )
}
