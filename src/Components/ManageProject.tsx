import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import { addProject, updateProject } from '../features/kanban/kanbanSlice';
import { ProjectsTypes } from '../types';

const ManageProject = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projectId } = useParams<{ projectId?: string }>();
    const existingProject = useSelector((state: RootState) =>
        state.kanban.projects.find((project: ProjectsTypes) => project.id === projectId)
    );

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        if (existingProject) {
            setFormData({
                name: existingProject.name,
                description: existingProject.description,
                startDate: existingProject.startDate,
                endDate: existingProject.endDate,
            });
        }
    }, [existingProject]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = { name: '', description: '', startDate: '', endDate: '' };

        if (!formData.name.trim()) {
            newErrors.name = 'Project Name is required';
            valid = false;
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Project Description is required';
            valid = false;
        }
        if (!formData.startDate.trim()) {
            newErrors.startDate = 'Start Date is required';
            valid = false;
        }
        if (!formData.endDate.trim()) {
            newErrors.endDate = 'End Date is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2,
            '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (existingProject) {
            dispatch(updateProject({ ...existingProject, ...formData }));
        } else {
            dispatch(addProject({ id: Date.now().toString(), ...formData }));
        }

        navigate('/project');
    };

    return (
        <div className='w-full h-full bg-black text-neutral-50 px-10'>
            <div className='pt-10 pb-4 font-semibold text-2xl text-left border-b border-neutral-800'>Add Project</div>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='flex gap-8 flex-wrap lg:flex-nowrap'>
                    <div className='w-full text-left p-4 bg-light-black border border-neutral-800 rounded-lg mt-10'>
                        <h2 className='text-xl font-semibold'>Project Name</h2>
                        <p className='text-sm text-gray-400 mt-4'>Used to identify your Project on the Dashboard</p>
                        <input type="text"
                            className={`w-4/5 lg:w-96 mt-4 px-3 py-1.5 rounded border ${errors.name ? 'border border-red-900' : ' border-neutral-800'} bg-neutral-900`}
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <p>{errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}</p>
                    </div>
                    <div className='w-full text-left p-4 bg-light-black border border-neutral-800 rounded-lg mt-10'>
                        <h2 className='text-xl font-semibold'>Project Description</h2>
                        <p className='text-sm text-gray-400 mt-4'>Used to identify your Project on the Dashboard</p>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={`w-4/5 lg:w-96 mt-4 px-3 py-1.5 rounded border ${errors.name ? 'border border-red-900' : ' border-neutral-800'} bg-neutral-900`}
                        />
                        <p>{errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}</p>
                    </div>
                </div>
                <div className='flex gap-8 flex-wrap lg:flex-nowrap'>
                    <div className='w-full text-left p-4 bg-light-black border border-neutral-800 rounded-lg mt-4'>
                        <h2 className='text-xl font-semibold'>Project Start Date</h2>
                        <p className='text-sm text-gray-400 mt-4'>Used to identify the start date of your Project</p>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            className={`w-4/5 lg:w-96 mt-4 px-3 py-1.5 rounded border ${errors.startDate ? 'border border-red-900' : ' border-neutral-800'} bg-neutral-900`}
                            value={formatDate(formData.startDate)}
                            onChange={handleChange}
                        />
                        <p>{errors.startDate && <span className="text-red-500 text-sm">{errors.startDate}</span>}</p>
                    </div>
                    <div className='w-full text-left p-4 bg-light-black border border-neutral-800 rounded-lg mt-4'>
                        <h2 className='text-xl font-semibold'>Project End Date</h2>
                        <p className='text-sm text-gray-400 mt-4'>Used to identify the end date of your Project</p>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            className={`w-4/5 lg:w-96 mt-4 px-3 py-1.5 rounded border ${errors.endDate ? 'border-red-800' : 'border-neutral-800'} bg-neutral-900`}
                            value={formatDate(formData.endDate)}
                            onChange={handleChange}
                        />
                        <p className=''>{errors.endDate && <span className="text-red-500 text-sm">{errors.endDate}</span>}</p>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 ">
                    <button
                        type="button"
                        onClick={() => navigate('/project')}
                        className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500"
                    >
                        {existingProject ? 'Update Project' : 'Add Project'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ManageProject