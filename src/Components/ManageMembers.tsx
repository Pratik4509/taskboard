import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import { TeamTypes } from '../types';
import { motion } from 'framer-motion';

const roles = ['Developer', 'Designer', 'Project Manager', 'Tester'];
const statuses = ['Active', 'Inactive'];
const skills = ['JavaScript', 'React', 'CSS', 'HTML', 'UI/UX Design', 'Node.js', 'Python', "Express", "MongoDB", "REST APIs",
    "Project Management", "Agile", "Scrum", "Communication", "Figma", "Sketch", "User Research", "Prototyping",
    "AWS", "Docker", "Kubernetes", "CI/CD", "Manual Testing", "Automation Testing", "Selenium", "JIRA"];

const ManageMembers = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const existingMember = useSelector((state: RootState) => state.kanban.teams.find((team: TeamTypes) => team.id === id))
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        role: '',
        status: '',
    })

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        role: '',
        status: '',
        skills: ''
    });

    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    const skillColor: Record<string, string> = {
        // 'JavaScript': 'bg-amber-500',
        // 'React': 'bg-sky-500',
        // 'Node.js': 'bg-green-500',
        // 'Python': 'bg-yellow-500',
        // 'CSS': 'bg-indigo-500',
        // 'HTML': 'bg-teal-500',
        // 'UI/UX Design': 'bg-purple-500',
        // 'Project Management': 'bg-emerald-500',
        // 'Agile': 'bg-rose-500',
        // 'Scrum': 'bg-blue-500',
        // 'Communication': 'bg-fuchsia-500',

    }

    const activeStyle = 'border-2 border-white';

    const handleClick = (label: string) => {
        if (selectedSkills.includes(label)) {
            handleLabelRemove(label)
        } else {
            handleLabelAdd(label)
        }
    }

    const handleLabelAdd = (label: string) => {
        setSelectedSkills((prev) => [...prev, label])
    }

    const handleLabelRemove = (label: string) => {
        setSelectedSkills((prev) => prev.filter(l => l !== label))
    }

    const updatedSkills = [
        ...selectedSkills,
        ...skills.filter(skill => !selectedSkills.includes(skill))
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    const handleSubmit = () => {

    }

    useEffect(() => {
        if (existingMember) {
            setFormData({
                fullName: existingMember.fullName,
                email: existingMember.email,
                status: existingMember.status,
                role: existingMember.role
            })
            setSelectedSkills(existingMember.skills)
        }
    }, [existingMember])

    // useEffect(()=>{
    //     return ()=>setSelectedSkills([])
    // },[])

    return (
        <div className='w-full h-full bg-black text-neutral-50 px-10 overflow-scroll overflow-x-hidden'>
            <div className='pt-10 pb-4 font-semibold text-2xl text-left border-b border-neutral-800'>Add Member</div>
            <form onSubmit={handleSubmit} className='space-y-4 '>
                <div className='flex gap-8 flex-wrap lg:flex-nowrap'>
                    <div className='w-full text-left p-4 bg-light-black border border-neutral-800 rounded-lg mt-10'>
                        <h2 className='text-xl font-semibold'>Name</h2>
                        <p className='text-sm text-gray-400 mt-4'>Used to identify you on the Dashboard</p>
                        <input type="text"
                            className={`w-4/5 lg:w-96 mt-4 px-3 py-1.5 rounded border ${errors.fullName ? 'border border-red-900' : ' border-neutral-800'} bg-neutral-900`}
                            id="name"
                            name="name"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                        <p>{errors.fullName && <span className="text-red-500 text-sm">{errors.fullName}</span>}</p>
                    </div>
                    <div className='w-full text-left p-4 bg-light-black border border-neutral-800 rounded-lg mt-10'>
                        <h2 className='text-xl font-semibold'>Email</h2>
                        <p className='text-sm text-gray-400 mt-4'>Used to identify you on the Dashboard</p>
                        <input
                            type='email'
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-4/5 lg:w-96 mt-4 px-3 py-1.5 rounded border ${errors.email ? 'border border-red-900' : ' border-neutral-800'} bg-neutral-900`}
                        />
                        <p>{errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}</p>
                    </div>
                </div>
                <div className='flex gap-8 flex-wrap lg:flex-nowrap'>
                    <div className='w-full text-left p-4 bg-light-black border border-neutral-800 rounded-lg'>
                        <h2 className='text-xl font-semibold'>Role</h2>
                        <p className='text-sm text-gray-400 mt-4'>Used to identify your role on the Dashboard</p>
                        <select
                            className='w-full mt-4 px-3 py-1.5 rounded border border-neutral-800 bg-light-black'
                            value={formData.role}
                        >
                            <option value="">--Please Choose--</option>
                            {roles.map((role, index) => (<option value={role} key={index}>{role}</option>))}
                        </select>
                        <p>{errors.role && <span className="text-red-500 text-sm">{errors.role}</span>}</p>
                    </div>
                    <div className='w-full text-left p-4 bg-light-black border border-neutral-800 rounded-lg'>
                        <h2 className='text-xl font-semibold'>Status</h2>
                        <p className='text-sm text-gray-400 mt-4'>Used to identify your status on the Dashboard</p>
                        <select
                            className='w-full mt-4 px-3 py-1.5 rounded border border-neutral-800 bg-light-black'
                            value={formData.status}
                        >
                            {statuses.map((status, index) => (<option value={status} key={index}>{status}</option>))}
                        </select>
                        <p>{errors.status && <span className="text-red-500 text-sm">{errors.status}</span>}</p>
                    </div>
                </div>
                <div className='flex gap-8 flex-wrap lg:flex-nowrap'>
                    <div className='w-full text-left p-4 bg-light-black border border-neutral-800 rounded-lg'>
                        <h2 className='text-xl font-semibold'>Skills</h2>
                        <p className='text-sm text-gray-400 mt-4'>Used to identify your skills on the Dashboard</p>
                        <div className="mt-4 px-3 py-1.5 rounded border border-neutral-800 bg-light-black">
                            <div
                                className="p-2 flex gap-4 flex-wrap">
                                {updatedSkills.map(skill => (
                                    <motion.div
                                        layout
                                        // layoutId={skill}
                                        key={skill}
                                        className={`px-2 py-1 rounded-md cursor-pointer ${skillColor[skill]} ${selectedSkills.includes(skill) ? activeStyle : ''}`}
                                        onClick={() => handleClick(skill)}
                                    >
                                        {skill}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <p>{errors.role && <span className="text-red-500 text-sm">{errors.role}</span>}</p>
                    </div>
                </div>
                <div className="flex justify-end space-x-4">
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
                        {existingMember ? 'Update Member' : 'Add Member'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ManageMembers