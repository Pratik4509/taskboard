import { motion } from 'framer-motion'
// import React from 'react'
import StaggeredDropDown from './StaggeredDropDown'
import { DropIndicator } from './KanbanBoard'

interface CardProps {
    title: string,
    id: string,
    column: string,
    label: Array<string>,
    teamMembers: Array<string>
    description: string,
    handleDragStart: (e: DragEvent, card: any) => void
}

const Card = ({ title, id, column, description, label, teamMembers, handleDragStart}: CardProps) => {
    
    const handleEdit = () => {

    }

    const labelColor: Record<string, string> = {
        'Setup': 'bg-emerald-500/70',
        'Design': 'bg-purple-500/70',
        'Development': 'bg-indigo-500/70',
        'Testing': 'bg-amber-500/70',
        'Deployment': 'bg-yellow-500/70',

    }

    return (
        <>
            <DropIndicator beforeId={id} column={column} />
            <motion.div
                layout
                layoutId={id}
                draggable="true"
                onDragStart={(e: DragEvent) => handleDragStart(e, { title, id, column })}
                className='cursor-grab rounded border border-neutral-800 bg-light-black p-3 active:cursor-grabbing'>
                <div className='flex items-center justify-between'>
                    <p className='text-sm text-neutral-100 text-left pb-2'>{title}</p>
                    <StaggeredDropDown handleEdit={handleEdit} id={id} />
                </div>
                <p className='text-xs text-neutral-100 text-left mt-2'>{description}</p>
                <div className='flex items-center justify-start w-full gap-3 mt-4'>
                    {label.map(l=>(
                        <p key={l} className={`text-xs text-neutral-100 px-2.5 py-1 rounded-md ${labelColor[l]}`}>{l}</p>
                    ))}
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

export default Card