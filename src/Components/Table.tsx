import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlusCircle } from 'react-icons/fi'
import ProgressBar from './ProgressBar'


const Table = () => {
    const projects = useSelector((state: RootState) => state.kanban.projects)
    return (
        <div className='project-table mt-4 border-t border-neutral-800 '>
            <div className='flex justify-between items-center'>
                <h2 className="text-xl font-semibold my-6 text-left">Projects</h2>
                <Link to='/addproject'>
                    <div className='px-3 py-1.5 bg-purple-700 hover:scale-110 transition-all rounded-md flex items-center justify-between cursor-pointer gap-2'>
                        <FiPlusCircle />
                        <span>Add Project</span>
                    </div>
                </Link>
            </div>
            <div className=' rounded-lg border border-neutral-800 bg-light-black text-gray-300'>
                <table className='mx-auto w-full '>
                    <thead className='border-b border-neutral-800'>
                        <tr >
                            <th className='p-4 text-left font-semibold'>Project Name</th>
                            <th className='p-4 text-left font-semibold'>Project Description</th>
                            <th className='p-4 text-left font-semibold'>Progress</th>
                            {/* <th className='px-4 pt-2 pb-6 text-left '>Start Date</th> */}
                            <th className='p-4 text-left font-semibold'>End Date</th>
                            <th className='p-4 text-left font-semibold'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => (
                            <tr key={project.id}
                                className={`border-b border-neutral-800 text-sm ${index === projects.length - 1 ? 'border-b-0' : ''}`}>
                                <td className="px-4 py-4 text-gray-200 text-left ">
                                    <Link to={`/project/${project.id}`} className="hover:underline">
                                        {project.name}
                                    </Link>
                                </td>
                                <td className="px-4 py-4 text-gray-400 text-left ">{project.description}</td>
                                <td className="px-4 py-4 text-gray-400 text-left ">
                                    <ProgressBar projectId={project.id} />
                                </td>
                                {/* <td className="px-4 py-4 text-gray-400 text-left ">{project.startDate.toDateString()}</td> */}
                                <td className="px-4 py-4 text-gray-400 text-left ">{new Date(project.endDate).toDateString()}</td>
                                <td className="px-4 py-4 text-gray-400 text-left ">
                                    <Link to={`/editproject/${project.id}`}>
                                        <div className='w-24 px-2 py-1.5 bg-emerald-700 text-neutral-50 rounded-md flex items-center justify-between cursor-pointer'>
                                            <span>Manage</span>
                                            <FiArrowRight />
                                        </div>
                                    </Link>
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