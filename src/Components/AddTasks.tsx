import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import Modal from './Modal';
import { useDispatch } from 'react-redux';
import { addCard } from '../features/kanban/kanbanSlice';
import { CardType } from '../types';

interface AddCardProps {
    column: string,
    projectId?: string,
}

const AddTasks: React.FC<AddCardProps> = ({ column, projectId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState<any>({})
    const [selectedLabel, setSelectedLabel] = useState<Array<string>>([]);
    const dispatch = useDispatch()

    const labelOptions = [
        'Setup',
        'Design',
        'Development',
        'Testing',
        'Deployment'
    ]
    const labelColor: Record<string, string> = {
        'Setup': 'bg-emerald-500',
        'Design': 'bg-purple-500',
        'Development': 'bg-indigo-500',
        'Testing': 'bg-amber-500',
        'Deployment': 'bg-yellow-500',
    }

    const activeStyle = 'border-2 border-white';


    const handleClick = (label: string) => {
        if (selectedLabel.includes(label)) {
            handleLabelRemove(label)
        } else {
            handleLabelAdd(label)
        }
    }

    const handleLabelAdd = (label: string) => {
        setSelectedLabel((prev) => [...prev, label])
    }

    const handleLabelRemove = (label: string) => {
        setSelectedLabel((prev) => prev.filter(l => l !== label))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        let { name, value } = e.target;
        if (value.trim() === '') {
            e.target.classList.remove("border")
            e.target.classList.remove("border-neutral-700")
            e.target.classList.add("border-2")
            e.target.classList.add("ring-2")
            e.target.classList.add("border-red-700")
            setError(true)
        }
        else {
            setFormData({ ...formData, [name]: value })
            setError(false)
            e.target.classList.add("border")
            e.target.classList.add("border-neutral-700")
            e.target.classList.remove("ring-2")
            e.target.classList.remove("border-2")
            e.target.classList.remove("border-red-700")
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newCard: CardType = {
            projectId: projectId ? projectId : '',
            column,
            title: formData.title.trim(),
            id: Math.random().toString(),
            label: selectedLabel,
            description: formData.description.trim(),
            teamMembers: ['John']
        };

        if (!error && formData.title.trim().length > 0 && formData.description.trim().length > 0 && selectedLabel.length > 0) {
            dispatch(addCard(newCard))
        }
    }

    useEffect(() => {
        setTitle('')
        setDescription('')
        setSelectedLabel([])
    }, [isOpen])

    return (
        <>
            <motion.button
                layout
                onClick={() => setIsOpen(true)}
                className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
                <span>Add Task</span>
                <FiPlus />
            </motion.button>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                {/* <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" /> */}
                <div className="relative z-10">
                    <form onSubmit={handleSubmit} className=''>
                        {/* <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                            <FiAlertCircle />
                        </div> */}
                        <input
                            type="text"
                            className='mx-auto mt-2 w-full px-3 py-1.5 rounded border border-neutral-800 bg-light-black'
                            placeholder="Enter title"
                            name="title"
                            // onChange={(e)=>setTitle(e.target.value)}
                            onChange={e => handleChange(e)}
                        />
                        <textarea
                            className='mx-auto mt-4 w-full px-3 py-1.5 rounded border border-neutral-800 bg-light-black'
                            placeholder="Enter Description"
                            name="description"
                            // onChange={(e)=>setDescription(e.target.value)}
                            onChange={e => handleChange(e)}
                        />
                        <div className="mx-auto mt-4">
                            <div className="relative inline-block w-full">
                                <div className="px-3 py-1.5 rounded border border-neutral-800 bg-light-black">
                                    <div className="p-2 flex gap-4 flex-wrap">
                                        {labelOptions.map(label => (
                                            <div
                                                key={label}
                                                className={`px-2 py-1 rounded-md ${labelColor[label]} ${selectedLabel.includes(label) ? activeStyle : ''}`}
                                                onClick={() => handleClick(label)}
                                            >
                                                {label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <div
                                onClick={() => setIsOpen(false)}
                                className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                            >
                                Back
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                type='submit'
                                className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                            >
                                Add!
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default AddTasks