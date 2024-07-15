import React, { useEffect, useState } from 'react'
import { FiPlus, FiTrash, FiEdit3 } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import StaggeredDropDown from './StaggeredDropDown';


export const KanbanBoard: React.FC = () => {
    return (
        <div className='h-screen w-full bg-neutral-900 text-neutral-50'>
            <Board />
        </div>
    )
}

interface DefaultCards {
    title: string,
    id: string,
    column: string,
    description: string,
    label: string,
    teamMembers: string[]
}

const Board = () => {

    const [cards, setCards] = useState<DefaultCards[]>(DEFAULT_CARDS) // Default cards 

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
                    cards={cards}
                    setCards={setCards}
                />
                <Column
                    title="TODO"
                    column="todo"
                    headingColor="text-yellow-200"
                    cards={cards}
                    setCards={setCards}
                />
                <Column
                    title="In progress"
                    column="doing"
                    headingColor="text-blue-200"
                    cards={cards}
                    setCards={setCards}
                />
                <Column
                    title="Complete"
                    column="done"
                    headingColor="text-emerald-200"
                    cards={cards}
                    setCards={setCards}
                />
                {/* <BurnBarrel setCards={setCards} /> */}
            </div>
        </div>
    </>

}

interface ColumnProps {
    title: string,
    headingColor: string,
    column: string,
    cards: DefaultCards[],
    setCards: React.Dispatch<React.SetStateAction<DefaultCards[]>>
}

const Column = ({ title, headingColor, column, cards, setCards }: ColumnProps) => {

    const [active, setActive] = useState(false)

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
            setCards(copy);
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
                    return <Card key={c.id} {...c} handleDragStart={handleDragStart} setCards={setCards} />
                })}
                <DropIndicator beforeId="-1" column={column} />
                <AddCard column={column} setCards={setCards} />
            </div>
        </div>
    )
}

interface CardProps {
    title: string,
    id: string,
    column: string,
    label: string,
    teamMembers: Array<string>
    description: string,
    handleDragStart: (e: DragEvent, card: any) => void
    setCards: React.Dispatch<React.SetStateAction<DefaultCards[]>>
}

const Card = ({ title, id, column, description, label, teamMembers, handleDragStart, setCards }: CardProps) => {
    const handleDelete = (id: string) => {
        setCards((pv) => pv.filter((c) => c.id !== id));
    }
    const handleEdit = () => {
        
    }

    interface labelColorInterface {
        Setup: string,
        Design: string
    }
    const labelColor:any = {
        Setup: 'bg-emerald-500/70',
        Design: 'bg-purple-500/70'
    }
    return (
        <>
            <DropIndicator beforeId={id} column={column} />
            <motion.div
                layout
                layoutId={id}
                draggable="true"
                onDragStart={(e: DragEvent) => handleDragStart(e, { title, id, column })}
                className='cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing'>
                <div className='flex items-center justify-between'>
                    <p className='text-sm text-neutral-100 text-left pb-2'>{title}</p>
                    <StaggeredDropDown handleDelete={handleDelete} handleEdit={handleEdit} id={id}/>
                </div>
                <p className='text-xs text-neutral-100 text-left mt-2'>{description}</p>
                <div className='flex items-center justify-end w-full gap-3 mt-4'>
                    <p className={`text-xs text-neutral-100 mr-auto px-2.5 py-1 rounded-md ${labelColor[label]}`}>{label}</p>
                    {/* <button
                        className='mt-1.5 text-neutral-400 transition-colors hover:text-neutral-50 hover:scale-115'
                        onClick={() => handleDelete(id)}
                    >
                        <FiEdit3 />
                    </button>
                    <button
                        className='mt-1.5 text-neutral-400 transition-colors hover:text-red-400 hover:animate-pulse'
                        onClick={() => handleDelete(id)}
                    >
                        <FiTrash />
                    </button> */}
                </div>
            </motion.div>
        </>
    )
}

interface DropIndicatorProps {
    beforeId: string,
    column: string
}

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
    return (
        <div
            data-before={beforeId || '-1'}
            data-column={column}
            className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0" />
    )
}

interface BurnBarrelProps {
    setCards: React.Dispatch<React.SetStateAction<DefaultCards[]>>
}

