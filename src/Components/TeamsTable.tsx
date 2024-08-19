import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlusCircle } from 'react-icons/fi'
import ProgressBar from './ProgressBar'

const TeamsTable = () => {
    const teams = useSelector((state: RootState) => state.kanban.teams)
    return (
        <div className='project-table mt-4 border-t border-neutral-800 '>
            <div className='flex justify-between items-center'>
                <h2 className="text-xl font-semibold my-6 text-left">Team</h2>
                <Link to='/team/add/'>
                    <div className='px-3 py-1.5 bg-purple-700 hover:scale-110 transition-all rounded-md flex items-center justify-between cursor-pointer gap-2'>
                        <FiPlusCircle />
                        <span>Add Member</span>
                    </div>
                </Link>
            </div>
            <div className=' rounded-lg border border-neutral-800 bg-light-black text-gray-300'>
                <table className='mx-auto w-full '>
                    <thead className='border-b border-neutral-800'>
                        <tr >
                            <th className='py-4 pl-8 text-left font-semibold'></th>
                            <th className='py-4 pl-4 text-left font-semibold'>Name</th>
                            <th className='p-4 text-left font-semibold'>Email</th>
                            <th className='p-4 text-left font-semibold'>Role</th>
                            {/* <th className='px-4 pt-2 pb-6 text-left '>Skills</th> */}
                            <th className='p-4 text-left font-semibold'>Status</th>
                            <th className='p-4 text-left font-semibold'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team, index) => (
                            <tr key={team.id}
                                className={`border-b border-neutral-800 text-sm ${index === teams.length - 1 ? 'border-b-0' : ''}`}>
                                <td className='pl-8 py-4'>
                                    <img
                                        src={team.profilePicture}
                                        // src='https://avataaars.io/?topType=ShortHairFrizzle&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Black&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Smile&skinColor=Brown'
                                        alt="Profile Picture"
                                        className="h-10 w-10 rounded-full object-cover object-center border border-gray-300"
                                    />
                                </td>
                                <td className="p-4 text-gray-200 text-left ">
                                    <Link to={`/team/${team.id}`} className="hover:underline">
                                        {team.fullName}
                                    </Link>
                                </td>
                                <td className="px-4 py-4 text-gray-400 text-left ">{team.email}</td>
                                <td className="px-4 py-4 text-gray-400 text-left ">
                                    {/* <ProgressBar projectId={team.role} /> */}
                                    {team.role}
                                </td>
                                {/* <td className="px-4 py-4 text-gray-400 text-left ">{team.skills.toString()}</td> */}
                                <td className={`px-4 py-4 text-gray-400 text-left ${team.status === 'Active' ? 'text-emerald-600' : 'text-red-500'}`}>{team.status}</td>
                                <td className="px-4 py-4 text-gray-400 text-left ">
                                    <Link to={`/team/edit/${team.id}`}>
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

export default TeamsTable