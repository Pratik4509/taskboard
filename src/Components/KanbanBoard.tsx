import React, {useState } from 'react'
import Column from './Column';
import BurnBarrel from './BurnBarrel';


export const KanbanBoard: React.FC = () => {
    return (
        <div className='h-screen w-full bg-neutral-900 text-neutral-50'>
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

    return <>
        <div className="h-screen flex flex-col">
            <div className="flex justify-start px-12 py-2 font-semibold text-3xl basis-1/4">Mobile App</div>
            <div className='flex w-full h-full gap-3 overflow-scroll p-12 no-scrollbar'>
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
