import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux';
import { editTask, setIsOpen } from '../features/kanban/kanbanSlice';
import { CardType } from '../types';
import { getTaskByTaskId } from '../redux/selector';
import { RootState } from '../redux/store';
// interface ManageTaskProps {
//     id?: string
// }

const ManageTask = () => {
    // const [error, setError] = useState(false);
    const isOpen = useSelector((state: RootState) => state.kanban.isOpen)
    const id = useSelector((state: RootState) => state.kanban.currentId)
    const task: CardType[] = useSelector((state: RootState) => getTaskByTaskId(state, id!));
    const [formData, setFormData] = useState({
        title: task.length > 0 ? task[0].title : '',
        description: task.length > 0 ? task[0].description : '',
        teamMembers: task.length > 0 ? task[0].teamMembers.join(', ') : [],
        column: task.length > 0 ? task[0].column : '',
    });

    const [selectedLabel, setSelectedLabel] = useState<Array<string>>(task.length > 0 ? task[0].label : []);
    const dispatch = useDispatch()

    const states = [
        {
            title: 'Backlog',
            value: 'backlog'
        },
        {
            title: 'Todo',
            value: 'todo'
        },
        {
            title: 'In Progress',
            value: 'doing'
        },
        {
            title: 'Complete',
            value: 'done'
        },
    ]
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

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

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    //     let { name, value } = e.target;
    //     if (value.trim() === '') {
    //         e.target.classList.remove("border")
    //         e.target.classList.remove("border-neutral-700")
    //         e.target.classList.add("ring-2")
    //         e.target.classList.add("ring-red-700")
    //         setError(true)
    //     }
    //     else {
    //         setFormData({ ...formData, [name]: value })
    //         setError(false)
    //         e.target.classList.add("border")
    //         e.target.classList.add("border-neutral-700")
    //         e.target.classList.remove("ring-2")
    //         e.target.classList.remove("ring-red-700")
    //     }
    // }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedTask = {
            ...task[0],
            title: formData.title,
            description: formData.description,
            label: selectedLabel,
        };
        dispatch(editTask(updatedTask))
    }

    useEffect(() => {
        setFormData({
            title: task.length > 0 ? task[0].title : '',
            description: task.length > 0 ? task[0].description : '',
            teamMembers: task.length > 0 ? task[0].teamMembers.join(', ') : [],
            column: task.length > 0 ? task[0].column : '',
        })
        setSelectedLabel(task.length > 0 ? task[0].label : [])
    }, [task])

    const handleSetIsOpen = (value: boolean) => {
        dispatch(setIsOpen(value))
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={handleSetIsOpen}>
            {/* <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" /> */}
            <div className="relative z-10">
                <form onSubmit={handleSubmit} className=''>
                    {/* <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                            <FiAlertCircle />
                        </div> */}
                    <input
                        type="text"
                        className='mx-auto mt-2 w-full px-3 py-1.5 rounded border border-neutral-700 bg-neutral-800'
                        placeholder="Enter title"
                        name="title"
                        value={formData.title.length > 0 ? formData.title : ''}
                        // onChange={(e)=>setTitle(e.target.value)}
                        onChange={handleInputChange}
                    />
                    <textarea
                        className='mx-auto mt-4 w-full px-3 py-1.5 rounded border border-neutral-700 bg-neutral-800'
                        placeholder="Enter Description"
                        name="description"
                        value={formData.description}
                        // onChange={(e)=>setDescription(e.target.value)}
                        onChange={handleInputChange}
                    />
                    <div className="mx-auto mt-4">
                        <div className="relative inline-block w-full">
                            <div className="px-3 py-1.5 rounded border border-neutral-700 bg-neutral-800">
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
                    <div className='flex w-full justify-between items-center '>
                        {/* <label htmlFor="column">State</label> */}
                        <select
                            name="column"
                            id="column"
                            className='w-full mt-4 px-3 py-1.5 rounded border border-neutral-700 bg-neutral-800'
                            value={formData.column}
                            onChange={handleSelectChange}
                        >
                            {states.map(state =>
                                <option value={state.value} key={state.value}>{state.title}</option>
                            )}
                        </select>
                        {/* <option value="backlog">Backlog</option>
                            <option value="1">To Do</option>
                            <option value="1">In Progress</option>
                            <option value="1">Complete</option> */}
                    </div>
                    <div className="flex gap-2 mt-4">
                        <div
                            onClick={() => dispatch(setIsOpen(false))}
                            className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                        >
                            Back
                        </div>
                        <button
                            onClick={() => dispatch(setIsOpen(false))}
                            type='submit'
                            className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                        >
                            Add!
                        </button>
                    </div>

                </form>
            </div>
        </Modal>
    )
}

export default ManageTask