const BurnBarrel = ({ setCards }: BurnBarrelProps) => {
    const [active, setActive] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragLeave = () => {
        setActive(false);
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        const cardId = e.dataTransfer.getData("cardId");

        setCards((pv) => pv.filter((c) => c.id !== cardId));

        setActive(false);
    };

    return (
        <div
            onDrop={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${active
                ? "border-red-800 bg-red-800/20 text-red-500"
                : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
                }`}
        >
            {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
        </div>
    );
};

interface AddCardProps {
    column: string,
    setCards: React.Dispatch<React.SetStateAction<DefaultCards[]>>
}
const AddCard: React.FC<AddCardProps> = ({ column, setCards }) => {
    const [text, setText] = useState('');
    const [adding, setAdding] = useState(false)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!text.trim().length) return;

        const newCard = {
            column,
            title: text.trim(),
            id: Math.random().toString(),
            label: 'Design',
            description: "This is description",
            teamMembers: ['John']
        };

        setCards(prev => [...prev, newCard]);
        setAdding(false)
    }

    const handleClosed = () => {
        setAdding(false)
    }
    return (
        <>
            {adding
                ? <motion.form layout onSubmit={handleSubmit}>
                    <textarea
                        onChange={e => setText(e.target.value)}
                        autoFocus
                        placeholder='Add new task....'
                        className='w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0'
                    />
                    <div className='mt-1.5 flex items-center justify-end gap-1.5'>
                        <button className='px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50'
                            onClick={handleClosed}
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className='flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:text-neutral-600'
                        >
                            <span>Add</span>
                            <FiPlus />
                        </button>
                    </div>
                </motion.form>
                : <motion.button
                    layout
                    onClick={() => setAdding(true)}
                    className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
                >
                    <span>Add Card</span>
                    <FiPlus />
                </motion.button>
            }
        </>
    )
}


const DEFAULT_CARDS = [
    // BACKLOG
    {
        title: "Look into render bug in dashboard",
        id: "1",
        column: "backlog",
        description: 'Initialize the Git repository and set up the basic project structure.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
    },
    {
        title: "SOX compliance checklist",
        id: "2",
        column: "backlog",
        description: 'Initialize the Git repository and set up the basic project structure.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
    },
    {
        title: "[SPIKE] Migrate to Azure",
        id: "3",
        column: "backlog",
        description: 'Initialize the Git repository and set up the basic project structure.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
    },
    {
        title: "Document Notifications service",
        id: "4",
        column: "backlog",
        description: 'Create the initial UI/UX designs for the Kanban board.',
        label: 'Design',
        teamMembers: ['Charlie', 'Dave'],
    },
    // TODO
    {
        title: "Research DB options for new microservice",
        id: "5",
        column: "todo",
        description: 'Create the initial UI/UX designs for the Kanban board.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
    },
    {
        title: "Postmortem for outage",
        id: "6",
        column: "todo",
        description: 'Create the initial UI/UX designs for the Kanban board.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
    },
    {
        title: "Sync with product on Q3 roadmap",
        id: "7",
        column: "todo",
        description: 'Create the initial UI/UX designs for the Kanban board.',
        label: 'Design',
        teamMembers: ['Charlie', 'Dave'],
    },

    // DOING
    {
        title: "Refactor context providers to use Zustand",
        id: "8",
        column: "doing",
        description: 'Initialize the Git repository and set up the basic project structure.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
    },
    {
        title: "Add logging to daily CRON",
        id: "9",
        column: "doing",
        description: 'Initialize the Git repository and set up the basic project structure.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
    },
    // DONE
    {
        title: "Set up DD dashboards for Lambda listener",
        id: "10",
        column: "done",
        description: 'Create the initial UI/UX designs for the Kanban board.',
        label: 'Design',
        teamMembers: ['Charlie', 'Dave'],
    },
    {
        id: '11',
        title: 'Set up project repository',
        description: 'Initialize the Git repository and set up the basic project structure.',
        label: 'Setup',
        teamMembers: ['Alice', 'Bob'],
        column: "done",
    },
    {

        id: '12',
        title: 'Design UI mockups',
        description: 'Create the initial UI/UX designs for the Kanban board.',
        label: 'Design',
        teamMembers: ['Charlie', 'Dave'],
        column: "done",
    },
];


