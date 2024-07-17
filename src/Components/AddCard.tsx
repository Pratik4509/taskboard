import { motion } from 'framer-motion';
import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addCard } from '../features/kanban/kanbanSlice';
import { CardType } from '../types';

interface AddCardProps {
    column: string,
    projectId?: string,
}

const AddCard:React.FC<AddCardProps> = ({ column, projectId}) => {
    const [text, setText] = useState('');
    const [adding, setAdding] = useState(false)
    const dispatch = useDispatch()    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!text.trim().length) return;

        const newCard: CardType = {
            projectId : projectId ? projectId : '',
            column,
            title: text.trim(),
            id: Math.random().toString(),
            label: ['Design'],
            description: "This is description",
            teamMembers: ['John']
        };

        dispatch(addCard(newCard))
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

export default AddCard