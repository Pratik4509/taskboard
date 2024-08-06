import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlus } from 'react-icons/fi'


const Table = () => {
    const projects = useSelector((state: RootState) => state.kanban.projects)
    return (
        <div className='project-table mt-4 border-t border-neutral-500 '>
            <div className='flex justify-between items-center'>
                <h2 className="text-xl font-semibold my-6 text-left">Projects</h2>
                <div className='px-3 py-1.5 bg-purple-700 rounded-md flex items-center justify-between cursor-pointer gap-1'>
                    <span>Add Task</span>
                    <FiPlus />
                </div>
            </div>
            <div className='px-3 py-1.5 rounded-lg border border-neutral-800 bg-light-black text-gray-300'>
                <table className='mx-auto w-full '>
                    <thead className=''>
                        <tr >
                            <th className='px-4 pt-2 pb-6 text-left '>Project Id</th>
                            <th className='px-4 pt-2 pb-6 text-left '>Project Name</th>
                            <th className='px-4 pt-2 pb-6 text-left '>Start Date</th>
                            <th className='px-4 pt-2 pb-6 text-left '>End Date</th>
                            <th className='px-4 pt-2 pb-6 text-left '>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id} className="border-t border-gray-700 text-sm">
                                <td className="px-4 py-4 text-gray-400 text-left ">
                                    <Link to={`/project/${project.id}`} className="hover:underline">
                                        {project.name}
                                    </Link>
                                </td>
                                <td className="px-4 py-4 text-gray-400 text-left ">{project.description}</td>
                                <td className="px-4 py-4 text-gray-400 text-left ">{project.startDate.toDateString()}</td>
                                <td className="px-4 py-4 text-gray-400 text-left ">{project.endDate.toDateString()}</td>
                                <td className="px-4 py-4 text-gray-400 text-left ">
                                    <div className='w-24 px-2 py-1.5 bg-emerald-700 text-neutral-50 rounded-md flex items-center justify-between cursor-pointer'>
                                        <span>Manage</span>
                                        <FiArrowRight />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table