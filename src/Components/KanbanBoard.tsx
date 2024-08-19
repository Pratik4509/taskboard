import React from 'react'
import Column from './Column';
// import BurnBarrel from './BurnBarrel';
import { Link, useParams } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { ProjectsTypes } from '../types';
import { Breadcrumbs } from './Breadcrumbs';


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

    const { projectId = '0' } = useParams();
    const project = useSelector((state: RootState) =>
        state.kanban.projects.find((project: ProjectsTypes) => project.id === projectId)
    );

    return <>
        <div className="h-screen flex flex-col w-full">
            <div className="mr-auto w-full px-12 py-12 font-semibold text-3xl basis-1/4">
                <Breadcrumbs current={project ? project.name : ''} />
                <div className='text-left mt-4 pt-4 border-t border-neutral-800'>
                    {project ? project.name : ''}
                </div>
                <div className='flex justify-between items-center'>
                    <ProgressBar projectId={projectId} className='mt-4' />
                    <Link to={`/project/edit/${projectId}`} className="hover:underline">
                        <button className="px-3 py-1.5 bg-purple-700 rounded-md text-sm">
                            Edit
                        </button>
                    </Link>
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
